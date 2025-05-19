// lib/adapters/project-adapter.ts
import { DatabaseProject } from '@/lib/db/projects';

// This is the format expected by your ProjectCard component
export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string | null;
  repo: string | null;
  featured: boolean;
  techs: {
    name: string;
    color: string;
  }[];
}

// Color map for common technologies
const TECH_COLORS: Record<string, string> = {
  // Frontend
  'react': 'bg-blue-500',
  'next.js': 'bg-black',
  'vue': 'bg-green-500',
  'angular': 'bg-red-600',
  'svelte': 'bg-orange-600',
  'javascript': 'bg-yellow-500',
  'typescript': 'bg-blue-600',
  'html': 'bg-orange-500',
  'css': 'bg-blue-400',
  
  // CSS Frameworks
  'tailwind': 'bg-cyan-500',
  'bootstrap': 'bg-purple-600',
  'material-ui': 'bg-blue-700',
  'chakra-ui': 'bg-teal-500',
  
  // Backend
  'node.js': 'bg-green-600',
  'express': 'bg-gray-600',
  'django': 'bg-green-800',
  'flask': 'bg-gray-700',
  'php': 'bg-purple-500',
  'laravel': 'bg-red-500',
  
  // Databases
  'mongodb': 'bg-green-500',
  'postgresql': 'bg-blue-600',
  'mysql': 'bg-blue-500',
  'firebase': 'bg-yellow-600',
  'supabase': 'bg-green-500',
  
  // CMS
  'wordpress': 'bg-blue-500',
  'shopify': 'bg-green-600',
  'strapi': 'bg-purple-500',
  
  // Default
  'default': 'bg-gray-500'
};

// Get color for a technology tag
function getTechColor(techName: string): string {
  const normalizedTech = techName.toLowerCase();
  
  // Check for partial matches
  for (const [tech, color] of Object.entries(TECH_COLORS)) {
    if (normalizedTech.includes(tech.toLowerCase())) {
      return color;
    }
  }
  
  return TECH_COLORS.default;
}

// Convert database project to component format
export function adaptDatabaseProject(dbProject: DatabaseProject): ProjectCardData {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    image: dbProject.images[0] || '', // Use first image as main image
    url: dbProject.live_url,
    repo: dbProject.github_url,
    featured: dbProject.featured,
    techs: dbProject.tags.map(tag => ({
      name: tag,
      color: getTechColor(tag)
    }))
  };
}

// Convert multiple database projects to component format
export function adaptDatabaseProjects(dbProjects: DatabaseProject[]): ProjectCardData[] {
  return dbProjects.map(adaptDatabaseProject);
}