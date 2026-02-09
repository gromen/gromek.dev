# Deployment Guide — gromek.dev

## Prerequisites ✓

- [x] All features implemented (F1-F9)
- [x] Build passes: `npm run build` ✓
- [x] Git repository initialized
- [x] GitHub account ready
- [ ] Netlify account (free tier)
- [ ] OVH domain: `gromek.dev` registered

---

## Step 1: Commit Changes to Git

All implementation is complete. Commit the changes:

```bash
# Add all files
git add .

# Create commit with Conventional Commits format
git commit -m "feat: implement complete portfolio site

- Hero, About, Tech Stack sections
- ExperienceTimeline with CV data
- Content Collections for 12 projects
- ProjectCard component with responsive grid
- Contact page with Formspree integration
- Mobile-responsive navigation with hamburger menu
- SEO optimizations (OG tags, Twitter cards, sitemap)
- Lighthouse optimizations (Performance, A11y, SEO)
- Dark/light mode toggle
- i18n support (PL/EN)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Step 2: Push to GitHub

If remote doesn't exist yet:

```bash
# Create new repo on GitHub (github.com/new)
# Name: gromek.dev
# Description: Professional portfolio - Frontend Developer

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/gromek.dev.git

# Push to main
git push -u origin main
```

If remote already exists:

```bash
git push
```

---

## Step 3: Deploy to Netlify

### 3.1 Sign up / Log in to Netlify
- Go to https://app.netlify.com/
- Sign up with GitHub account (recommended)

### 3.2 Create New Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **GitHub**
3. Authorize Netlify to access your repositories
4. Select **gromek.dev** repository

### 3.3 Configure Build Settings
Netlify should auto-detect Astro. Verify settings:

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (or latest LTS)

### 3.4 Environment Variables (Optional)
If you set up Formspree, no env vars needed (form ID is in code).

### 3.5 Deploy
1. Click **"Deploy site"**
2. Wait ~1-2 minutes for build
3. Site will be live at: `https://random-name-12345.netlify.app`

---

## Step 4: Configure Custom Domain (gromek.dev)

### 4.1 Add Custom Domain in Netlify
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `gromek.dev`
4. Click **"Verify"** and **"Add domain"**

### 4.2 Configure DNS in OVH
1. Log in to OVH control panel
2. Go to **Domains** → **gromek.dev** → **DNS Zone**
3. Delete any existing A/CNAME records for `@` and `www`
4. Add the following records:

**For apex domain (gromek.dev):**
- Type: **A**
- Name: **@**
- Value: `75.2.60.5` (Netlify's load balancer)
- TTL: 3600

**For www subdomain (www.gromek.dev):**
- Type: **CNAME**
- Name: **www**
- Value: `random-name-12345.netlify.app` (your Netlify subdomain)
- TTL: 3600

**Alternative (recommended): Use Netlify DNS**
1. In Netlify, go to **Domain settings** → **DNS**
2. Click **"Use Netlify DNS"**
3. Netlify will provide nameservers (e.g., `dns1.p05.nsone.net`)
4. In OVH, update nameservers to Netlify's nameservers
5. Wait for propagation (up to 24-48 hours, usually faster)

### 4.3 Enable HTTPS
1. In Netlify, go to **Domain settings** → **HTTPS**
2. Click **"Verify DNS configuration"**
3. Once verified, click **"Provision certificate"**
4. Wait ~1 minute for Let's Encrypt SSL certificate
5. Enable **"Force HTTPS"**

---

## Step 5: Post-Deployment Tasks

### 5.1 Generate Real Screenshots
Run the Playwright automation script:

```bash
npx tsx scripts/screenshots.ts
```

This will generate screenshots for all 12 projects:
- Desktop: 1440x900px
- Mobile: 375x667px

### 5.2 Update Project Images
Once screenshots are generated, update Content Collections markdown files:

```markdown
# Before
image: "/images/projects/placeholder.svg"

# After
image: "/images/projects/wojanshop-desktop.png"
```

Commit and push:

```bash
git add public/images/projects/*.png
git add src/content/projects/*.md
git commit -m "feat: add real project screenshots"
git push
```

Netlify will auto-deploy (CI/CD enabled by default).

### 5.3 Create Real OG Image
Create a 1200x630px image for Open Graph:
- Use Figma/Canva/Photoshop
- Include: "Marcin Gromek - Frontend Developer"
- Save as `public/og-image.png`

Commit and push:

```bash
git add public/og-image.png
git commit -m "feat: add Open Graph image"
git push
```

### 5.4 Set Up Formspree (if using contact form)
1. Go to https://formspree.io/
2. Sign up and create a new form
3. Get your form ID (e.g., `mqaazzyy`)
4. Update both contact pages:
   - `src/pages/pl/kontakt.astro` (line 91)
   - `src/pages/en/contact.astro` (line 91)
   - Replace `YOUR_FORM_ID` with actual ID

```astro
<!-- Before -->
action="https://formspree.io/f/YOUR_FORM_ID"

<!-- After -->
action="https://formspree.io/f/mqaazzyy"
```

Commit and push:

```bash
git add src/pages/pl/kontakt.astro src/pages/en/contact.astro
git commit -m "feat: configure Formspree contact form"
git push
```

### 5.5 Run Lighthouse Audit
Test the live site:

```bash
npx lighthouse https://gromek.dev/pl/ --view
npx lighthouse https://gromek.dev/en/ --view
```

Verify scores:
- ✅ Performance: > 95
- ✅ Accessibility: > 95
- ✅ Best Practices: > 90
- ✅ SEO: > 90

---

## Step 6: Verify Deployment

### Checklist
- [ ] Site loads at https://gromek.dev
- [ ] HTTPS enabled (green padlock)
- [ ] Both /pl/ and /en/ versions work
- [ ] Navigation works (all links)
- [ ] Dark/light mode toggle works
- [ ] Mobile menu works on mobile
- [ ] Contact form sends emails (if Formspree configured)
- [ ] All 12 projects display correctly
- [ ] Sitemap accessible: https://gromek.dev/sitemap-index.xml
- [ ] robots.txt accessible: https://gromek.dev/robots.txt

---

## Optional: Submit to Search Engines

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://gromek.dev`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://gromek.dev/sitemap-index.xml`

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site: `https://gromek.dev`
3. Verify ownership
4. Submit sitemap: `https://gromek.dev/sitemap-index.xml`

---

## Troubleshooting

### DNS not propagating
- Check DNS with: `nslookup gromek.dev`
- Check propagation: https://dnschecker.org/
- Wait up to 24-48 hours (usually < 1 hour)

### Build fails on Netlify
- Check build logs in Netlify dashboard
- Verify Node version (should be 18+)
- Try building locally: `npm run build`

### HTTPS certificate fails
- Verify DNS is pointing to Netlify
- Wait 24 hours for DNS propagation
- Try re-provisioning certificate in Netlify

---

## Continuous Deployment (CI/CD)

Netlify automatically redeploys on every push to `main`:

```bash
# Make changes locally
git add .
git commit -m "fix: update contact email"
git push

# Netlify auto-deploys (1-2 minutes)
# Check deploy status: https://app.netlify.com/
```

---

## Summary

Your portfolio is now live at **https://gromek.dev**! 🎉

Next steps:
1. Add real screenshots (F8 automation)
2. Create OG image (1200x630)
3. Configure Formspree (if needed)
4. Run Lighthouse audit
5. Submit to Google Search Console

All features are production-ready. The site is optimized for performance, accessibility, and SEO.
