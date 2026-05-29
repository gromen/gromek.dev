import { chromium } from "@playwright/test";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Output dimensions for portfolio card (16:9)
const OUTPUT_WIDTH = 800;
const OUTPUT_HEIGHT = 450;

interface ProjectData {
  slug: string;
  url: string;
  title: string;
}

async function getProjects(): Promise<ProjectData[]> {
  const projectsDir = path.join(projectRoot, "src/content/projects");
  const files = await fs.readdir(projectsDir);

  const projects: ProjectData[] = [];

  for (const file of files) {
    if (file.endsWith(".md") && file !== ".gitkeep") {
      const content = await fs.readFile(path.join(projectsDir, file), "utf-8");

      // Extract URL from frontmatter
      const urlMatch = content.match(/url:\s*["'](.+?)["']/);
      const titleMatch = content.match(/title:\s*["'](.+?)["']/);

      if (urlMatch && titleMatch) {
        const slug = file.replace(".md", "");
        projects.push({
          slug,
          url: urlMatch[1],
          title: titleMatch[1],
        });
      }
    }
  }

  return projects;
}

async function acceptCookies(
  page: import("@playwright/test").Page,
): Promise<void> {
  const selectors = [
    // Button text
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Accept cookies")',
    'button:has-text("Akceptuję")',
    'button:has-text("Akceptuj wszystkie")',
    'button:has-text("Akceptuj")',
    'button:has-text("Zgadzam się")',
    'button:has-text("OK")',
    'button:has-text("Got it")',
    'button:has-text("I agree")',
    'button:has-text("Allow all")',
    'button:has-text("Allow cookies")',
    // Popular IDs/classes
    "#onetrust-accept-btn-handler",
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
    ".cookie-accept",
    '[data-cookiebanner="accept_button"]',
    '[aria-label="Accept cookies"]',
    '[aria-label="Akceptuj cookies"]',
  ];

  for (const selector of selectors) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click();
        return;
      }
    } catch {
      // not found, try next
    }
  }
}

async function optimizeToWebP(
  inputPath: string,
  outputPath: string,
): Promise<void> {
  await sharp(inputPath)
    .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, {
      fit: "cover",
      position: "top",
    })
    .webp({ quality: 85 })
    .toFile(outputPath);

  await fs.unlink(inputPath);
}

async function takeScreenshot(
  browser: import("@playwright/test").Browser,
  url: string,
  slug: string,
  outputDir: string,
  width: number,
  height: number,
  deviceType: "desktop" | "mobile",
): Promise<void> {
  console.log(`  Taking ${deviceType} screenshot (${width}x${height})...`);

  const context = await browser.newContext({
    viewport: { width, height },
    userAgent:
      deviceType === "mobile" ?
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15"
      : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  });

  const page = await context.newPage();
  const tmpPath = path.join(outputDir, `${slug}-${deviceType}-tmp.png`);
  const webpPath = path.join(outputDir, `${slug}-${deviceType}.webp`);

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await acceptCookies(page);

    // Scroll back to top (some sites scroll on load or after cookie accept)
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.waitForTimeout(500);

    // Above-the-fold only (viewport screenshot, no fullPage)
    await page.screenshot({
      path: tmpPath,
      animations: "disabled",
    });

    // Resize to 800x450 and convert to WebP
    await optimizeToWebP(tmpPath, webpPath);

    const stat = await fs.stat(webpPath);
    console.log(
      `  Saved ${slug}-${deviceType}.webp (${Math.round(stat.size / 1024)}KB)`,
    );
  } catch (error) {
    // Clean up tmp file if it exists
    await fs.unlink(tmpPath).catch(() => {});
    console.error(
      `  Failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  } finally {
    await context.close();
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
  console.log("Starting screenshot automation...\n");

  const outputDir = path.join(projectRoot, "public/images/projects");
  await ensureDirectory(outputDir);

  const slugFilter = process.argv[2];
  const allProjects = await getProjects();
  const projects =
    slugFilter ? allProjects.filter((p) => p.slug === slugFilter) : allProjects;
  console.log(
    `Found ${projects.length} project(s)${slugFilter ? ` (filtered: ${slugFilter})` : ""}\n`,
  );

  let successCount = 0;
  let failedCount = 0;
  const failed: string[] = [];

  const browser = await chromium.launch();

  for (const project of projects) {
    console.log(`\nProcessing: ${project.title}`);
    console.log(`  URL: ${project.url}`);

    try {
      await takeScreenshot(
        browser,
        project.url,
        project.slug,
        outputDir,
        1440,
        900,
        "desktop",
      );
      await takeScreenshot(
        browser,
        project.url,
        project.slug,
        outputDir,
        375,
        667,
        "mobile",
      );
      successCount += 2;
    } catch (error) {
      console.error(`\nFailed to capture ${project.title}`);
      failedCount += 2;
      failed.push(project.slug);
    }
  }

  await browser.close();

  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`Successful screenshots: ${successCount}`);
  console.log(`Failed screenshots: ${failedCount}`);

  if (failed.length > 0) {
    console.log(`\nFailed projects: ${failed.join(", ")}`);
  }

  console.log("\nDone! Screenshots saved to:", outputDir);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
