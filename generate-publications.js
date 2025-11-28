#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Function to parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  
  // Try to detect separator (comma vs tab)
  const firstLine = lines[0];
  const separator = firstLine.includes('\t') ? '\t' : ',';
  
  const headers = firstLine.split(separator);
  
  console.log(`🔍 Detected separator: ${separator === '\t' ? 'TAB' : 'COMMA'}`);
  console.log(`📋 Headers found: ${headers.join(' | ')}`);
  
  return lines.slice(1).map((line, index) => {
    if (!line.trim()) return null; // Skip empty lines
    
    const values = line.split(separator);
    const obj = {};
    
    headers.forEach((header, headerIndex) => {
      const key = header.trim().toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[()]/g, '')
        .replace('date_yyyy-mm-dd', 'date')
        .replace('type_of_content', 'type');
      obj[key] = values[headerIndex] ? values[headerIndex].trim() : '';
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
    console.log('Please create a CSV file with the following columns:');
    console.log('Name\tType of content\tDate (YYYY-MM-DD)\tRole\tUpgrades\tLink');
    process.exit(1);
  }
  
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  return parseCSV(csvContent);
}

// Function to create a filename from the name
function createFilename(name) {
  if (!name || typeof name !== 'string') {
    console.error('❌ Invalid name for filename creation:', name);
    return 'unknown.md';
  }
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    + '.md';
}

// Function to generate markdown content
function generateMarkdown(pub) {
  const readTime = `${pub.upgrades} min read`;
  const featured = parseInt(pub.upgrades) >= 5 ? 'true' : 'false';
  
  return `---
title: "${pub.name}"
description: "${pub.role === 'Author' ? 'Authored' : 'Co-authored'} ${pub.type.toLowerCase()} exploring ${pub.name} and their impact in the AI landscape."
url: "${pub.link}"
publication: "Turing Post"
category: "${pub.type}"
publishedAt: "${pub.date}"
featured: ${featured}
readTime: "${readTime}"
---

Comprehensive analysis of ${pub.name} and their role in shaping the AI industry landscape.`;
}

// Main execution
function main() {
  // Get CSV file path from command line argument or use default
  const csvFilePath = process.argv[2] || '/Users/valeria/Downloads/Untitled spreadsheet - Sheet1.csv';
  
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
    if (!pub.name) {
      console.error(`❌ Row ${index + 1}: Missing 'name' field. Skipping.`);
      skipped++;
      return;
    }
    
    const filename = createFilename(pub.name);
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
