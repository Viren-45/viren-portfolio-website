
// app/sections/featured-projects-section.tsx
import { getAllProjects } from '@/lib/db/projects';
import { adaptDatabaseProjects } from '@/lib/adapters/project-adapter';
import ProjectsSection from '@/components/sections/project-section';

export default async function FeaturedProjectsSection() {
  // Fetch projects from the database
  const dbProjects = await getAllProjects();
  
  // Adapt the database projects to the format expected by the ProjectsSection component
  const adaptedProjects = adaptDatabaseProjects(dbProjects);
  
  // Render the ProjectsSection with the adapted projects
  return <ProjectsSection initialProjects={adaptedProjects} />;
}