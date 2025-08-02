import { type Project } from "@shared/schema";

export const sampleProjects: Project[] = [
  {
    id: "pixel-art-generator",
    title: "Pixel Art Generator",
    description: "Interactive web app for creating pixel art with customizable grids and color palettes.",
    content: `# Pixel Art Generator

This project is an interactive web application that allows users to create pixel art with ease. Built with React and HTML5 Canvas, it features a comprehensive set of tools for both beginners and experienced pixel artists.

## Features

- **Customizable Grid Sizes**: Choose from preset sizes or create custom dimensions
- **Color Palette Management**: Create, save, and share custom color palettes
- **Export Functionality**: Export your artwork in various formats (PNG, SVG, GIF)
- **Real-time Preview**: See your changes instantly as you work
- **Onion Skinning**: For animation workflows
- **Symmetry Tools**: Create perfectly balanced designs

## Technologies Used

- React for the user interface
- HTML5 Canvas API for drawing operations
- CSS Grid for layout management
- Local Storage for saving projects
- Web Workers for performance optimization

## Challenges Solved

One of the main challenges was creating a smooth drawing experience while maintaining pixel-perfect precision. I implemented a custom event handling system that tracks mouse movements and translates them into precise pixel coordinates.

## Future Enhancements

- Collaborative editing features
- Cloud storage integration
- Advanced animation tools
- Mobile touch optimization`,
    technologies: ["React", "Canvas API", "CSS Grid", "Web Workers"],
    githubUrl: "https://github.com/val/pixel-art-generator",
    liveUrl: "https://val-pixel-art.netlify.app",
    imageUrl: "/api/placeholder/600/400",
    category: "Web Development",
    featured: "true",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Responsive portfolio site with blog integration and GitHub Pages deployment.",
    content: `# Portfolio Website

A modern, responsive portfolio website showcasing my work and thoughts. This project demonstrates my skills in front-end development, design, and user experience.

## Design Philosophy

The design embraces a pixel art aesthetic while maintaining modern usability standards. Every element is carefully crafted to create a cohesive visual experience that reflects my personality and technical skills.

## Features

- **Responsive Design**: Works perfectly on all device sizes
- **Blog Integration**: Markdown-powered blog system
- **Project Showcase**: Interactive portfolio gallery
- **Contact Form**: Functional contact system with validation
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **GitHub Pages Ready**: Static site generation for easy deployment

## Technical Implementation

The site is built with modern web technologies focusing on performance and accessibility. The architecture is designed to be maintainable and scalable.

## Performance Optimizations

- Lazy loading for images
- Minified and compressed assets
- Efficient caching strategies
- Optimized font loading
- Progressive enhancement

## Accessibility Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast compliance
- Screen reader optimization`,
    technologies: ["HTML5", "Tailwind CSS", "JavaScript", "Markdown"],
    githubUrl: "https://github.com/val/portfolio",
    liveUrl: "https://val.github.io",
    imageUrl: "/api/placeholder/600/400",
    category: "Web Development",
    featured: "true",
    createdAt: new Date("2024-02-01"),
  },
];
