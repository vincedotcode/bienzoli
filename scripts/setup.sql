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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_events_lead ON whatsapp_events(lead_id);

-- Seed data for demo
INSERT INTO leads (name, company, email, phone, whatsapp, monthly_ad_budget, service_needed, message, source, status, won_value, created_at) VALUES
  ('Aisha Ramsamy', 'Island Spice Co.', 'aisha@islandspice.mu', '+230 5712 3456', '+230 5712 3456', 'Rs 15,000 - Rs 30,000', 'Website + SEO', 'We need a modern e-commerce site for our spice products.', 'google', 'qualified', 0, NOW() - INTERVAL '12 days'),
  ('Raj Doorgakant', 'Mauritius Surf School', 'raj@musurf.com', '+230 5814 7890', '+230 5814 7890', 'Rs 5,000 - Rs 15,000', 'Landing Page', 'Looking for a booking page for our surf lessons.', 'instagram', 'contacted', 0, NOW() - INTERVAL '8 days'),
  ('Sophie Laurent', 'Belle Vue Realty', 'sophie@bellevue.mu', '+230 5923 4567', '+230 5923 4567', 'Rs 30,000+', 'Website + CRM', 'Need a property listing site with lead management.', 'referral', 'won', 85000, NOW() - INTERVAL '30 days'),
  ('Dev Ramnauth', 'TechHub MU', 'dev@techhub.mu', '+230 5678 1234', '+230 5678 1234', 'Rs 5,000 - Rs 15,000', 'Web App', 'Building a coworking space management tool.', 'linkedin', 'new', 0, NOW() - INTERVAL '2 days'),
  ('Marie-Claire Jolicoeur', 'Fleur de Lys Bakery', 'mc@fleurdelys.mu', '+230 5456 7891', '+230 5456 7891', 'Under Rs 5,000', 'Landing Page', 'Simple page to showcase our menu and take orders via WhatsApp.', 'whatsapp', 'new', 0, NOW() - INTERVAL '1 day'),
  ('Vinod Doobur', 'GreenTech Solutions', 'vinod@greentech.mu', '+230 5234 5678', '+230 5234 5678', 'Rs 15,000 - Rs 30,000', 'Website + SEO', 'Corporate site refresh with sustainability focus.', 'google', 'lost', 0, NOW() - INTERVAL '45 days')
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
