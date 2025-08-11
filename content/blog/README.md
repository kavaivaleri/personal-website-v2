# Blog Posts Management

## How to Add New Articles

Simply create a new `.md` file in this `content/blog/` folder with the following format:

### File Structure

```markdown
---
title: "Your Article Title"
slug: "your-article-slug"
excerpt: "Brief description that appears on the blog page..."
tags: ["AI/ML", "Technical Writing", "Your Tags"]
readTime: "8 min read"
published: true
publishedAt: "2024-01-15"
---

# Your Article Title

Write your full article content here using **Markdown**. You can include:

## Headings
- Bullet points  
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks

### Subheadings
Your content here...
```

### Important Notes

1. **Filename**: Use the same name as your slug (e.g., `your-article-slug.md`)
2. **Slug**: Must be unique and URL-friendly (lowercase, hyphens instead of spaces)
3. **Published**: Set to `true` to make the article visible, `false` to keep it as draft
4. **Date Format**: Use "YYYY-MM-DD" format for publishedAt
5. **Tags**: Use array format with quotes: `["Tag1", "Tag2", "Tag3"]`

### Example Files

Check the existing files in this folder for examples:
- `jepa-explained.md`
- `rag-implementation-guide.md` 
- `ai-content-strategy.md`

### Automatic Features

Once you add a new markdown file:
- ✅ It automatically appears on the blog page
- ✅ It becomes searchable
- ✅ It gets proper URL routing (`/blog/your-article-slug`)
- ✅ Markdown formatting is automatically rendered
- ✅ It's sorted by publication date

### Workflow

1. Create new `.md` file in `content/blog/`
2. Add frontmatter (the part between `---` lines)
3. Write your content in Markdown
4. Save the file
5. The article is immediately available on your website!

No server restart needed - the system reads files dynamically.