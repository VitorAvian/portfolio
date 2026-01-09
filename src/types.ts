export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact',
}
  