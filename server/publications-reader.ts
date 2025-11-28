import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Publication } from '@shared/schema';
import { imageExtractor } from './image-extractor.js';

interface PublicationMetadata {
  title: string;
  description: string;
  url: string;
  publication: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  priority?: string;
  readTime?: string;
  imageUrl?: string;
}

export class PublicationsReader {
  private contentPath: string;

  constructor() {
    this.contentPath = join(process.cwd(), 'content', 'publications');
  }

  private async parseMarkdownFile(filename: string): Promise<Publication | null> {
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
      
      // Extract image from URL if no manual imageUrl is provided
      let imageUrl = metadata.imageUrl || null;
      if (!imageUrl && metadata.url) {
        try {
          const extractedImage = await imageExtractor.extractImageFromUrl(metadata.url);
          imageUrl = extractedImage?.url || null;
        } catch (error) {
          console.warn(`Failed to extract image from ${metadata.url}:`, error);
        }
      }
      
      return {
        id,
        title: metadata.title,
        description: metadata.description,
        url: metadata.url,
        publication: metadata.publication,
        category: metadata.category,
        publishedAt: new Date(metadata.publishedAt),
        featured: metadata.featured ? "true" : "false",
        priority: metadata.priority || null,
        readTime: metadata.readTime || null,
        imageUrl,
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
          case 'priority':
            metadata.priority = value;
            break;
          case 'readTime':
            metadata.readTime = value;
            break;
          case 'imageUrl':
            metadata.imageUrl = value;
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

  async getAllPublications(): Promise<Publication[]> {
    try {
      if (!existsSync(this.contentPath)) {
        return [];
      }

      const files = readdirSync(this.contentPath)
        .filter(file => file.endsWith('.md'));

      const publicationPromises = files.map(file => this.parseMarkdownFile(file));
      const publications = (await Promise.all(publicationPromises))
        .filter((publication): publication is Publication => publication !== null);

      return publications.sort((a, b) => 
        (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
      );
    } catch (error) {
      console.error('Error reading publications:', error);
      return [];
    }
  }

  async getPublication(id: string): Promise<Publication | null> {
    return this.parseMarkdownFile(`${id}.md`);
  }

  async getFeaturedPublications(): Promise<Publication[]> {
    const publications = await this.getAllPublications();
    const featured = publications.filter(pub => pub.featured === "true");
    
    // Sort by priority (lower number = higher priority), then by publishedAt
    return featured.sort((a, b) => {
      const priorityA = a.priority ? parseInt(a.priority, 10) : 999;
      const priorityB = b.priority ? parseInt(b.priority, 10) : 999;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If priority is the same, sort by most recent
      return (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0);
    });
  }

  async getPublicationsByCategory(category: string): Promise<Publication[]> {
    const publications = await this.getAllPublications();
    return publications.filter(pub => pub.category === category);
  }

  async searchPublications(query: string): Promise<Publication[]> {
    const lowerQuery = query.toLowerCase();
    const publications = await this.getAllPublications();
    return publications.filter(pub =>
      pub.title.toLowerCase().includes(lowerQuery) ||
      pub.description.toLowerCase().includes(lowerQuery) ||
      pub.publication.toLowerCase().includes(lowerQuery) ||
      pub.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const publicationsReader = new PublicationsReader();