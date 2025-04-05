export interface Skill {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  providerId: string;
  providerName: string;
  rate: number;
  rateUnit: 'hour' | 'session';
  availability: string[];
  rating: number;
  totalReviews: number;
  tags: string[];
  imageUrl?: string;
}

export type SkillCategory =
  | 'Academic'
  | 'Technology'
  | 'Arts'
  | 'Music'
  | 'Language'
  | 'Sports'
  | 'Professional'
  | 'Other';

export interface SkillFilter {
  search: string;
  category?: SkillCategory;
  minRate?: number;
  maxRate?: number;
  rating?: number;
}
