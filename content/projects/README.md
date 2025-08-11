# Portfolio Projects Management

## How to Add New Projects

Create a new `.md` file in this `content/projects/` folder with the following format:

### File Structure

```markdown
---
title: "Your Project Title"
description: "Brief description of your project..."
technologies: ["Tech1", "Tech2", "Tech3"]
category: "Project Category"
featured: true
liveUrl: "https://your-project.com"
githubUrl: "https://github.com/your-username/project"
imageUrl: "/api/placeholder/600/400"
startDate: "2024-01-01"
endDate: "2024-06-01"
---

# Your Project Title

Detailed description of your project using **Markdown**.

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

Explain the technical stack and implementation details.

## Results/Impact

Share the outcomes and achievements.
```

### Field Descriptions

- **title**: Project name (required)
- **description**: Brief summary for project cards (required)
- **technologies**: Array of technologies used (required)
- **category**: Project category for filtering (required)
- **featured**: Set to `true` to show on homepage, `false` to hide
- **liveUrl**: Link to live project (use `null` if not available)
- **githubUrl**: Link to GitHub repo (use `null` if not available)
- **imageUrl**: Project image (use placeholder for now)
- **startDate**: Project start date in "YYYY-MM-DD" format
- **endDate**: Project end date (optional, remove if ongoing)

### Categories

Suggested categories:
- "Content Strategy"
- "Technical Writing"
- "Community Building"
- "Social Media"
- "Research"
- "Education"

### Example Files

Check existing files for reference:
- `learn-prompting-content.md`
- `turingpost-ai-content.md`
- `thesequence-growth.md`

### Automatic Features

- ✅ Projects appear on portfolio page automatically
- ✅ Featured projects show on homepage
- ✅ Proper URL routing (`/projects/your-project-id`)
- ✅ Technology filtering and categorization
- ✅ Markdown content rendering

### Workflow

1. Create new `.md` file in `content/projects/`
2. Add frontmatter with project metadata
3. Write detailed project description in Markdown
4. Save file - it's immediately available on your website!