export const sampleMarkdownContent = `# The Complete Guide to Pixel Art Design

Pixel art is a form of digital art where images are created on the pixel level. This comprehensive guide will take you through everything you need to know to get started.

## Getting Started

First, you'll need the right tools. While you can create pixel art with any image editor, specialized tools make the process much easier.

### Recommended Tools

- **Aseprite** (paid, but excellent)
- **GIMP** (free)
- **Photoshop** (with proper settings)

## Color Theory for Pixel Art

Color is crucial in pixel art. With limited resolution, every pixel counts, and color choices can make or break your artwork.

### Palette Limitations

Start with a limited palette. 4-8 colors for beginners, expanding as you gain experience.

> "Constraints breed creativity" - This is especially true in pixel art where limitations force you to be more creative with your solutions.

## Code Example

Here's a simple example of setting up a canvas for pixel art:

\`\`\`javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Disable antialiasing for crisp pixels
ctx.imageSmoothingEnabled = false;

// Set up pixel perfect scaling
canvas.style.imageRendering = 'pixelated';
\`\`\`

## Animation Basics

Pixel art animation follows the same principles as traditional animation but with unique constraints and opportunities.

### Key Techniques

1. **Frame-by-frame animation** for complete control
2. **Timing and spacing** considerations
3. **Limited color palettes** for consistency

Remember to practice regularly and join the pixel art community for feedback and inspiration!
`;
