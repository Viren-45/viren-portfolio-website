// app/sections/certification-section-server.tsx
import { getAllCertifications } from '@/lib/db/certifications';
import { adaptDatabaseCertifications } from '@/lib/adapters/certification-adapter';
import CertificationSection from '@/components/sections/certification-section';

export default async function CertificationSectionServer() {
  // Fetch all certifications from the database
  const dbCertifications = await getAllCertifications();
  
  // Adapt the data to the format expected by the CertificationSection component
  const adaptedCertifications = adaptDatabaseCertifications(dbCertifications);
  
  // Render the CertificationSection with the adapted data
  return <CertificationSection certifications={adaptedCertifications} />;
}