import { chromium } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

interface ProjectData {
  slug: string;
  url: string;
  title: string;
}

async function getProjects(): Promise<ProjectData[]> {
  const projectsDir = path.join(projectRoot, 'src/content/projects');
  const files = await fs.readdir(projectsDir);

  const projects: ProjectData[] = [];

  for (const file of files) {
    if (file.endsWith('.md') && file !== '.gitkeep') {
      const content = await fs.readFile(path.join(projectsDir, file), 'utf-8');

      // Extract URL from frontmatter
      const urlMatch = content.match(/url:\s*["'](.+?)["']/);
      const titleMatch = content.match(/title:\s*["'](.+?)["']/);

      if (urlMatch && titleMatch) {
        const slug = file.replace('.md', '');
        projects.push({
          slug,
          url: urlMatch[1],
          title: titleMatch[1]
        });
      }
    }
  }

  return projects;
}

async function takeScreenshot(
  url: string,
  outputPath: string,
  width: number,
  height: number,
  deviceType: 'desktop' | 'mobile'
): Promise<void> {
  console.log(`  Taking ${deviceType} screenshot (${width}x${height})...`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    userAgent: deviceType === 'mobile'
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const page = await context.newPage();

  try {
    // Navigate to URL with timeout
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait a bit for any animations/lazy loading
    await page.waitForTimeout(2000);

    // Take full-page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      animations: 'disabled'
    });

    console.log(`  Saved to ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`  Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  } finally {
    await browser.close();
  }
}

async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('Starting screenshot automation...\n');

  // Ensure output directory exists
  const outputDir = path.join(projectRoot, 'public/images/projects');
  await ensureDirectory(outputDir);

  // Get all projects
  const projects = await getProjects();
  console.log(`Found ${projects.length} projects\n`);

  let successCount = 0;
  let failedCount = 0;
  const failed: string[] = [];

  // Process each project
  for (const project of projects) {
    console.log(`\nProcessing: ${project.title}`);
    console.log(`  URL: ${project.url}`);

    try {
      // Desktop screenshot (1440px width)
      const desktopPath = path.join(outputDir, `${project.slug}-desktop.png`);
      await takeScreenshot(project.url, desktopPath, 1440, 900, 'desktop');

      // Mobile screenshot (375px width)
      const mobilePath = path.join(outputDir, `${project.slug}-mobile.png`);
      await takeScreenshot(project.url, mobilePath, 375, 667, 'mobile');

      successCount += 2;
    } catch (error) {
      console.error(`\nFailed to capture ${project.title}`);
      failedCount += 2;
      failed.push(project.slug);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Successful screenshots: ${successCount}`);
  console.log(`Failed screenshots: ${failedCount}`);

  if (failed.length > 0) {
    console.log(`\nFailed projects: ${failed.join(', ')}`);
  }

  console.log('\nScreenshot automation completed!');
  console.log(`Screenshots saved to: ${outputDir}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
