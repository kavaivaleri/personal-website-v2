import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

function parseFrontmatter(content) {
  if (!content.startsWith('---')) {
    return { metadata: null, content };
  }
  
  const parts = content.split('---');
  if (parts.length < 3) {
    return { metadata: null, content };
  }
  
  const frontmatterText = parts[1];
  const markdownContent = parts.slice(2).join('---');
  
  const metadata = {};
  const lines = frontmatterText.trim().split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (!key || valueParts.length === 0) continue;
    
    let value = valueParts.join(':').trim();
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    const keyTrimmed = key.trim();
    
    if (keyTrimmed === 'tags' && value.startsWith('[') && value.endsWith(']')) {
      metadata.tags = value.slice(1, -1)
        .split(',')
        .map(tag => tag.trim().replace(/['"]/g, ''))
        .filter(tag => tag.length > 0);
    } else if (keyTrimmed === 'featured' || keyTrimmed === 'published') {
      metadata[keyTrimmed] = value === 'true' || value === true;
    } else {
      metadata[keyTrimmed] = value;
    }
  }
  
  return { metadata, content: markdownContent };
}

function readBlogPosts() {
  const blogDir = join(rootDir, 'content', 'blog');
  if (!existsSync(blogDir)) {
    return [];
  }
  
  const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));
  const posts = [];
  
  for (const file of files) {
    try {
      const filePath = join(blogDir, file);
      const content = readFileSync(filePath, 'utf-8');
      const { metadata, content: markdownContent } = parseFrontmatter(content);
      
      if (!metadata || !metadata.title || !metadata.slug) {
        console.warn(`Skipping ${file}: missing required metadata`);
        continue;
      }
      
      const id = file.replace('.md', '');
      const post = {
        id,
        title: metadata.title,
        slug: metadata.slug,
        excerpt: metadata.excerpt || '',
        content: markdownContent.trim(),
        tags: metadata.tags || [],
        readTime: metadata.readTime || '5 min read',
        published: metadata.published !== false ? "true" : "false",
        publishedAt: metadata.publishedAt || new Date().toISOString(),
        imageUrl: metadata.image || null,
        createdAt: metadata.publishedAt || new Date().toISOString(),
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error reading blog post ${file}:`, error);
    }
  }
  
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function readPublications() {
  const publicationsDir = join(rootDir, 'content', 'publications');
  if (!existsSync(publicationsDir)) {
    return [];
  }
  
  const files = readdirSync(publicationsDir).filter(file => file.endsWith('.md'));
  const publications = [];
  
  for (const file of files) {
    try {
      const filePath = join(publicationsDir, file);
      const content = readFileSync(filePath, 'utf-8');
      const { metadata } = parseFrontmatter(content);
      
      if (!metadata || !metadata.title || !metadata.url) {
        console.warn(`Skipping ${file}: missing required metadata`);
        continue;
      }
      
      const id = file.replace('.md', '');
      const publication = {
        id,
        title: metadata.title,
        description: metadata.description || '',
        url: metadata.url,
        publication: metadata.publication || 'Unknown',
        category: metadata.category || 'Uncategorized',
        publishedAt: metadata.publishedAt || new Date().toISOString(),
        featured: metadata.featured ? "true" : "false",
        priority: metadata.priority || null,
        readTime: metadata.readTime || null,
        imageUrl: metadata.imageUrl || null,
        createdAt: metadata.publishedAt || new Date().toISOString(),
      };
      
      publications.push(publication);
    } catch (error) {
      console.error(`Error reading publication ${file}:`, error);
    }
  }
  
  return publications.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function readAboutInfo() {
  const aboutFile = join(rootDir, 'content', 'about', 'profile.md');
  if (!existsSync(aboutFile)) {
    return { 
      name: '', 
      title: '', 
      email: '',
      location: '',
      linkedin: '',
      twitter: '',
      content: '' 
    };
  }
  
  try {
    const content = readFileSync(aboutFile, 'utf-8');
    const { metadata, content: markdownContent } = parseFrontmatter(content);
    
    return {
      name: metadata?.name || '',
      title: metadata?.title || '',
      email: metadata?.email || '',
      location: metadata?.location || '',
      linkedin: metadata?.linkedin || '',
      twitter: metadata?.twitter || '',
      content: markdownContent.trim(),
    };
  } catch (error) {
    console.error('Error reading about info:', error);
    return { 
      name: '', 
      title: '', 
      email: '',
      location: '',
      linkedin: '',
      twitter: '',
      content: '' 
    };
  }
}

// Generate static data files
const outputDir = join(rootDir, 'client', 'public', 'api');
const blogPostsDir = join(outputDir, 'blog-posts', 'slug');
const publicationsDir = join(outputDir, 'publications');

// Create directories
[outputDir, blogPostsDir, publicationsDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

console.log('📝 Generating static data files...');

// Generate blog posts
const blogPosts = readBlogPosts();
const publishedBlogPosts = blogPosts.filter(post => post.published === "true");

writeFileSync(
  join(outputDir, 'blog-posts.json'),
  JSON.stringify(publishedBlogPosts, null, 2)
);

// Generate individual blog post files
for (const post of publishedBlogPosts) {
  writeFileSync(
    join(blogPostsDir, `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  );
}

console.log(`✅ Generated ${publishedBlogPosts.length} blog posts`);

// Generate publications
const publications = readPublications();

writeFileSync(
  join(outputDir, 'publications.json'),
  JSON.stringify(publications, null, 2)
);

// Generate featured publications
const featuredPublications = publications
  .filter(pub => pub.featured === "true")
  .sort((a, b) => {
    const priorityA = a.priority ? parseInt(a.priority, 10) : 999;
    const priorityB = b.priority ? parseInt(b.priority, 10) : 999;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

writeFileSync(
  join(publicationsDir, 'featured.json'),
  JSON.stringify(featuredPublications, null, 2)
);

console.log(`✅ Generated ${publications.length} publications`);

// Generate about info
const aboutInfo = readAboutInfo();
writeFileSync(
  join(outputDir, 'about.json'),
  JSON.stringify(aboutInfo, null, 2)
);

console.log('✅ Generated about.json');
console.log('🎉 Static data generation complete!');

