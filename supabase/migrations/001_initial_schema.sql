-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  condition TEXT,
  price DECIMAL(10,2),
  msrp DECIMAL(10,2),
  stock_number TEXT,
  location TEXT DEFAULT 'Gainesville, GA',
  status TEXT DEFAULT 'Available',
  description_html TEXT,
  type TEXT,
  category TEXT,
  manufacturer TEXT,
  model TEXT,
  year INTEGER,
  floor_length TEXT,
  floor_width TEXT,
  weight TEXT,
  axle_capacity TEXT,
  color TEXT,
  pull_type TEXT,
  axles TEXT,
  construction TEXT,
  stalls TEXT,
  load_type TEXT,
  height TEXT,
  length TEXT,
  features TEXT[],
  is_sale BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Images Table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_manufacturer ON products(manufacturer);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Setup Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

-- Table RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Products public read
CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT
  USING ( true );

-- Products admin write
CREATE POLICY "Products are insertable by admins."
  ON products FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Products are updatable by admins."
  ON products FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Products are deletable by admins."
  ON products FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- Product Images public read
CREATE POLICY "Product images are viewable by everyone."
  ON product_images FOR SELECT
  USING ( true );

-- Product Images admin write
CREATE POLICY "Product images are insertable by admins."
  ON product_images FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Product images are updatable by admins."
  ON product_images FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Product images are deletable by admins."
  ON product_images FOR DELETE
  USING ( auth.role() = 'authenticated' );
