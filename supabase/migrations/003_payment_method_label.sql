-- Add a display label column to payment_details so each method can have a human-friendly name
-- e.g. method='bank_transfer', label='Bank Transfer'
ALTER TABLE public.payment_details ADD COLUMN IF NOT EXISTS label TEXT;

-- Seed label for any existing rows that don't have one yet
UPDATE public.payment_details SET label = 'Bank Transfer' WHERE method = 'bank_transfer' AND label IS NULL;
