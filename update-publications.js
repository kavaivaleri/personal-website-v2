#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Enhanced descriptions and metadata for publications
const publicationUpdates = {
  // Company Profiles
  'cerebras.md': {
    description: "Co-authored comprehensive profile of Cerebras, the AI chip company revolutionizing large-scale AI training with their wafer-scale engines and innovative hardware architecture.",
    readTime: "12 min read",
    category: "Company Profile"
  },
  'moonshot-ai-the-chinese-unicorn-revolutionizing-long-context-ai.md': {
    description: "Co-authored deep dive into Moonshot AI, the Chinese unicorn pioneering breakthrough long-context AI technology with their Kimi chatbot and 200K+ token context windows.",
    readTime: "8 min read",
    category: "Company Profile"
  },
  'zhipy-ai.md': {
    description: "Co-authored profile of Zhipu AI, one of China's leading AI companies behind the ChatGLM series and innovative multimodal AI solutions.",
    readTime: "7 min read",
    category: "Company Profile"
  },
  'snowflake.md': {
    description: "Co-authored analysis of Snowflake's evolution from cloud data warehouse to AI platform, exploring their machine learning capabilities and data cloud ecosystem.",
    readTime: "6 min read",
    category: "Company Profile"
  },
  'coreweave.md': {
    description: "Co-authored profile of CoreWeave, the GPU cloud infrastructure company powering AI workloads with specialized hardware for machine learning and rendering.",
    readTime: "10 min read",
    category: "Company Profile"
  },
  'scale-ai.md': {
    description: "Authored comprehensive profile of Scale AI, the $7.3B data infrastructure company powering AI training for autonomous vehicles, defense, and enterprise applications.",
    readTime: "12 min read",
    category: "Company Profile"
  },
  'databricks.md': {
    description: "Co-authored profile of Databricks, exploring their lakehouse architecture, unified analytics platform, and leadership in enterprise AI and machine learning workflows.",
    readTime: "8 min read",
    category: "Company Profile"
  },
  'ai21-labs.md': {
    description: "Co-authored profile of AI21 Labs, the Israeli startup behind Jurassic LLMs and innovative AI writing tools, exploring their unique approach to language models.",
    readTime: "10 min read",
    category: "Company Profile"
  },
  'lightricks.md': {
    description: "Co-authored profile of Lightricks, the creative technology company behind popular apps like Facetune, exploring their AI-powered photo and video editing innovations.",
    readTime: "8 min read",
    category: "Company Profile"
  },
  'cohere-ai.md': {
    description: "Co-authored analysis of Cohere, the enterprise-focused AI company providing language models and NLP solutions for business applications and retrieval systems.",
    readTime: "9 min read",
    category: "Company Profile"
  },
  
  // Technical Deep Dives  
  'what-is-jepa.md': {
    description: "Authored technical deep dive into JEPA (Joint-Embedding Predictive Architecture), Yann LeCun's proposed framework for self-supervised learning and world models.",
    readTime: "12 min read",
    category: "Technical Deep Dive"
  },
  'graphrag.md': {
    description: "Authored comprehensive guide to GraphRAG, Microsoft's graph-enhanced retrieval system that improves knowledge extraction from complex documents.",
    readTime: "15 min read",
    category: "Technical Deep Dive"
  },
  'what-is-mamba.md': {
    description: "Authored technical guide to Mamba, the state-space model architecture that challenges Transformer dominance with linear scaling.",
    readTime: "12 min read",
    category: "Technical Deep Dive"
  },
  'a-deep-dive-into-llama.md': {
    description: "Authored comprehensive analysis of Meta's LLaMA models, exploring architecture innovations and impact on open-source AI.",
    readTime: "15 min read",
    category: "Model Spotlight"
  },
  
  // Additional Technical Content
  'what-is-longrag-framework.md': {
    description: "Authored technical exploration of LongRAG framework, addressing challenges in retrieval-augmented generation for long-form content.",
    readTime: "10 min read",
    category: "Technical Deep Dive"
  },
  'topic-1-what-is-mixture-of-experts-moe.md': {
    description: "Authored comprehensive explanation of Mixture of Experts (MoE) architecture and scaling strategies in modern language models.",
    readTime: "14 min read",
    category: "Technical Deep Dive"
  },
  'understanding-multimodal-models.md': {
    description: "Authored guide to multimodal AI models, exploring how systems integrate text, vision, and audio for comprehensive understanding.",
    readTime: "11 min read",
    category: "Technical Deep Dive"
  },
  'what-is-retrieval-augmented-generation-rag.md': {
    description: "Authored foundational guide to Retrieval-Augmented Generation (RAG), explaining how external knowledge enhances language models.",
    readTime: "13 min read",
    category: "Technical Deep Dive"
  },
  'what-is-low-rank-adaptation-lora.md': {
    description: "Authored technical explanation of Low-Rank Adaptation (LoRA), the parameter-efficient fine-tuning method revolutionizing model customization.",
    readTime: "9 min read",
    category: "Technical Deep Dive"
  },
  
  // Educational Resources
  '8-free-courses-to-master-large-language-models.md': {
    description: "Authored curated list of the best free courses for learning large language models, from fundamentals to advanced applications.",
    readTime: "6 min read",
    category: "Educational Resource"
  },
  'the-mysterious-ai-reading-list-ilya-sutskevers-recommendations.md': {
    description: "Authored analysis of Ilya Sutskever's influential AI reading list, exploring key papers and their impact on modern AI research.",
    readTime: "9 min read",
    category: "Educational Resource"
  }
};

function updatePublicationFile(filePath, updates) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const frontmatterStart = lines.findIndex(line => line.trim() === '---');
  const frontmatterEnd = lines.findIndex((line, index) => index > frontmatterStart && line.trim() === '---');
  
  if (frontmatterStart === -1 || frontmatterEnd === -1) {
    console.log(`⚠️  Invalid frontmatter in: ${filePath}`);
    return false;
  }

  const frontmatterLines = lines.slice(frontmatterStart + 1, frontmatterEnd);
  const updatedFrontmatter = frontmatterLines.map(line => {
    if (line.startsWith('description:') && updates.description) {
      return `description: "${updates.description}"`;
    } else if (line.startsWith('readTime:') && updates.readTime) {
      return `readTime: "${updates.readTime}"`;
    } else if (line.startsWith('category:') && updates.category) {
      return `category: "${updates.category}"`;
    }
    return line;
  });

  const newContent = [
    '---',
    ...updatedFrontmatter,
    '---',
    ...lines.slice(frontmatterEnd + 1)
  ].join('\n');

  fs.writeFileSync(filePath, newContent);
  return true;
}

function main() {
  const publicationsDir = './content/publications';
  let updated = 0;
  let skipped = 0;

  console.log('🔄 Updating publication files with enhanced descriptions...\n');

  Object.entries(publicationUpdates).forEach(([filename, updates]) => {
    const filePath = path.join(publicationsDir, filename);
    
    if (updatePublicationFile(filePath, updates)) {
      console.log(`✅ Updated: ${filename}`);
      updated++;
    } else {
      console.log(`❌ Failed: ${filename}`);
      skipped++;
    }
  });

  console.log(`\n🎉 Publication updates complete!`);
  console.log(`✅ Updated: ${updated} files`);
  console.log(`❌ Failed: ${skipped} files`);
}

main();