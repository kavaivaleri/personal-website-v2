import { type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private blogPosts: Map<string, BlogPost>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample projects
    const sampleProjects: Project[] = [
      {
        id: "pixel-art-generator",
        title: "Pixel Art Generator",
        description: "Interactive web app for creating pixel art with customizable grids and color palettes.",
        content: "# Pixel Art Generator\n\nThis project is an interactive web application that allows users to create pixel art with ease. Built with React and HTML5 Canvas, it features:\n\n## Features\n- Customizable grid sizes\n- Color palette management\n- Export functionality\n- Real-time preview\n\n## Technologies Used\n- React\n- HTML5 Canvas API\n- CSS Grid\n- Local Storage\n\nThe application provides an intuitive interface for both beginners and experienced pixel artists.",
        technologies: ["React", "Canvas API", "CSS Grid"],
        githubUrl: "https://github.com/val/pixel-art-generator",
        liveUrl: "https://val-pixel-art.netlify.app",
        imageUrl: "/api/placeholder/600/400",
        category: "Web Development",
        featured: "true",
        createdAt: new Date(),
      },
      {
        id: "portfolio-website",
        title: "Portfolio Website",
        description: "Responsive portfolio site with blog integration and GitHub Pages deployment.",
        content: "# Portfolio Website\n\nA modern, responsive portfolio website showcasing my work and thoughts.\n\n## Features\n- Responsive design\n- Blog with markdown support\n- Project showcase\n- Contact form\n- SEO optimized\n\n## Technologies\n- HTML5\n- Tailwind CSS\n- JavaScript\n- Markdown processing",
        technologies: ["HTML5", "Tailwind CSS", "Markdown"],
        githubUrl: "https://github.com/val/portfolio",
        liveUrl: "https://val.github.io",
        imageUrl: "/api/placeholder/600/400",
        category: "Web Development",
        featured: "true",
        createdAt: new Date(),
      },
      {
        id: "retro-game",
        title: "Retro Platform Game",
        description: "Browser-based platformer game with pixel art graphics and chiptune soundtrack.",
        content: "# Retro Platform Game\n\nA nostalgic browser-based platformer that brings back the golden age of gaming.\n\n## Game Features\n- Pixel art graphics\n- Chiptune soundtrack\n- Multiple levels\n- Power-ups and collectibles\n- Local high scores\n\n## Technical Implementation\n- JavaScript game engine\n- WebGL for rendering\n- Web Audio API for sound\n- Canvas-based UI",
        technologies: ["JavaScript", "WebGL", "Web Audio"],
        githubUrl: "https://github.com/val/retro-game",
        liveUrl: "https://val-retro-game.netlify.app",
        imageUrl: "/api/placeholder/600/400",
        category: "Game Development",
        featured: "false",
        createdAt: new Date(),
      }
    ];

    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "pixel-art-guide",
        title: "The Complete Guide to Pixel Art Design",
        slug: "pixel-art-guide",
        excerpt: "Learn the fundamentals of pixel art creation, from choosing the right tools to mastering color palettes and animation techniques...",
        content: "# The Complete Guide to Pixel Art Design\n\nPixel art is a form of digital art where images are created on the pixel level. This comprehensive guide will take you through everything you need to know to get started.\n\n## Getting Started\n\nFirst, you'll need the right tools. While you can create pixel art with any image editor, specialized tools make the process much easier.\n\n### Recommended Tools\n- Aseprite (paid, but excellent)\n- GIMP (free)\n- Photoshop (with proper settings)\n\n## Color Theory for Pixel Art\n\nColor is crucial in pixel art. With limited resolution, every pixel counts, and color choices can make or break your artwork.\n\n### Palette Limitations\nStart with a limited palette. 4-8 colors for beginners, expanding as you gain experience.\n\n## Animation Basics\n\nPixel art animation follows the same principles as traditional animation but with unique constraints and opportunities.",
        tags: ["Design", "Pixel Art", "Tutorial"],
        readTime: "8 min read",
        published: "true",
        publishedAt: new Date("2024-03-15"),
        createdAt: new Date("2024-03-15"),
      },
      {
        id: "responsive-design",
        title: "Modern Responsive Design Patterns",
        slug: "responsive-design-patterns",
        excerpt: "Exploring CSS Grid, Flexbox, and container queries to create truly responsive layouts that work across all devices...",
        content: "# Modern Responsive Design Patterns\n\nResponsive design has evolved significantly since its inception. Let's explore modern techniques that go beyond simple media queries.\n\n## CSS Grid for Layouts\n\nCSS Grid has revolutionized how we think about layouts. Unlike Flexbox, which is one-dimensional, Grid gives us two-dimensional control.\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}\n```\n\n## Container Queries\n\nContainer queries allow components to respond to their container's size rather than the viewport size.\n\n## Flexbox for Components\n\nWhile Grid is great for layouts, Flexbox excels at component-level arrangements.",
        tags: ["CSS", "Responsive", "Web Dev"],
        readTime: "12 min read",
        published: "true",
        publishedAt: new Date("2024-03-08"),
        createdAt: new Date("2024-03-08"),
      },
      {
        id: "creative-coding",
        title: "Creative Coding with Canvas API",
        slug: "creative-coding-canvas",
        excerpt: "Dive into generative art and interactive visualizations using JavaScript and the HTML5 Canvas API...",
        content: "# Creative Coding with Canvas API\n\nThe Canvas API opens up a world of possibilities for creative expression through code. Let's explore how to create stunning visual effects.\n\n## Getting Started with Canvas\n\n```javascript\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\n// Set canvas size\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n```\n\n## Generative Art Basics\n\nGenerative art uses algorithms to create artwork. We can use mathematical functions to create interesting patterns.\n\n## Animation Loops\n\nCreating smooth animations requires understanding the requestAnimationFrame API.\n\n## Interactive Elements\n\nMaking your canvas respond to user input adds an extra dimension to your creations.",
        tags: ["JavaScript", "Canvas", "Generative Art"],
        readTime: "15 min read",
        published: "true",
        publishedAt: new Date("2024-02-28"),
        createdAt: new Date("2024-02-28"),
      }
    ];

    // Add sample data to storage
    sampleProjects.forEach(project => this.projects.set(project.id, project));
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured === "true");
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date() 
    };
    this.projects.set(id, project);
    return project;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published === "true")
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      createdAt: new Date(),
      publishedAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.published === "true" && (
          post.title.toLowerCase().includes(lowerQuery) ||
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
      )
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
