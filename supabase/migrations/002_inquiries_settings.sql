-- Create Inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    message TEXT,
    type TEXT NOT NULL DEFAULT 'General',
    status TEXT NOT NULL DEFAULT 'New'
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view inquiries" ON public.inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update inquiries" ON public.inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete inquiries" ON public.inquiries
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create Site Settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notification_email TEXT NOT NULL DEFAULT 'info@horseprotrailers.com',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site_settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can update site_settings" ON public.site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert site_settings" ON public.site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert initial row if not exists
INSERT INTO public.site_settings (notification_email)
SELECT 'info@horseprotrailers.com'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);
