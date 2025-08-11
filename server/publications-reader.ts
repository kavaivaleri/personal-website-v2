import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Publication } from '@shared/schema';

interface PublicationMetadata {
  title: string;
  description: string;
  url: string;
  publication: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  readTime?: string;
}

export class PublicationsReader {
  private contentPath: string;

  constructor() {
    this.contentPath = join(process.cwd(), 'content', 'publications');
  }

  private parseMarkdownFile(filename: string): Publication | null {
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
        description: metadata.description,
        url: metadata.url,
        publication: metadata.publication,
        category: metadata.category,
        publishedAt: new Date(metadata.publishedAt),
        featured: metadata.featured ? "true" : "false",
        readTime: metadata.readTime || null,
        createdAt: new Date(metadata.publishedAt),
      };
    } catch (error) {
      console.error(`Error reading publication ${filename}:`, error);
      return null;
    }
  }

  private parseFrontmatter(content: string): { metadata: PublicationMetadata | null; content: string } {
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
      const metadata: Partial<PublicationMetadata> = {};
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
          case 'description':
            metadata.description = value;
            break;
          case 'url':
            metadata.url = value;
            break;
          case 'publication':
            metadata.publication = value;
            break;
          case 'category':
            metadata.category = value;
            break;

          case 'publishedAt':
            metadata.publishedAt = value;
            break;
          case 'featured':
            metadata.featured = value === 'true';
            break;
          case 'readTime':
            metadata.readTime = value;
            break;
        }
      }

      return {
        metadata: metadata as PublicationMetadata,
        content: markdownContent
      };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return { metadata: null, content };
    }
  }

  getAllPublications(): Publication[] {
    try {
      if (!existsSync(this.contentPath)) {
        return [];
      }

      const files = readdirSync(this.contentPath)
        .filter(file => file.endsWith('.md'));

      const publications = files
        .map(file => this.parseMarkdownFile(file))
        .filter((publication): publication is Publication => publication !== null);

      return publications.sort((a, b) => 
        (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
      );
    } catch (error) {
      console.error('Error reading publications:', error);
      return [];
    }
  }

  getPublication(id: string): Publication | null {
    return this.parseMarkdownFile(`${id}.md`);
  }

  getFeaturedPublications(): Publication[] {
    return this.getAllPublications().filter(pub => pub.featured === "true");
  }

  getPublicationsByCategory(category: string): Publication[] {
    return this.getAllPublications().filter(pub => pub.category === category);
  }

  searchPublications(query: string): Publication[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllPublications().filter(pub =>
      pub.title.toLowerCase().includes(lowerQuery) ||
      pub.description.toLowerCase().includes(lowerQuery) ||
      pub.publication.toLowerCase().includes(lowerQuery) ||
      pub.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const publicationsReader = new PublicationsReader();