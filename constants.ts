import { Project, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'O Grimório', href: '#projects' },
  { label: 'A Entidade', href: '#about' },
  { label: 'Ritual', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'VALHALLA PROTOCOL',
    description: 'Sistema de identidade visual para um festival de música underground em Oslo. Fusão de tipografia rúnica com glitch art.',
    year: '2023',
    role: 'Direção de Arte / UI',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Brutalism', 'Typography', 'Event'],
  },
  {
    id: '02',
    title: 'NEON SERPENT',
    description: 'Rebranding para uma marca de moda Cyber-Goth. Focada em tecidos reflexivos e estética noturna.',
    year: '2024',
    role: 'Lead Design',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    tags: ['Fashion', 'Identity', 'WebGL'],
  },
  {
    id: '03',
    title: 'VOID TERMINAL',
    description: 'Interface de usuário diegética para um jogo de horror cósmico. Elementos analógicos misturados com hud futurista.',
    year: '2022',
    role: 'UI/UX',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    tags: ['Game UI', 'Concept', 'Dark'],
  },
  {
    id: '04',
    title: 'RUNE.OS',
    description: 'Conceito de sistema operacional baseado em mitologia nórdica e arquitetura brutalista.',
    year: '2024',
    role: 'Creative Tech',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    tags: ['OS Design', 'Experimental'],
  },
];
