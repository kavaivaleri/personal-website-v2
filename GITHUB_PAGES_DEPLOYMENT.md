# GitHub Pages Deployment Guide

This site has been converted to work with GitHub Pages by using static JSON files instead of API routes.

## Setup

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to `main`

2. **Custom Domain:**
   - The CNAME file is already configured for `valeriiakuka.com`
   - Make sure your domain DNS is configured correctly:
     - Add a CNAME record pointing `valeriiakuka.com` to `yourusername.github.io`
     - Or add A records for GitHub Pages IPs

## How It Works

- **Static Data Generation**: The `generate-static-data.js` script reads markdown files and generates JSON files
- **Build Process**: `npm run build:static` generates static data and builds the Vite app
- **Deployment**: GitHub Actions automatically builds and deploys on every push to main

## Local Testing

To test the static build locally:

```bash
npm run build:static
# Then serve dist/public with a static server
npx serve dist/public
```

## Files Generated

The build process creates:
- `/api/blog-posts.json` - All blog posts
- `/api/blog-posts/slug/{slug}.json` - Individual blog posts
- `/api/publications.json` - All publications
- `/api/publications/featured.json` - Featured publications
- `/api/about.json` - About page data

All data is read from markdown files in `content/` directory.

