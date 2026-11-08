-- VectisX Supabase Schema & Seed Data

-- 1. User Profiles (synced with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  account_type text NOT NULL DEFAULT 'personal' CHECK (account_type IN ('personal', 'business')),
  company_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, account_type, company_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    CASE
      WHEN (NEW.raw_user_meta_data ->> 'account_type') IN ('personal', 'business')
      THEN NEW.raw_user_meta_data ->> 'account_type'
      ELSE 'personal'
    END,
    NEW.raw_user_meta_data ->> 'company_name'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), public.profiles.full_name),
    account_type = EXCLUDED.account_type,
    company_name = COALESCE(EXCLUDED.company_name, public.profiles.company_name),
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Currencies & Live Mid-Market Rates
CREATE TABLE IF NOT EXISTS public.currencies (
  code text PRIMARY KEY,
  name text NOT NULL,
  symbol text NOT NULL,
  flag text NOT NULL,
  region text NOT NULL,
  rate_to_usd numeric NOT NULL,
  change_24h numeric NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Currencies are publicly readable" ON public.currencies;
CREATE POLICY "Currencies are publicly readable"
  ON public.currencies FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.currencies (code, name, symbol, flag, region, rate_to_usd, change_24h)
VALUES
  ('USD', 'US Dollar', '$', '🇺🇸', 'North America', 1, 0),
  ('EUR', 'Euro', '€', '🇪🇺', 'Europe', 0.8534, -1.2093),
  ('GBP', 'British Pound', '£', '🇬🇧', 'Europe', 0.7312, -1.7373),
  ('JPY', 'Japanese Yen', '¥', '🇯🇵', 'Asia', 149.52, 1.5913),
  ('AUD', 'Australian Dollar', 'A$', '🇦🇺', 'Oceania', 1.5243, -1.7747),
  ('CAD', 'Canadian Dollar', 'C$', '🇨🇦', 'North America', 1.3621, 0.5833),
  ('CHF', 'Swiss Franc', 'Fr', '🇨🇭', 'Europe', 0.8765, -1.3263),
  ('CNY', 'Chinese Yuan', '¥', '🇨🇳', 'Asia', 7.2341, 0.9795),
  ('INR', 'Indian Rupee', '₹', '🇮🇳', 'Asia', 83.4521, -1.9625),
  ('MXN', 'Mexican Peso', 'MX$', '🇲🇽', 'North America', 17.2345, 1.5913),
  ('BRL', 'Brazilian Real', 'R$', '🇧🇷', 'South America', 4.9876, -0.2981),
  ('KRW', 'South Korean Won', '₩', '🇰🇷', 'Asia', 1328.45, -1.3314),
  ('SGD', 'Singapore Dollar', 'S$', '🇸🇬', 'Asia', 1.3412, -0.6021),
  ('HKD', 'Hong Kong Dollar', 'HK$', '🇭🇰', 'Asia', 7.8123, -1.2922),
  ('NOK', 'Norwegian Krone', 'kr', '🇳🇴', 'Europe', 10.6234, 0.0762),
  ('SEK', 'Swedish Krona', 'kr', '🇸🇪', 'Europe', 10.4512, 0.807),
  ('DKK', 'Danish Krone', 'kr', '🇩🇰', 'Europe', 6.8734, -1.7747),
  ('NZD', 'New Zealand Dollar', 'NZ$', '🇳🇿', 'Oceania', 1.6234, -1.2093),
  ('ZAR', 'South African Rand', 'R', '🇿🇦', 'Africa', 18.6543, -0.1413),
  ('TRY', 'Turkish Lira', '₺', '🇹🇷', 'Europe', 28.7654, 0.0668),
  ('RUB', 'Russian Ruble', '₽', '🇷🇺', 'Europe', 91.2345, -1.9625),
  ('PLN', 'Polish Zloty', 'zł', '🇵🇱', 'Europe', 4.0123, 0.9795),
  ('THB', 'Thai Baht', '฿', '🇹🇭', 'Asia', 35.4321, -0.6021),
  ('IDR', 'Indonesian Rupiah', 'Rp', '🇮🇩', 'Asia', 15623.45, 0.0378),
  ('MYR', 'Malaysian Ringgit', 'RM', '🇲🇾', 'Asia', 4.6789, -1.8813),
  ('PHP', 'Philippine Peso', '₱', '🇵🇭', 'Asia', 56.1234, 0.0762),
  ('CZK', 'Czech Koruna', 'Kč', '🇨🇿', 'Europe', 22.3456, 0.0762),
  ('ILS', 'Israeli Shekel', '₪', '🇮🇱', 'Middle East', 3.6789, 0.0762),
  ('CLP', 'Chilean Peso', 'CL$', '🇨🇱', 'South America', 876.54, 0.0378),
  ('AED', 'UAE Dirham', 'د.إ', '🇦🇪', 'Middle East', 3.6725, -0.8793),
  ('SAR', 'Saudi Riyal', '﷼', '🇸🇦', 'Middle East', 3.75, 0.6639),
  ('TWD', 'Taiwan Dollar', 'NT$', '🇹🇼', 'Asia', 31.4567, 0.5709),
  ('ARS', 'Argentine Peso', 'AR$', '🇦🇷', 'South America', 365.78, 0.6639),
  ('COP', 'Colombian Peso', 'CO$', '🇨🇴', 'South America', 3945.67, 1.5452),
  ('EGP', 'Egyptian Pound', 'E£', '🇪🇬', 'Africa', 30.8765, -0.107),
  ('NGN', 'Nigerian Naira', '₦', '🇳🇬', 'Africa', 776.54, 0.807),
  ('PKR', 'Pakistani Rupee', '₨', '🇵🇰', 'Asia', 282.34, -0.1413),
  ('BDT', 'Bangladeshi Taka', '৳', '🇧🇩', 'Asia', 109.87, -1.7747),
  ('VND', 'Vietnamese Dong', '₫', '🇻🇳', 'Asia', 24356.78, 0.0762),
  ('HUF', 'Hungarian Forint', 'Ft', '🇭🇺', 'Europe', 354.56, 0.807),
  ('RON', 'Romanian Leu', 'lei', '🇷🇴', 'Europe', 4.5678, 0.5709),
  ('BGN', 'Bulgarian Lev', 'лв', '🇧🇬', 'Europe', 1.789, -1.2922),
  ('HRK', 'Croatian Kuna', 'kn', '🇭🇷', 'Europe', 6.9876, 0.9117),
  ('ISK', 'Icelandic Krona', 'kr', '🇮🇸', 'Europe', 137.89, 1.2744),
  ('UAH', 'Ukrainian Hryvnia', '₴', '🇺🇦', 'Europe', 37.6543, -0.6021),
  ('PEN', 'Peruvian Sol', 'S/', '🇵🇪', 'South America', 3.7234, 0.807),
  ('KES', 'Kenyan Shilling', 'KSh', '🇰🇪', 'Africa', 153.45, 0.807),
  ('GHS', 'Ghanaian Cedi', 'GH₵', '🇬🇭', 'Africa', 12.3456, 1.5452),
  ('MAD', 'Moroccan Dirham', 'MAD', '🇲🇦', 'Africa', 9.8765, -0.3015),
  ('QAR', 'Qatari Riyal', 'QR', '🇶🇦', 'Middle East', 3.64, 0.9915),
  ('KWD', 'Kuwaiti Dinar', 'KD', '🇰🇼', 'Middle East', 0.3078, 0.6639),
  ('BHD', 'Bahraini Dinar', 'BD', '🇧🇭', 'Middle East', 0.377, -1.9735),
  ('OMR', 'Omani Rial', 'OMR', '🇴🇲', 'Middle East', 0.3845, 1.0445),
  ('JOD', 'Jordanian Dinar', 'JD', '🇯🇴', 'Middle East', 0.709, 0.8059),
  ('LKR', 'Sri Lankan Rupee', 'Rs', '🇱🇰', 'Asia', 323.45, -1.9625),
  ('NPR', 'Nepalese Rupee', 'Rs', '🇳🇵', 'Asia', 133.56, 1.4497),
  ('MMK', 'Myanmar Kyat', 'K', '🇲🇲', 'Asia', 2098.76, 0.9117),
  ('KHR', 'Cambodian Riel', '៛', '🇰🇭', 'Asia', 4098.76, 0.9117),
  ('LAK', 'Lao Kip', '₭', '🇱🇦', 'Asia', 20567.89, -1.194),
  ('FJD', 'Fijian Dollar', 'FJ$', '🇫🇯', 'Oceania', 2.2345, 0.9029),
  ('XAU', 'Gold (troy oz)', 'XAU', '🥇', 'Metals', 0.000488, 1.0445),
  ('XAG', 'Silver (troy oz)', 'XAG', '🥈', 'Metals', 0.0412, -0.2981),
  ('BTC', 'Bitcoin', '₿', '🪙', 'Crypto', 0.0000234, -1.7373),
  ('ETH', 'Ethereum', 'Ξ', '🪙', 'Crypto', 0.000412, -1.1278)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  symbol = EXCLUDED.symbol,
  flag = EXCLUDED.flag,
  region = EXCLUDED.region,
  rate_to_usd = EXCLUDED.rate_to_usd,
  change_24h = EXCLUDED.change_24h,
  updated_at = now();

-- 3. Rate Alerts
CREATE TABLE IF NOT EXISTS public.rate_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  direction text NOT NULL DEFAULT 'above' CHECK (direction IN ('above', 'below')),
  target_rate numeric NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create rate alerts" ON public.rate_alerts;
CREATE POLICY "Anyone can create rate alerts"
  ON public.rate_alerts FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own rate alerts" ON public.rate_alerts;
CREATE POLICY "Users can view own rate alerts"
  ON public.rate_alerts FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

DROP POLICY IF EXISTS "Users can update own rate alerts" ON public.rate_alerts;
CREATE POLICY "Users can update own rate alerts"
  ON public.rate_alerts FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

DROP POLICY IF EXISTS "Users can delete own rate alerts" ON public.rate_alerts;
CREATE POLICY "Users can delete own rate alerts"
  ON public.rate_alerts FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

-- 4. International Money Transfers
CREATE TABLE IF NOT EXISTS public.transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_email text,
  recipient_name text NOT NULL,
  recipient_email text,
  recipient_iban text,
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  send_amount numeric NOT NULL,
  exchange_rate numeric NOT NULL,
  fee numeric NOT NULL DEFAULT 0,
  recipient_amount numeric NOT NULL,
  promo_code text,
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can initiate transfers" ON public.transfers;
CREATE POLICY "Anyone can initiate transfers"
  ON public.transfers FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own transfers" ON public.transfers;
CREATE POLICY "Users can view own transfers"
  ON public.transfers FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(coalesce(sender_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

-- 5. Newsletter / Market Pulse Subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  frequency text NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.subscribe_newsletter(p_email text, p_frequency text DEFAULT 'daily')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.newsletter_subscriptions (email, frequency, is_active, updated_at)
  VALUES (
    lower(trim(p_email)),
    CASE WHEN p_frequency IN ('daily', 'weekly') THEN p_frequency ELSE 'daily' END,
    true,
    now()
  )
  ON CONFLICT (email) DO UPDATE SET
    frequency = EXCLUDED.frequency,
    is_active = true,
    updated_at = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.subscribe_newsletter(text, text) TO anon, authenticated;

-- 6. Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  topic text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON public.contact_inquiries;
CREATE POLICY "Anyone can submit contact inquiry"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Users can view own contact inquiries"
  ON public.contact_inquiries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Partner Program Applications
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  business_email text NOT NULL,
  track text NOT NULL,
  estimated_volume text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit partner application" ON public.partner_applications;
CREATE POLICY "Anyone can submit partner application"
  ON public.partner_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
