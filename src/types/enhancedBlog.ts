export interface EnhancedBlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  affectedDevices: string[];
  os: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  content: EnhancedBlogContent;
}

export interface EnhancedBlogContent {
  problemTitle: string;
  symptomsObserved: string;
  affectedDevices: string[];
  affectedOS: string[];
  rootCauseAnalysis: string;
  stepByStepDiagnosis: {
    powershell?: string[];
    cmd?: string[];
    bios?: string[];
    linux?: string[];
  };
  commandsToolsUsed: string[];
  finalResolution: string;
  preventionBestPractices: string[];
}

export type BlogCategory = 
  | 'Windows'
  | 'Intune & MDM'
  | 'BIOS & Firmware'
  | 'Hardware Diagnostics'
  | 'Myth Busting'
  | 'Technician Tips'
  | 'Boot & Recovery'
  | 'SSD & Storage'
  | 'RAM & Memory'
  | 'Network & Connectivity'
  | 'Display & Graphics'
  | 'Security & Malware';

export const categoryColors: Record<BlogCategory, string> = {
  'Windows': 'text-blue-500 bg-blue-500/10',
  'Intune & MDM': 'text-purple-500 bg-purple-500/10',
  'BIOS & Firmware': 'text-orange-500 bg-orange-500/10',
  'Hardware Diagnostics': 'text-green-500 bg-green-500/10',
  'Myth Busting': 'text-red-500 bg-red-500/10',
  'Technician Tips': 'text-cyan-500 bg-cyan-500/10',
  'Boot & Recovery': 'text-yellow-500 bg-yellow-500/10',
  'SSD & Storage': 'text-indigo-500 bg-indigo-500/10',
  'RAM & Memory': 'text-pink-500 bg-pink-500/10',
  'Network & Connectivity': 'text-teal-500 bg-teal-500/10',
  'Display & Graphics': 'text-rose-500 bg-rose-500/10',
  'Security & Malware': 'text-red-600 bg-red-600/10',
};

export const difficultyColors: Record<EnhancedBlogPost['difficulty'], string> = {
  'Beginner': 'text-green-500 bg-green-500/10',
  'Intermediate': 'text-yellow-500 bg-yellow-500/10',
  'Advanced': 'text-red-500 bg-red-500/10',
};
