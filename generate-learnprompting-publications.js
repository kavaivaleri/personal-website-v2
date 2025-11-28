#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Function to parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  console.log(`📋 Headers found: ${headers.join(' | ')}`);
  
  return lines.slice(1).map((line, index) => {
    if (!line.trim()) return null; // Skip empty lines
    
    // Handle CSV parsing with quoted fields that may contain commas
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value
    
    const obj = {};
    headers.forEach((header, headerIndex) => {
      const key = header.trim().toLowerCase();
      obj[key] = values[headerIndex] ? values[headerIndex].replace(/^"(.*)"$/, '$1') : '';
    });
    
    // Debug: log first few entries
    if (index < 3) {
      console.log(`📝 Row ${index + 1}:`, obj);
    }
    
    return obj;
  }).filter(Boolean); // Remove null entries
}

// Read CSV file
function readPublicationsFromCSV(csvFilePath) {
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ CSV file not found: ${csvFilePath}`);
    console.log('Please provide a valid CSV file path.');
    process.exit(1);
  }
  
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  return parseCSV(csvContent);
}

// Function to create a filename from the title
function createFilename(title) {
  if (!title || typeof title !== 'string') {
    console.error('❌ Invalid title for filename creation:', title);
    return 'unknown.md';
  }
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    + '.md';
}

// Function to estimate read time based on title and excerpt length
function estimateReadTime(title, excerpt) {
  const words = (title + ' ' + (excerpt || '')).split(' ').length;
  const readTime = Math.max(1, Math.ceil(words / 200)); // Assume 200 words per minute
  return readTime;
}

// Function to determine if post should be featured
function shouldBeFeatured(type, title) {
  const featuredTypes = ['Guide', 'Listicle'];
  const hasGuideKeywords = title.toLowerCase().includes('guide') || 
                          title.toLowerCase().includes('complete') ||
                          title.toLowerCase().includes('ultimate');
  
  return featuredTypes.some(t => type.includes(t)) || hasGuideKeywords;
}

// Function to generate markdown content
function generateMarkdown(pub) {
  const readTime = estimateReadTime(pub.title, pub.excerpt);
  const featured = shouldBeFeatured(pub.type, pub.title);
  const publishDate = pub.date || new Date().toISOString().split('T')[0];
  
  // Clean up the excerpt for description
  const description = pub.excerpt || `Comprehensive analysis exploring ${pub.title.toLowerCase()} and its impact in the AI landscape.`;
  
  return `---
title: "${pub.title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
url: "${pub.url}"
publication: "Learn Prompting"
category: "${pub.type}"
publishedAt: "${publishDate}"
featured: ${featured}
readTime: "${readTime} min read"
---

${description}`;
}

// Main execution
function main() {
  // Get CSV file path from command line argument
  const csvFilePath = process.argv[2];
  
  if (!csvFilePath) {
    console.error('❌ Please provide a CSV file path as an argument');
    console.log('Usage: node generate-learnprompting-publications.js <path-to-csv>');
    process.exit(1);
  }
  
  console.log(`📖 Reading publications from: ${csvFilePath}`);
  
  // Read publications from CSV
  const publications = readPublicationsFromCSV(csvFilePath);
  
  console.log(`📊 Found ${publications.length} publications to process\n`);
  
  // Create publications directory if it doesn't exist
  const publicationsDir = './content/publications';
  if (!fs.existsSync(publicationsDir)) {
    fs.mkdirSync(publicationsDir, { recursive: true });
  }

  // Generate files
  let created = 0;
  let skipped = 0;
  
  publications.forEach((pub, index) => {
    // Validate required fields
    if (!pub.title) {
      console.error(`❌ Row ${index + 1}: Missing 'title' field. Skipping.`);
      skipped++;
      return;
    }
    
    if (!pub.url) {
      console.error(`❌ Row ${index + 1}: Missing 'url' field. Skipping.`);
      skipped++;
      return;
    }
    
    const filename = createFilename(pub.title);
    const filepath = path.join(publicationsDir, filename);
    const content = generateMarkdown(pub);
    
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`⚠️  File already exists: ${filename} - skipping`);
      skipped++;
      return;
    }
    
    // Write the file
    fs.writeFileSync(filepath, content);
    console.log(`✅ Created: ${filename}`);
    created++;
  });

  console.log(`\n🎉 Publication files generation complete!`);
  console.log(`📝 Created: ${created} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
}

// Run the script
main();
