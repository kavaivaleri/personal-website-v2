# Publications Management

## How to Add New Articles

Create a new `.md` file in this `content/publications/` folder with your external article information:

### File Structure

```markdown
---
title: "Your Article Title"
description: "Brief description of the article content..."
url: "https://publication-site.com/your-article"
publication: "Publication Name"
category: "Article Category"
tags: ["Tag1", "Tag2", "Tag3"]
publishedAt: "2024-01-15"
featured: false
readTime: "8 min read"
---

Optional: Add any additional notes or context about the article here.
```

### Field Descriptions

- **title**: Article title (required)
- **description**: Brief summary for the grid card (required)
- **url**: Link to the published article (required)
- **publication**: Where it was published (e.g., "TuringPost", "Learn Prompting")
- **category**: Type of content (required)
- **tags**: Array of relevant tags
- **publishedAt**: Publication date in "YYYY-MM-DD" format
- **featured**: Set to `true` to highlight in featured section
- **readTime**: Estimated reading time (optional)

### Categories

Suggested categories:
- "AI/ML Research"
- "Technical Writing"
- "AI Unicorn Profiles"
- "Implementation Guides"
- "Industry Analysis"
- "Tutorial"

### Example Files

Check existing files for reference:
- `jepa-deep-dive.md` - Research deep dive
- `rag-implementation.md` - Technical guide
- `databricks-profile.md` - Company profile

### Features

- ✅ Grid layout with article cards
- ✅ Search and filtering by tags/category
- ✅ External links to original articles
- ✅ Organized by publication source and category
- ✅ Featured articles section

### Workflow

1. Create new `.md` file in `content/publications/`
2. Add frontmatter with article metadata
3. Include any additional context (optional)
4. Save file - it appears immediately on `/publications` page!

The system automatically creates a professional grid layout showing your published work across different platforms.