import { Tool } from './types';

export const TOOLS: Tool[] = [
  // AI Tools
  {
    id: 'gemini-copywriter',
    name: 'Gemini Smart Copywriter',
    description: 'Generate high-converting copy for social media, ads, and landing pages using Gemini AI models.',
    iconName: 'Sparkles',
    category: 'AI Tools',
    isPopular: true,
    isNew: false,
    slug: 'gemini-copywriter',
    usageCount: 1420
  },
  {
    id: 'ai-image-generator',
    name: 'AI Image Studio',
    description: 'Create premium marketing visual concepts, illustrations, and assets directly from text descriptions.',
    iconName: 'Image',
    category: 'AI Tools',
    isPopular: true,
    isNew: true,
    slug: 'ai-image-generator',
    usageCount: 890
  },
  {
    id: 'code-refactor',
    name: 'AI Code Refactorer',
    description: 'Paste your code and let Gemini optimize for performance, readability, and secure best practices.',
    iconName: 'Code2',
    category: 'AI Tools',
    isPopular: false,
    isNew: true,
    slug: 'code-refactor',
    usageCount: 520
  },

  // PDF Tools
  {
    id: 'pdf-compress',
    name: 'Ultra PDF Compressor',
    description: 'Compress PDF files without losing text or image quality. Perfect for email attachments.',
    iconName: 'FileArchive',
    category: 'PDF Tools',
    isPopular: true,
    isNew: false,
    slug: 'pdf-compress',
    usageCount: 2310
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Converter',
    description: 'Extract text, layouts, and tables from any PDF into editable Microsoft Word documents.',
    iconName: 'FileEdit',
    category: 'PDF Tools',
    isPopular: false,
    isNew: false,
    slug: 'pdf-to-word',
    usageCount: 1100
  },
  {
    id: 'pdf-signer',
    name: 'Secure PDF Signer',
    description: 'Add legal, beautiful, hand-drawn or typed electronic signatures to your contracts.',
    iconName: 'PenTool',
    category: 'PDF Tools',
    isPopular: true,
    isNew: true,
    slug: 'pdf-signer',
    usageCount: 740
  },

  // Image Tools
  {
    id: 'webp-converter',
    name: 'WebP Converter',
    description: 'Convert PNG, JPG, and GIF images to highly optimized modern WebP formats in bulk.',
    iconName: 'Cpu',
    category: 'Image Tools',
    isPopular: true,
    isNew: false,
    slug: 'webp-converter',
    usageCount: 3120
  },
  {
    id: 'bg-remover',
    name: 'AI Background Remover',
    description: 'Remove backgrounds from portrait, product, or animal shots in one click with transparent output.',
    iconName: 'Scissors',
    category: 'Image Tools',
    isPopular: true,
    isNew: false,
    slug: 'bg-remover',
    usageCount: 1890
  },
  {
    id: 'image-resizer',
    name: 'Bulk Image Resizer',
    description: 'Resize images in batches for social media, web displays, and custom pixel constraints.',
    iconName: 'Maximize2',
    category: 'Image Tools',
    isPopular: false,
    isNew: false,
    slug: 'image-resizer',
    usageCount: 940
  },

  // Business Tools
  {
    id: 'invoice-gen',
    name: 'Instant Invoice Generator',
    description: 'Generate, style, and download professional PDF invoices for clients and freelance contracts.',
    iconName: 'Receipt',
    category: 'Business Tools',
    isPopular: true,
    isNew: false,
    slug: 'invoice-gen',
    usageCount: 2010
  },
  {
    id: 'qr-business',
    name: 'QR Business Card Creator',
    description: 'Generate beautiful dynamic QR codes linking to your vCard, socials, or company websites.',
    iconName: 'QrCode',
    category: 'Business Tools',
    isPopular: false,
    isNew: false,
    slug: 'qr-business',
    usageCount: 830
  },
  {
    id: 'roi-calc',
    name: 'Ad Spend ROI Calculator',
    description: 'Calculate ROAS, Customer Acquisition Cost (CAC), and overall profit margins for marketing.',
    iconName: 'Calculator',
    category: 'Business Tools',
    isPopular: false,
    isNew: true,
    slug: 'roi-calc',
    usageCount: 420
  },

  // Developer Tools
  {
    id: 'json-formatter',
    name: 'Modern JSON Formatter',
    description: 'Beautify, validate, minify, and convert JSON payloads with syntax highlighting and tree views.',
    iconName: 'Terminal',
    category: 'Developer Tools',
    isPopular: true,
    isNew: false,
    slug: 'json-formatter',
    usageCount: 2780
  },
  {
    id: 'jwt-decoder',
    name: 'Secure JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens (JWT) client-side to review claims, signatures, and payloads.',
    iconName: 'ShieldAlert',
    category: 'Developer Tools',
    isPopular: false,
    isNew: false,
    slug: 'jwt-decoder',
    usageCount: 1120
  },
  {
    id: 'crontab-generator',
    name: 'Crontab Expression Builder',
    description: 'Translate human language into standard cron expressions and preview run schedules.',
    iconName: 'Clock',
    category: 'Developer Tools',
    isPopular: false,
    isNew: true,
    slug: 'crontab-generator',
    usageCount: 610
  },

  // SEO Tools
  {
    id: 'meta-tags',
    name: 'Meta Tag Generator',
    description: 'Generate fully-compliant HTML search and social preview OpenGraph tags for search engines.',
    iconName: 'Search',
    category: 'SEO Tools',
    isPopular: true,
    isNew: false,
    slug: 'meta-tags',
    usageCount: 1450
  },
  {
    id: 'robots-generator',
    name: 'robots.txt Creator',
    description: 'Generate SEO-friendly robots.txt rules to control web crawler indexing behavior.',
    iconName: 'Bot',
    category: 'SEO Tools',
    isPopular: false,
    isNew: false,
    slug: 'robots-generator',
    usageCount: 820
  },
  {
    id: 'sitemap-validator',
    name: 'Sitemap XML Auditor',
    description: 'Validate, scan, and audit your sitemap XML endpoints for broken links and priority tags.',
    iconName: 'Network',
    category: 'SEO Tools',
    isPopular: false,
    isNew: true,
    slug: 'sitemap-validator',
    usageCount: 480
  },

  // Productivity
  {
    id: 'pomodoro-flow',
    name: 'Focus Flow Session',
    description: 'Customizable Pomodoro timer integrated with ambient lo-fi sound generators and break logs.',
    iconName: 'Timer',
    category: 'Productivity',
    isPopular: true,
    isNew: true,
    slug: 'pomodoro-flow',
    usageCount: 1250
  },
  {
    id: 'bullet-journal',
    name: 'Minimal Bullet Journal',
    description: 'Draft your ideas, track task logs, and organize your day in a beautiful visual scratchpad.',
    iconName: 'BookOpen',
    category: 'Productivity',
    isPopular: false,
    isNew: false,
    slug: 'bullet-journal',
    usageCount: 730
  },

  // Text Tools
  {
    id: 'word-counter',
    name: 'Smart Word Counter',
    description: 'Calculate words, characters, reading times, sentences, and density analysis for paragraphs.',
    iconName: 'AlignLeft',
    category: 'Text Tools',
    isPopular: false,
    isNew: false,
    slug: 'word-counter',
    usageCount: 1560
  },
  {
    id: 'diff-checker',
    name: 'Visual Diff Checker',
    description: 'Compare two text files or codeblocks to inspect inline deletions, additions, and edits.',
    iconName: 'GitCompare',
    category: 'Text Tools',
    isPopular: true,
    isNew: false,
    slug: 'diff-checker',
    usageCount: 1820
  }
];

