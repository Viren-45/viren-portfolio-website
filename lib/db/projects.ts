// lib/db/projects.ts
import { getDbConnection } from './index';

export interface DatabaseProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  images: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Get all projects
export async function getAllProjects(): Promise<DatabaseProject[]> {
  const sql = await getDbConnection();
  const projects = await sql`
    SELECT * FROM projects
    ORDER BY featured DESC, created_at DESC
  `;
  return projects as DatabaseProject[];
}

// Get featured projects only
export async function getFeaturedProjects(): Promise<DatabaseProject[]> {
  const sql = await getDbConnection();
  const projects = await sql`
    SELECT * FROM projects
    WHERE featured = true
    ORDER BY created_at DESC
  `;
  return projects as DatabaseProject[];
}

// Get a project by slug
export async function getProjectBySlug(slug: string): Promise<DatabaseProject | null> {
  const sql = await getDbConnection();
  const projects = await sql`
    SELECT * FROM projects
    WHERE slug = ${slug}
  `;
  
  return projects.length > 0 ? projects[0] as DatabaseProject : null;
}