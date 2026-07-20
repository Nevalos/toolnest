export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro';
  joinedAt: string;
  favorites: string[]; // Tool IDs
  history: { toolId: string; timestamp: string }[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon name string
  category: ToolCategory;
  isPopular: boolean;
  isNew: boolean;
  slug: string;
  usageCount: number;
}

export type ToolCategory =
  | 'AI Tools'
  | 'PDF Tools'
  | 'Image Tools'
  | 'Business Tools'
  | 'Developer Tools'
  | 'SEO Tools'
  | 'Productivity'
  | 'Text Tools';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface UsageMetric {
  date: string;
  queries: number;
  latency: number; // in ms
}
