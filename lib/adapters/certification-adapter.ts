// lib/adapters/certification-adapter.ts
import { DatabaseCertification } from '../db/certifications';

// Interface for the certification card component
export interface CertificationCardData {
  id: string;
  title: string;
  provider: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  badgeColor: string;
}

// Color map for common certification providers
const PROVIDER_COLORS: Record<string, string> = {
  'AWS': '#FF9900',
  'Amazon': '#FF9900',
  'Google': '#4285F4',
  'Microsoft': '#00A4EF',
  'Azure': '#0078D4',
  'MongoDB': '#13AA52',
  'FreeCodeCamp': '#0A0A23',
  'Coursera': '#2A73CC',
  'Udemy': '#A435F0',
  'edX': '#02262B',
  'LinkedIn Learning': '#0077B5',
  'HubSpot': '#FF7A59',
  'Salesforce': '#00A1E0',
  'Oracle': '#C74634',
  'Cisco': '#1BA0D7',
  'CompTIA': '#C8202C',
  'IBM': '#0530AD',
  'Meta': '#0668E1',
  'Pluralsight': '#F15B2A',
  'DataCamp': '#03EF62',
  'Udacity': '#01B3E3',
  // Default color
  'default': '#6366F1'
};

// Function to determine badge color based on provider
function getBadgeColor(provider: string): string {
  const normalizedProvider = provider.toLowerCase();
  
  // Check for partial matches
  for (const [knownProvider, color] of Object.entries(PROVIDER_COLORS)) {
    if (normalizedProvider.includes(knownProvider.toLowerCase())) {
      return color;
    }
  }
  
  return PROVIDER_COLORS.default;
}

// Convert database certification to component format
export function adaptDatabaseCertification(dbCertification: DatabaseCertification): CertificationCardData {
  return {
    id: dbCertification.id,
    title: dbCertification.title,
    provider: dbCertification.provider,
    issueDate: dbCertification.issue_date,
    credentialUrl: dbCertification.credential_url,
    imageUrl: dbCertification.image_url,
    badgeColor: getBadgeColor(dbCertification.provider)
  };
}

// Convert multiple database certifications to component format
export function adaptDatabaseCertifications(dbCertifications: DatabaseCertification[]): CertificationCardData[] {
  return dbCertifications.map(adaptDatabaseCertification);
}