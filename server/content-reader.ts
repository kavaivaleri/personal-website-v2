import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Project } from '@shared/schema';

interface ProjectMetadata {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  startDate: string;
  endDate?: string;
}

interface AboutMetadata {
  name: string;
  title: string;
  email: string;
  location: string;
  linkedin?: string;
  twitter?: string;
}

export class ContentReader {
  private projectsPath: string;
  private aboutPath: string;

  constructor() {
    this.projectsPath = join(process.cwd(), 'content', 'projects');
    this.aboutPath = join(process.cwd(), 'content', 'about');
  }

  private parseMarkdownFile<T>(filePath: string, filename: string): { metadata: T | null; content: string } {
    try {
      if (!existsSync(filePath)) {
        return { metadata: null, content: '' };
      }

      const fileContent = readFileSync(filePath, 'utf-8');
      return this.parseFrontmatter<T>(fileContent);
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      return { metadata: null, content: '' };
    }
  }

  private parseFrontmatter<T>(content: string): { metadata: T | null; content: string } {
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
      const metadata: any = {};
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

        // Parse different value types
        if (value === 'true') {
          metadata[key.trim()] = true;
        } else if (value === 'false') {
          metadata[key.trim()] = false;
        } else if (value === 'null') {
          metadata[key.trim()] = null;
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Parse array format: ["item1", "item2", "item3"]
          metadata[key.trim()] = value.slice(1, -1)
            .split(',')
            .map(item => item.trim().replace(/['"]/g, ''))
            .filter(item => item.length > 0);
        } else {
          metadata[key.trim()] = value;
        }
      }

      return {
        metadata: metadata as T,
        content: markdownContent.trim()
      };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return { metadata: null, content };
    }
  }

  // Projects
  getAllProjects(): Project[] {
    try {
      if (!existsSync(this.projectsPath)) {
        return [];
      }

      const files = readdirSync(this.projectsPath)
        .filter(file => file.endsWith('.md'));

      const projects = files
        .map(file => this.parseProjectFile(file))
        .filter((project): project is Project => project !== null);

      return projects.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  }

  private parseProjectFile(filename: string): Project | null {
    const filePath = join(this.projectsPath, filename);
    const { metadata, content } = this.parseMarkdownFile<ProjectMetadata>(filePath, filename);
    
    if (!metadata) {
      return null;
    }

    const id = filename.replace('.md', '');
    
    return {
      id,
      title: metadata.title,
      description: metadata.description,
      content: content,
      technologies: metadata.technologies,
      category: metadata.category,
      featured: metadata.featured ? "true" : "false",
      liveUrl: metadata.liveUrl,
      githubUrl: metadata.githubUrl,
      imageUrl: metadata.imageUrl,
      createdAt: new Date(metadata.startDate),
    };
  }

  getProject(id: string): Project | null {
    return this.parseProjectFile(`${id}.md`);
  }

  getFeaturedProjects(): Project[] {
    return this.getAllProjects().filter(project => project.featured === "true");
  }

  // About section
  getAboutInfo(): { metadata: AboutMetadata | null; content: string } {
    const filePath = join(this.aboutPath, 'profile.md');
    return this.parseMarkdownFile<AboutMetadata>(filePath, 'profile.md');
  }
}

export const contentReader = new ContentReader();