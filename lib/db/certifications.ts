// lib/db/certifications.ts
import { getDbConnection } from './index';

export interface DatabaseCertification {
  id: string;
  title: string;
  provider: string;
  issue_date: string;
  credential_url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Get all certifications
export async function getAllCertifications(): Promise<DatabaseCertification[]> {
  const sql = await getDbConnection();
  const certifications = await sql`
    SELECT * FROM certifications
    ORDER BY issue_date DESC
  `;
  return certifications as DatabaseCertification[];
}

// Get most recent certifications (limit by count)
export async function getRecentCertifications(count: number = 3): Promise<DatabaseCertification[]> {
  const sql = await getDbConnection();
  const certifications = await sql`
    SELECT * FROM certifications
    ORDER BY issue_date DESC
    LIMIT ${count}
  `;
  return certifications as DatabaseCertification[];
}

// Get a certification by id
export async function getCertificationById(id: string): Promise<DatabaseCertification | null> {
  const sql = await getDbConnection();
  const certifications = await sql`
    SELECT * FROM certifications
    WHERE id = ${id}
  `;
  
  return certifications.length > 0 ? certifications[0] as DatabaseCertification : null;
}