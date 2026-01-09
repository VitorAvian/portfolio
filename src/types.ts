export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

// Replaced enum with const object + type for better build compatibility
export const SectionId = {
  HERO: 'hero',
  WORK: 'work',
  ABOUT: 'about',
  CONTACT: 'contact',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];