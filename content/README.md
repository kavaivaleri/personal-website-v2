# Content Management System

Welcome to your file-based content management system! You can now easily manage all parts of your website by editing markdown files.

## 📁 Folder Structure

```
content/
├── blog/           # Blog articles
├── projects/       # Portfolio projects
├── about/          # Personal information
└── README.md       # This guide
```

## 📝 Blog Posts (`content/blog/`)

Write articles as markdown files with frontmatter:

```markdown
---
title: "Article Title"
slug: "article-slug"
excerpt: "Brief description..."
tags: ["AI/ML", "Tutorial"]
readTime: "8 min read"
published: true
publishedAt: "2024-01-15"
---

# Article content in Markdown...
```

**Features:**
- ✅ Automatic blog page integration
- ✅ Search functionality
- ✅ URL routing (`/blog/article-slug`)
- ✅ Tag filtering

## 💼 Portfolio Projects (`content/projects/`)

Showcase your work with detailed project files:

```markdown
---
title: "Project Name"
description: "Brief project description..."
technologies: ["Tech1", "Tech2"]
category: "Content Strategy"
featured: false
liveUrl: "https://project.com"
githubUrl: "https://github.com/user/project"
startDate: "2024-01-01"
---

# Project details in Markdown...
```

**Features:**
- ✅ Portfolio page display
- ✅ Featured projects on homepage
- ✅ Technology filtering
- ✅ Category organization

## 👤 About Information (`content/about/`)

Manage your personal profile:

```markdown
---
name: "Your Name"
title: "Your Title"
email: "your@email.com"
location: "Your Location"
linkedin: "https://linkedin.com/in/profile"
---

# About content in Markdown...
```

**Features:**
- ✅ Contact form integration
- ✅ Footer information
- ✅ SEO meta tags

## 🚀 How It Works

1. **Edit Files**: Just edit markdown files in the folders above
2. **Automatic Loading**: Changes appear immediately on your website
3. **No Database**: Files are the source of truth
4. **Version Control**: Easy to backup and track changes with git
5. **No Server Restart**: Hot reloading for instant updates

## 📋 Quick Tasks

### Add a New Blog Post
1. Create `content/blog/your-article.md`
2. Add frontmatter with metadata
3. Write content in Markdown
4. Save - it's live!

### Add a New Project
1. Create `content/projects/your-project.md`
2. Add project metadata in frontmatter
3. Describe your project in Markdown
4. Set `featured: false` to show on homepage

### Update Your Bio
1. Edit `content/about/profile.md`
2. Update frontmatter fields
3. Modify bio content
4. Changes reflect across the site

## 🎯 Benefits

- **Easy Content Management**: Simple markdown files
- **No Technical Knowledge Required**: Just edit text files
- **Fast Performance**: Direct file reading
- **Backup Friendly**: Copy files to backup everything
- **Search Engine Friendly**: Clean URLs and proper meta tags

## 🔧 Advanced Usage

You can extend this system by adding:
- `content/testimonials/` - Client testimonials
- `content/speaking/` - Speaking engagements
- `content/skills/` - Technical skills
- `content/timeline/` - Career timeline

Each new folder just needs a corresponding reader in the backend to integrate with the website.

Happy content creating! 🎉