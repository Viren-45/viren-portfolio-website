-- ========================================
-- TABLE: blogs
-- Stores blog posts with content, images, tags, etc.
-- ========================================
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),         -- Unique ID for each blog
  title TEXT NOT NULL,                                   -- Blog title
  slug TEXT UNIQUE NOT NULL,                             -- URL-friendly identifier (e.g., /blog/my-first-post)
  content TEXT NOT NULL,                                 -- Full blog content (Markdown or HTML)
  excerpt TEXT,                                          -- Short summary for previews
  tags TEXT[],                                           -- Array of tags/keywords (e.g., ['Next.js', 'Tutorial'])
  images TEXT[],                                         -- Array of image URLs (Cloudinary, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),                  -- Timestamp when created
  updated_at TIMESTAMPTZ DEFAULT NOW()                   -- Timestamp when last updated
);

-- Trigger function to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blogs: update 'updated_at' on row update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- ========================================
-- TABLE: projects
-- Stores portfolio projects with descriptions, images, links, and tags
-- ========================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),         -- Unique ID for each project
  title TEXT NOT NULL,                                   -- Project title
  slug TEXT UNIQUE NOT NULL,                             -- URL-friendly slug (e.g., /projects/portfolio-site)
  description TEXT NOT NULL,                             -- Short or detailed description
  tags TEXT[],                                           -- Tech stack used (e.g., ['React', 'Tailwind', 'MongoDB'])
  images TEXT[],                                         -- Array of image URLs
  github_url TEXT,                                       -- Link to GitHub repository (optional)
  live_url TEXT,                                         -- Link to live demo (optional)
  featured BOOLEAN DEFAULT FALSE,                        -- Whether the project is featured
  created_at TIMESTAMPTZ DEFAULT NOW(),                  -- Timestamp when created
  updated_at TIMESTAMPTZ DEFAULT NOW()                   -- Timestamp when last updated
);

-- Trigger for projects: update 'updated_at' on row update
CREATE TRIGGER set_updated_at_projects
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- ========================================
-- TABLE: certifications
-- Stores professional certifications and credentials
-- ========================================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),         -- Unique ID for each certification
  title TEXT NOT NULL,                                   -- Certification name (e.g., "Google Cybersecurity")
  provider TEXT NOT NULL,                                -- Issuing organization (e.g., Google, Coursera)
  issue_date DATE NOT NULL,                              -- Date the certification was issued
  credential_url TEXT,                                   -- Link to view or verify the certificate (optional)
  image_url TEXT,                                        -- Image of certificate (optional)
  created_at TIMESTAMPTZ DEFAULT NOW(),                  -- Timestamp when created
  updated_at TIMESTAMPTZ DEFAULT NOW()                   -- Timestamp when last updated
);

-- Trigger for certifications: update 'updated_at' on row update
CREATE TRIGGER set_updated_at_certifications
BEFORE UPDATE ON certifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
