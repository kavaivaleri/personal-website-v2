import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { BlogPost } from '@shared/schema';

interface BlogMetadata {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  published: boolean;
  publishedAt: string;
}

export class BlogReader {
  private contentPath: string;

  constructor() {
    this.contentPath = join(process.cwd(), 'content', 'blog');
  }

  private parseMarkdownFile(filename: string): BlogPost | null {
    try {
      const filePath = join(this.contentPath, filename);
      if (!existsSync(filePath)) {
        return null;
      }

      const fileContent = readFileSync(filePath, 'utf-8');
      const { metadata, content } = this.parseFrontmatter(fileContent);
      
      if (!metadata) {
        return null;
      }

      const id = filename.replace('.md', '');
      
      return {
        id,
        title: metadata.title,
        slug: metadata.slug,
        excerpt: metadata.excerpt,
        content: content.trim(),
        tags: metadata.tags,
        readTime: metadata.readTime,
        published: metadata.published ? "true" : "false",
        publishedAt: new Date(metadata.publishedAt),
        createdAt: new Date(metadata.publishedAt),
      };
    } catch (error) {
      console.error(`Error reading blog post ${filename}:`, error);
      return null;
    }
  }

  private parseFrontmatter(content: string): { metadata: BlogMetadata | null; content: string } {
    if (!content.startsWith('---')) {
      return { metadata: null, content };
    }

    const parts = content.split('---');
    if (parts.length < 3) {
      return { metadata: null, content };
    }

    const frontmatterText = parts[1];
    const markdownContent = parts.slice(2).join('---');

    try {
      const metadata: Partial<BlogMetadata> = {};
      const lines = frontmatterText.trim().split('\n');
      
      for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        if (!key || valueParts.length === 0) continue;
        
        let value = valueParts.join(':').trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        switch (key.trim()) {
          case 'title':
            metadata.title = value;
            break;
          case 'slug':
            metadata.slug = value;
            break;
          case 'excerpt':
            metadata.excerpt = value;
            break;
          case 'tags':
            // Parse array format: ["tag1", "tag2", "tag3"]
            if (value.startsWith('[') && value.endsWith(']')) {
              metadata.tags = value.slice(1, -1)
                .split(',')
                .map(tag => tag.trim().replace(/['"]/g, ''))
                .filter(tag => tag.length > 0);
            }
            break;
          case 'readTime':
            metadata.readTime = value;
            break;
          case 'published':
            metadata.published = value === 'true';
            break;
          case 'publishedAt':
            metadata.publishedAt = value;
            break;
        }
      }

      return {
        metadata: metadata as BlogMetadata,
        content: markdownContent
      };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return { metadata: null, content };
    }
  }

  getAllBlogPosts(): BlogPost[] {
    try {
      if (!existsSync(this.contentPath)) {
        return [];
      }

      const files = readdirSync(this.contentPath)
        .filter(file => file.endsWith('.md'));

      const posts = files
        .map(file => this.parseMarkdownFile(file))
        .filter((post): post is BlogPost => post !== null);

      return posts.sort((a, b) => 
        (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
      );
    } catch (error) {
      console.error('Error reading blog posts:', error);
      return [];
    }
  }

  getBlogPost(id: string): BlogPost | null {
    return this.parseMarkdownFile(`${id}.md`);
  }

  getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  getPublishedBlogPosts(): BlogPost[] {
    return this.getAllBlogPosts().filter(post => post.published === "true");
  }

  searchBlogPosts(query: string): BlogPost[] {
    const lowerQuery = query.toLowerCase();
    return this.getPublishedBlogPosts().filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

export const blogReader = new BlogReader();