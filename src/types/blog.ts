export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  content: BlogContent;
}

export interface BlogContent {
  problemOverview: string;
  commonAttempts: string;
  technicalReality: string;
  safeResolution: string;
  technicianAdvice: string;
  verdict: string;
}

export type BlogCategory = 
  | 'Windows'
  | 'Intune & MDM'
  | 'BIOS & Firmware'
  | 'Hardware Diagnostics'
  | 'Myth Busting'
  | 'Technician Tips';

export interface BlogFilter {
  category?: BlogCategory;
  tag?: string;
  search?: string;
}

export const categoryColors: Record<BlogCategory, string> = {
  'Windows': 'text-blue-500 bg-blue-500/10',
  'Intune & MDM': 'text-purple-500 bg-purple-500/10',
  'BIOS & Firmware': 'text-orange-500 bg-orange-500/10',
  'Hardware Diagnostics': 'text-green-500 bg-green-500/10',
  'Myth Busting': 'text-red-500 bg-red-500/10',
  'Technician Tips': 'text-cyan-500 bg-cyan-500/10',
};
