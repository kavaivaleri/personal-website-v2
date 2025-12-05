# Static Site Deployment Guide

Your website is now fully static! This means you can deploy it to any static hosting service (GitHub Pages, Netlify, Vercel, etc.) without needing a server.

## How It Works

1. **Content Management**: All content is stored in markdown files in the `content/` directory
2. **Static Generation**: Before building, a script generates JSON files from markdown
3. **Static Build**: Vite builds a fully static React app that fetches from these JSON files
4. **Client-Side Routing**: All routing is handled client-side using `wouter`

## Building for Static Deployment

To build your static site:

```bash
npm run build:static
```

This will:
1. Generate static JSON files from markdown content
2. Build the React app with Vite
3. Output everything to `dist/public/`

## Deploying

### GitHub Pages

1. Build the static site: `npm run build:static`
2. Copy the contents of `dist/public/` to your GitHub Pages branch
3. Or use GitHub Actions (see below)

### Netlify / Vercel

1. Set build command: `npm run build:static`
2. Set publish directory: `dist/public`
3. Deploy!

### Manual Deployment

1. Run `npm run build:static`
2. Upload the contents of `dist/public/` to your hosting service

## Development

For local development with hot reload:

```bash
npm run dev
```

This runs the Express server (only needed for development).

## Updating Content

1. Edit markdown files in `content/blog/`, `content/publications/`, or `content/about/`
2. Run `npm run generate:static` to regenerate JSON files
3. Rebuild: `npm run build:static`

## File Structure

```
content/
├── blog/              # Blog posts (markdown)
├── publications/      # Publications (markdown)
└── about/            # About page (markdown)

client/public/api/    # Generated JSON files (auto-generated)
├── blog-posts.json
├── blog-posts/slug/
├── publications.json
├── publications/featured.json
└── about.json

dist/public/          # Built static site (output)
```

## Benefits of Static Site

✅ **Fast**: No server needed, served from CDN
✅ **Free**: Can host on GitHub Pages, Netlify, Vercel for free
✅ **Secure**: No server vulnerabilities
✅ **Scalable**: CDN handles traffic automatically
✅ **Simple**: Just HTML, CSS, and JavaScript files

