import { type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { blogReader } from "./blog-reader";

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
        id: "learn-prompting-content",
        title: "Learn Prompting Content Strategy",
        description: "Led content strategy for AI education platform with 3M+ users, achieving 98% organic growth.",
        content: "# Learn Prompting Content Strategy\n\nAs Head of Content at Learn Prompting, I owned the complete content ecosystem for a platform serving 3+ million users worldwide.\n\n## Key Achievements\n- **Growth**: 98% increase in organic users, 65% growth in sessions\n- **Engagement**: 25-45 percentage point improvement in average engagement\n- **Newsletter**: Launched weekly newsletter with 35-40% open rate and 4-6% CTR\n- **Social Media**: Grew Twitter +12% and LinkedIn +75%\n- **Traffic**: Achieved all-time-high traffic to /courses/ section\n\n## Content Strategy\n- Owned documentation (Prompt Engineering Guide)\n- Managed blog, newsletter, and social channels\n- Led team of 3-5 freelance writers\n- Created contributor and SEO handbooks\n- Launched hands-on guide series (GPT-4o, ElevenLabs, Perplexity, NotebookLM)\n\n## Impact\nReduced writer onboarding time through structured documentation and established Learn Prompting as a leading resource in the AI education space.",
        technologies: ["Content Strategy", "SEO", "Technical Writing", "Team Leadership"],
        githubUrl: null,
        liveUrl: "https://learnprompting.org",
        imageUrl: "/api/placeholder/600/400",
        category: "Content Strategy",
        featured: "true",
        createdAt: new Date("2024-08-01"),
      },
      {
        id: "turingpost-ai-content",
        title: "TuringPost AI/ML Technical Content",
        description: "Technical explainers and AI unicorn profiles that drove 30% of premium conversions.",
        content: "# TuringPost AI/ML Technical Content\n\nAs Contributing Editor at TuringPost, I specialized in creating technical content that bridged complex AI/ML concepts with practical understanding.\n\n## Content Portfolio\n- **Technical Explainers**: In-depth coverage of Transformers, RAG, LLMs, Mamba, MoE, and JEPA\n- **AI Unicorn Profiles**: Detailed analyses of Databricks, Scale AI, Zhipu AI, Moonshot AI, xAI\n- **Research Translation**: Converting cutting-edge research into accessible guides\n\n## Recognition\n- JEPA article received positive feedback from creator Yann LeCun\n- Content regularly shared by Stanford NLP, Amazon Research, and Hugging Face\n- Technical explainers drove 30% of premium conversions\n\n## Social Media Growth\n- **Twitter**: 46K to 60K followers (+30%)\n- **LinkedIn**: 2.6K to 4.6K followers (+76%)\n- Established social media as third-largest subscriber acquisition channel\n\n## Mentorship\n- Guided intern to full autonomy in 1 month\n- Led weekly social strategy reviews\n- Developed structured onboarding processes",
        technologies: ["Technical Writing", "AI/ML Research", "Social Media", "Content Strategy"],
        githubUrl: null,
        liveUrl: "https://turingpost.com",
        imageUrl: "/api/placeholder/600/400",
        category: "Technical Writing",
        featured: "true",
        createdAt: new Date("2023-02-01"),
      },
      {
        id: "thesequence-growth",
        title: "TheSequence Community Growth",
        description: "Grew ML community from 500 to 46K Twitter followers and built data-driven content strategy.",
        content: "# TheSequence Community Growth\n\nLed social media strategy for TheSequence, an ML community trusted by 150,000+ specialists from top AI labs and enterprises.\n\n## Explosive Growth\n- **Twitter**: 500 to 46,000 followers (92x growth)\n- **LinkedIn**: 0 to 2,600 followers from scratch\n- Built engaged community of ML practitioners and researchers\n\n## Strategy & Execution\n- Developed data-driven content strategy using weekly KPI analysis\n- Created and tested various content formats based on competitor research\n- Monitored industry trends for relevant, timely content\n- Established partnerships with AI/ML communities and companies\n\n## Content Innovation\n- Pioneered visual content formats for complex ML concepts\n- Created recurring series that became community favorites\n- Balanced technical depth with accessibility\n- Maintained consistent posting schedule across platforms\n\n## Community Building\n- Fostered engagement between researchers and practitioners\n- Facilitated knowledge sharing within the ML community\n- Supported networking and professional development\n\n## Impact\nTransformed TheSequence into a recognized voice in the ML community, attracting attention from leading AI labs and establishing it as a go-to resource for ML professionals.",
        technologies: ["Community Building", "Social Media Marketing", "Data Analysis", "Content Creation"],
        githubUrl: null,
        liveUrl: "https://thesequence.substack.com",
        imageUrl: "/api/placeholder/600/400",
        category: "Community Building",
        featured: "true",
        createdAt: new Date("2021-01-01"),
      }
    ];

    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "jepa-explained",
        title: "Understanding JEPA: Joint Embedding Predictive Architecture",
        slug: "jepa-explained",
        excerpt: "A deep dive into Yann LeCun's Joint Embedding Predictive Architecture and its implications for the future of AI learning...",
        content: "# Understanding JEPA: Joint Embedding Predictive Architecture\n\nJoint Embedding Predictive Architecture (JEPA) represents a fundamental shift in how AI systems learn about the world. Developed by Yann LeCun and his team, JEPA addresses key limitations in current self-supervised learning approaches.\n\n## The Problem with Current Approaches\n\nMost current self-supervised learning methods rely on reconstructive or contrastive learning:\n- **Reconstructive learning** requires the model to predict exact pixel values\n- **Contrastive learning** learns by comparing positive and negative examples\n\nBoth approaches have limitations in capturing abstract representations.\n\n## What is JEPA?\n\nJEPA learns by predicting representations in an abstract embedding space rather than predicting raw input details. This approach:\n- Focuses on semantic understanding rather than pixel-level reconstruction\n- Enables more robust and generalizable representations\n- Reduces computational requirements compared to generative models\n\n## Key Components\n\n### 1. Encoder Network\nTransforms raw input (images, text, etc.) into abstract representations\n\n### 2. Predictor Network\nPredicts future or masked representations in the embedding space\n\n### 3. Joint Embedding Space\nShared representation space where predictions and targets are compared\n\n## Advantages Over Traditional Methods\n\n- **Efficiency**: No need to generate high-dimensional outputs\n- **Abstraction**: Learns meaningful semantic representations\n- **Flexibility**: Can be applied to various modalities (vision, language, etc.)\n- **Robustness**: Less sensitive to irrelevant details\n\n## Real-World Applications\n\n- **Computer Vision**: Object recognition without pixel-level supervision\n- **Natural Language Processing**: Understanding context without next-token prediction\n- **Multimodal Learning**: Connecting different types of data in shared spaces\n\n## Implementation Considerations\n\nWhen implementing JEPA systems:\n1. Design appropriate masking strategies\n2. Choose optimal embedding dimensions\n3. Balance prediction difficulty and learnability\n4. Consider computational trade-offs\n\n## Future Implications\n\nJEPA represents a step toward more human-like learning:\n- Learning through observation and prediction\n- Focusing on relevant abstractions\n- Building world models without explicit supervision\n\n## Conclusion\n\nJEPA offers a promising direction for self-supervised learning that aligns more closely with how humans learn about the world. By predicting in abstract spaces rather than raw inputs, JEPA systems can develop more robust and generalizable AI capabilities.\n\n*This article received positive feedback from JEPA's creator, Yann LeCun, highlighting the importance of making cutting-edge research accessible to the broader AI community.*",
        tags: ["AI/ML", "JEPA", "Self-Supervised Learning"],
        readTime: "12 min read",
        published: "true",
        publishedAt: new Date("2024-11-15"),
        createdAt: new Date("2024-11-15"),
      },
      {
        id: "rag-implementation-guide",
        title: "Practical Guide to Retrieval-Augmented Generation (RAG)",
        slug: "rag-implementation-guide",
        excerpt: "Learn how to implement RAG systems that combine the power of large language models with external knowledge bases...",
        content: "# Practical Guide to Retrieval-Augmented Generation (RAG)\n\nRetrieval-Augmented Generation (RAG) has become essential for building AI applications that need access to current, domain-specific information. This guide covers practical implementation strategies.\n\n## What is RAG?\n\nRAG combines two key components:\n1. **Retrieval System**: Finds relevant information from external sources\n2. **Generation Model**: Uses retrieved information to generate responses\n\n## Core Architecture\n\n### 1. Document Processing\n- Chunk documents into manageable segments\n- Create embeddings for each chunk\n- Store in vector database\n\n### 2. Query Processing\n- Convert user query to embedding\n- Retrieve most relevant chunks\n- Rank and filter results\n\n### 3. Response Generation\n- Combine query with retrieved context\n- Generate response using language model\n- Post-process and validate output\n\n## Implementation Best Practices\n\n### Chunking Strategies\n- **Fixed-size chunking**: Simple but may break context\n- **Semantic chunking**: Maintains meaning but more complex\n- **Hierarchical chunking**: Balances context and granularity\n\n### Embedding Selection\n- Consider domain-specific models\n- Balance accuracy vs. computational cost\n- Evaluate on your specific use case\n\n### Retrieval Optimization\n- Implement hybrid search (dense + sparse)\n- Use query expansion techniques\n- Apply re-ranking algorithms\n\n## Common Challenges\n\n### 1. Context Window Limitations\n- Prioritize most relevant chunks\n- Implement smart truncation strategies\n- Consider summarization for long contexts\n\n### 2. Information Freshness\n- Implement regular index updates\n- Handle temporal queries appropriately\n- Version control for documents\n\n### 3. Hallucination Prevention\n- Use grounding techniques\n- Implement confidence scoring\n- Add citation mechanisms\n\n## Evaluation Metrics\n\n- **Retrieval Accuracy**: Are relevant documents found?\n- **Response Quality**: Is the generated answer helpful?\n- **Faithfulness**: Does response align with retrieved content?\n- **Latency**: How fast is the end-to-end pipeline?\n\n## Tools and Frameworks\n\n### Vector Databases\n- Pinecone, Weaviate, Chroma\n- Consider scalability and query performance\n\n### Embedding Models\n- OpenAI embeddings, Sentence-BERT, E5\n- Domain-specific vs. general-purpose models\n\n### Integration Frameworks\n- LangChain, LlamaIndex, Haystack\n- Choose based on complexity and customization needs\n\n## Production Considerations\n\n1. **Monitoring**: Track retrieval quality and response accuracy\n2. **Scaling**: Plan for growing document collections\n3. **Security**: Implement proper access controls\n4. **Cost Management**: Optimize embedding and generation costs\n\n## Conclusion\n\nRAG systems enable AI applications to access vast amounts of external knowledge while maintaining the fluency of large language models. Success requires careful attention to document processing, retrieval optimization, and continuous evaluation.\n\nThe key is starting simple and iteratively improving based on real-world usage patterns and user feedback.",
        tags: ["AI/ML", "RAG", "LLMs", "Tutorial"],
        readTime: "15 min read",
        published: "true",
        publishedAt: new Date("2024-10-22"),
        createdAt: new Date("2024-10-22"),
      },
      {
        id: "ai-content-strategy",
        title: "Building Content Strategy for AI/ML Communities",
        slug: "ai-content-strategy",
        excerpt: "Lessons learned from growing AI/ML content platforms to millions of users and building engaged technical communities...",
        content: "# Building Content Strategy for AI/ML Communities\n\nAfter four years of growing AI/ML content platforms from hundreds to millions of users, I've learned that successful technical content strategy requires balancing depth with accessibility.\n\n## Understanding Your Audience\n\n### The AI/ML Community Spectrum\n- **Researchers**: Need cutting-edge insights and detailed methodologies\n- **Practitioners**: Want practical implementation guides and use cases\n- **Business Leaders**: Require strategic implications and ROI analysis\n- **Students**: Seek foundational knowledge and learning paths\n\n### Content-Audience Fit\nDifferent content types serve different segments:\n- Technical deep-dives for researchers\n- Tutorial content for practitioners\n- Trend analysis for business leaders\n- Beginner guides for students\n\n## Content Strategy Framework\n\n### 1. Research-First Approach\n- Monitor arXiv, conference proceedings, and research labs\n- Track GitHub trending and open-source developments\n- Follow key researchers and industry leaders\n- Identify emerging trends before they mainstream\n\n### 2. Translation Methodology\nMaking complex research accessible:\n- Start with the core insight or breakthrough\n- Explain the problem being solved\n- Break down technical concepts into digestible parts\n- Provide practical implications and applications\n\n### 3. Community Engagement\n- Encourage discussion and questions\n- Share content across multiple platforms\n- Engage with comments and feedback\n- Build relationships with key community members\n\n## Platform-Specific Strategies\n\n### Twitter/X\n- Thread format for complex topics\n- Visual diagrams and infographics\n- Quick insights and commentary\n- Real-time conference coverage\n\n### LinkedIn\n- Professional insights and career advice\n- Industry trend analysis\n- Long-form thought leadership\n- Company and product spotlights\n\n### Newsletters\n- Curated weekly/monthly updates\n- Deep-dive analyses\n- Exclusive insights and interviews\n- Community announcements\n\n### Blogs\n- Comprehensive tutorials\n- Technical explanations\n- Case studies and examples\n- SEO-optimized evergreen content\n\n## Metrics That Matter\n\n### Engagement Quality\n- Comments and discussions generated\n- Shares by industry experts\n- Mentions by research institutions\n- Community feedback and testimonials\n\n### Growth Indicators\n- Organic reach and impressions\n- Follower quality over quantity\n- Email subscription rates\n- Time spent on content\n\n### Business Impact\n- Lead generation and conversions\n- Brand recognition in the field\n- Speaking opportunities and partnerships\n- Talent attraction and retention\n\n## Common Mistakes to Avoid\n\n1. **Over-simplification**: Losing technical accuracy for accessibility\n2. **Under-explanation**: Assuming too much background knowledge\n3. **Trend-chasing**: Following hype without substance\n4. **Inconsistent voice**: Mixing technical and marketing tones\n5. **Ignoring feedback**: Not adapting based on community response\n\n## Building Authority\n\n### Consistency is Key\n- Regular publishing schedule\n- Consistent quality standards\n- Reliable information sourcing\n- Professional presentation\n\n### Expert Validation\n- Fact-checking with domain experts\n- Citing authoritative sources\n- Acknowledging limitations and uncertainties\n- Correcting errors transparently\n\n### Community Recognition\n- Shares from respected researchers\n- Mentions in academic work\n- Invitations to speak or contribute\n- Positive feedback from practitioners\n\n## Future-Proofing Your Strategy\n\n### Staying Ahead\n- Invest in understanding foundational concepts\n- Build relationships with cutting-edge researchers\n- Develop expertise in emerging areas\n- Maintain technical skills and hands-on experience\n\n### Adapting to Change\n- Monitor platform algorithm changes\n- Experiment with new content formats\n- Track evolving audience preferences\n- Pivot strategies based on data\n\n## Conclusion\n\nSuccessful AI/ML content strategy requires deep technical understanding combined with excellent communication skills. The goal is building bridges between complex research and practical understanding.\n\nThe AI field moves quickly, but fundamental principles of clear communication, audience understanding, and community building remain constant. Focus on providing genuine value, and the growth will follow.\n\n*Based on experience growing platforms like Learn Prompting (3M+ users), TuringPost, and TheSequence (150K+ community members).*",
        tags: ["Content Strategy", "AI/ML", "Community Building"],
        readTime: "18 min read",
        published: "true",
        publishedAt: new Date("2024-09-10"),
        createdAt: new Date("2024-09-10"),
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
      createdAt: new Date(),
      featured: insertProject.featured || "false"
    };
    this.projects.set(id, project);
    return project;
  }

  // Blog Posts - Now reading from markdown files
  async getBlogPosts(): Promise<BlogPost[]> {
    return blogReader.getAllBlogPosts();
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return blogReader.getBlogPost(id) || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return blogReader.getBlogPostBySlug(slug) || undefined;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return blogReader.getPublishedBlogPosts();
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      createdAt: new Date(),
      publishedAt: new Date(),
      published: insertPost.published || "true"
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    return blogReader.searchBlogPosts(query);
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
