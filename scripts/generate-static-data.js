import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read blog posts
function readBlogPosts() {
  const blogPath = join(rootDir, 'content', 'blog');
  if (!existsSync(blogPath)) return [];
  
  const files = readdirSync(blogPath).filter(f => f.endsWith('.md'));
  const posts = [];
  
  for (const file of files) {
    const content = readFileSync(join(blogPath, file), 'utf-8');
    const { metadata } = parseFrontmatter(content);
    if (metadata && (metadata.published === 'true' || metadata.published === true)) {
      const id = file.replace('.md', '');
      posts.push({
        id,
        title: metadata.title,
        slug: metadata.slug,
        excerpt: metadata.excerpt,
        content: content.split('---').slice(2).join('---').trim(),
        tags: metadata.tags || [],
        readTime: metadata.readTime,
        published: 'true',
        publishedAt: new Date(metadata.publishedAt).toISOString(),
        imageUrl: metadata.image || null,
        createdAt: new Date(metadata.publishedAt).toISOString(),
      });
    }
  }
  
  return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

// Read publications
function readPublications() {
  const pubPath = join(rootDir, 'content', 'publications');
  if (!existsSync(pubPath)) return [];
  
  const files = readdirSync(pubPath).filter(f => f.endsWith('.md'));
  const pubs = [];
  
  for (const file of files) {
    const content = readFileSync(join(pubPath, file), 'utf-8');
    const { metadata } = parseFrontmatter(content);
    if (metadata) {
      const id = file.replace('.md', '');
      pubs.push({
        id,
        title: metadata.title,
        description: metadata.description,
        url: metadata.url,
        publication: metadata.publication,
        category: metadata.category,
        publishedAt: new Date(metadata.publishedAt).toISOString(),
        featured: metadata.featured === true || metadata.featured === 'true' ? 'true' : 'false',
        priority: metadata.priority || null,
        readTime: metadata.readTime || null,
        imageUrl: metadata.image || metadata.imageUrl || null,
        createdAt: new Date(metadata.publishedAt).toISOString(),
      });
    }
  }
  
  return pubs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

// Read about info
function readAboutInfo() {
  const aboutPath = join(rootDir, 'content', 'about', 'profile.md');
  if (!existsSync(aboutPath)) return null;
  
  const content = readFileSync(aboutPath, 'utf-8');
  const { metadata, content: markdownContent } = parseFrontmatter(content);
  
  return {
    metadata: {
      name: metadata.name,
      title: metadata.title,
      email: metadata.email,
      location: metadata.location,
      linkedin: metadata.linkedin,
      twitter: metadata.twitter,
    },
    content: markdownContent.trim(),
  };
}

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
    } else if (keyTrimmed === 'featured') {
      metadata.featured = value === 'true' || value === true;
    } else if (keyTrimmed === 'published') {
      metadata.published = value === 'true' || value === true;
    } else if (keyTrimmed === 'image') {
      // Handle both 'image' and 'imageUrl' fields
      metadata.image = value;
      metadata.imageUrl = value; // Also set imageUrl for compatibility
    } else {
      metadata[keyTrimmed] = value;
    }
  }
  
  return { metadata, content: markdownContent };
}

// Generate static data files
const blogPosts = readBlogPosts();
const publications = readPublications();
const aboutInfo = readAboutInfo();

const staticDataDir = join(rootDir, 'client', 'public', 'api');

// Create API directory structure
mkdirSync(join(staticDataDir, 'blog-posts', 'slug'), { recursive: true });
mkdirSync(join(staticDataDir, 'publications'), { recursive: true });

writeFileSync(
  join(staticDataDir, 'blog-posts.json'),
  JSON.stringify(blogPosts, null, 2)
);

writeFileSync(
  join(staticDataDir, 'publications.json'),
  JSON.stringify(publications, null, 2)
);

const featuredPublications = publications
  .filter(p => p.featured === 'true')
  .sort((a, b) => {
    const priorityA = a.priority ? parseInt(a.priority, 10) : 999;
    const priorityB = b.priority ? parseInt(b.priority, 10) : 999;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

writeFileSync(
  join(staticDataDir, 'publications', 'featured.json'),
  JSON.stringify(featuredPublications, null, 2)
);

if (aboutInfo) {
  writeFileSync(
    join(staticDataDir, 'about.json'),
    JSON.stringify(aboutInfo, null, 2)
  );
}

// Create individual blog post files
for (const post of blogPosts) {
  writeFileSync(
    join(staticDataDir, 'blog-posts', 'slug', `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  );
}

console.log('✅ Static data generated successfully!');
console.log(`   - ${blogPosts.length} blog posts`);
console.log(`   - ${publications.length} publications`);
console.log(`   - ${featuredPublications.length} featured publications`);

