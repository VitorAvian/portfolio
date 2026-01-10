import { ElementType } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  imageUrl: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GlitchTextProps {
  text: string;
  className?: string;
  as?: ElementType;
}