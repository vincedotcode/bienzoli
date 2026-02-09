-- bienzoli CRM Database Schema

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  monthly_ad_budget VARCHAR(100),
  service_needed VARCHAR(255),
  message TEXT,
  source VARCHAR(100),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',
  won_value NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead activities / notes timeline
CREATE TABLE IF NOT EXISTS lead_activities (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions (raw log)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  payload JSONB NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WhatsApp event log
CREATE TABLE IF NOT EXISTS whatsapp_events (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  event_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio projects (for website + CRM)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  client_name VARCHAR(255),
  description TEXT NOT NULL,
  long_description TEXT,
  url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client testimonials (for website + CRM)
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url VARCHAR(500),
  featured BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_events_lead ON whatsapp_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured_sort ON projects(featured, sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured_sort ON testimonials(featured, sort_order);

-- Seed data for demo
INSERT INTO leads (name, company, email, phone, whatsapp, monthly_ad_budget, service_needed, message, source, status, won_value, created_at) VALUES
  ('Aisha Ramsamy', 'Island Spice Co.', 'aisha@islandspice.mu', '+230 5712 3456', '+230 5712 3456', 'Rs 15,000 - Rs 30,000', 'Website + SEO', 'We need a modern e-commerce site for our spice products.', 'google', 'qualified', 0, NOW() - INTERVAL '12 days'),
  ('Raj Doorgakant', 'Mauritius Surf School', 'raj@musurf.com', '+230 5814 7890', '+230 5814 7890', 'Rs 5,000 - Rs 15,000', 'Landing Page', 'Looking for a booking page for our surf lessons.', 'instagram', 'contacted', 0, NOW() - INTERVAL '8 days'),
  ('Sophie Laurent', 'Belle Vue Realty', 'sophie@bellevue.mu', '+230 5923 4567', '+230 5923 4567', 'Rs 30,000+', 'Website + CRM', 'Need a property listing site with lead management.', 'referral', 'won', 85000, NOW() - INTERVAL '30 days'),
  ('Dev Ramnauth', 'TechHub MU', 'dev@techhub.mu', '+230 5678 1234', '+230 5678 1234', 'Rs 5,000 - Rs 15,000', 'Web App', 'Building a coworking space management tool.', 'linkedin', 'new', 0, NOW() - INTERVAL '2 days'),
  ('Marie-Claire Jolicoeur', 'Fleur de Lys Bakery', 'mc@fleurdelys.mu', '+230 5456 7891', '+230 5456 7891', 'Under Rs 5,000', 'Landing Page', 'Simple page to showcase our menu and take orders via WhatsApp.', 'whatsapp', 'new', 0, NOW() - INTERVAL '1 day'),
  ('Vinod Doobur', 'GreenTech Solutions', 'vinod@greentech.mu', '+230 5234 5678', '+230 5234 5678', 'Rs 15,000 - Rs 30,000', 'Website + SEO', 'Corporate site refresh with sustainability focus.', 'google', 'lost', 0, NOW() - INTERVAL '45 days')
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, slug, client_name, description, long_description, url, image_url, tags, featured, sort_order, created_at) VALUES
  (
    'Island Spice E-Commerce',
    'island-spice-ecommerce',
    'Island Spice Co.',
    'E-commerce storefront with WhatsApp order flow, product filtering, and SEO-ready structure.',
    'A conversion-focused e-commerce site for a local spice brand with fast product browsing, clear CTAs, and mobile-first checkout routing to WhatsApp.',
    'https://islandspice.mu',
    '/illustrations/team-collab.jpg',
    ARRAY['E-commerce', 'SEO', 'WhatsApp'],
    true,
    1,
    NOW() - INTERVAL '35 days'
  ),
  (
    'Belle Vue Property Portal',
    'belle-vue-property-portal',
    'Belle Vue Realty',
    'Property showcase with inquiry forms, lead capture, and CRM-ready pipeline integration.',
    'A real estate web portal with listing pages, segmented lead capture, and back-office visibility for sales follow-up.',
    'https://bellevue.mu',
    '/illustrations/mauritian-team.jpg',
    ARRAY['CRM', 'Lead Capture', 'Real Estate'],
    true,
    2,
    NOW() - INTERVAL '28 days'
  ),
  (
    'Mauritius Surf Booking',
    'mauritius-surf-booking',
    'Mauritius Surf School',
    'Landing page with booking flow, trust sections, and ad-friendly campaign structure.',
    'A high-converting landing page built for social traffic, optimized for booking intents and quick contact conversion.',
    'https://musurf.com',
    '/illustrations/mauritian-developer.jpg',
    ARRAY['Landing Page', 'Booking', 'Performance'],
    true,
    3,
    NOW() - INTERVAL '18 days'
  ),
  (
    'Fleur de Lys Menu Site',
    'fleur-de-lys-menu-site',
    'Fleur de Lys Bakery',
    'Simple branded menu site with click-to-WhatsApp ordering and daily specials.',
    'A lightweight menu website for rapid updates and easy mobile ordering, tailored for neighborhood bakery traffic.',
    'https://fleurdelys.mu',
    '/illustrations/hero-person.jpg',
    ARRAY['Restaurant', 'WhatsApp', 'Mobile'],
    false,
    4,
    NOW() - INTERVAL '10 days'
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO testimonials (name, company, role, quote, rating, avatar_url, featured, sort_order, created_at) VALUES
  (
    'Sophie Laurent',
    'Belle Vue Realty',
    'Managing Director',
    'The new website and CRM pipeline made lead follow-up much faster. We are closing higher-value clients with less manual work.',
    5,
    NULL,
    true,
    1,
    NOW() - INTERVAL '21 days'
  ),
  (
    'Raj Doorgakant',
    'Mauritius Surf School',
    'Founder',
    'Our booking inquiries increased within the first week. The landing page is fast, clear, and easy for our students to use on mobile.',
    5,
    NULL,
    true,
    2,
    NOW() - INTERVAL '16 days'
  ),
  (
    'Aisha Ramsamy',
    'Island Spice Co.',
    'Owner',
    'The e-commerce flow with WhatsApp ordering feels premium and practical. Exactly what we needed for local conversions.',
    5,
    NULL,
    true,
    3,
    NOW() - INTERVAL '12 days'
  )
ON CONFLICT DO NOTHING;

INSERT INTO lead_activities (lead_id, type, content, created_at) VALUES
  (1, 'note', 'Initial call - very interested in e-commerce features. Follows up next week.', NOW() - INTERVAL '11 days'),
  (1, 'status_change', 'Status changed from new to contacted', NOW() - INTERVAL '11 days'),
  (1, 'status_change', 'Status changed from contacted to qualified', NOW() - INTERVAL '7 days'),
  (2, 'note', 'Sent proposal for landing page with booking integration.', NOW() - INTERVAL '6 days'),
  (2, 'status_change', 'Status changed from new to contacted', NOW() - INTERVAL '6 days'),
  (3, 'note', 'Signed contract for Rs 85,000 - full website + CRM package.', NOW() - INTERVAL '20 days'),
  (3, 'status_change', 'Status changed from qualified to won', NOW() - INTERVAL '20 days'),
  (4, 'note', 'New lead from LinkedIn ad campaign.', NOW() - INTERVAL '2 days'),
  (5, 'note', 'Came through WhatsApp. Wants a simple menu page.', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