export const BLOG_POSTS = [
  {
    id: 'seo-guide',
    title: 'How We Built an SEO Engine That Drives 1M+ Monthly Organic Visitors',
    slug: 'seo-guide',
    excerpt: 'Detailed, technical insights into schema markups, programmatic SEO, fast page loads, and meta tag optimization.',
    content: `Building an organic search engine requires a combination of modern metadata standards, speed optimization, and dynamic sitemaps. 

At ToolNest, we structured our catalog dynamically so search engines understand our tool indexes perfectly. Here's our exact framework:

### 1. Schema.org Integration
By including JSON-LD schema on every page, we tell crawlers exactly what the page is. For simple utilities, we use SoftwareApplication schema with parameters like:
- \`applicationCategory\`: "Productivity"
- \`operatingSystem\`: "All"
- \`offers\`: { "price": "0.00", "priceCurrency": "USD" }

### 2. Speed as a Feature (95+ Lighthouse)
Google correlates load speeds with search indexing rank. By stripping unnecessary client-side dependencies, compressing font faces, and pre-rendering layouts, we achieve instantaneous first-contentful paint.

### 3. Programmatic Metadata
Every tool has custom OpenGraph tags. When shared on platforms like Slack, Twitter, or Discord, dynamic preview cards auto-generate, driving a 4x increase in viral social clicks.`,
    category: 'SEO',
    date: 'July 18, 2026',
    readTime: '4 min read',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  },
  {
    id: 'ai-ux-future',
    title: 'The Invisible Interface: Why the Best AI Utilities Don’t Feel Like Chatbots',
    slug: 'ai-ux-future',
    excerpt: 'How to design AI utilities that prioritize immediate user outcomes over conversational noise.',
    content: `The conversational boom led to millions of chat inputs that look like empty command bars. But for 90% of user jobs, typing a 50-word prompt is tedious. 

We believe in **Single-Click AI Actions**. Here is how we designed ToolNest's AI features:

### 1. Context-Aware Presets
Instead of a blank prompt bar, provide high-converting default templates. If a user opens our *Gemini Smart Copywriter*, we provide categories like "Product Hunt Pitch" or "LinkedIn Tech Thread" to eliminate writer's block instantly.

### 2. Invisible Prompt Engineering
Behind every 1-click tool is a rigorous, server-side prompt structure. We handle formatting, tone, constraints, and JSON-LD output schemas in our secure Node.js backend. This keeps the browser lightweight and ensures the user receives professional responses every time.

### 3. Progressive Enhancement
Let users interact simply first, then enhance. A user can write a simple sentence, receive a generation, and *then* fine-tune using quick filters like "Make it punchier" or "Translate to Spanish" without rewriting.`,
    category: 'Product & Design',
    date: 'June 25, 2026',
    readTime: '6 min read',
    author: {
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  }
];
