import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

/**
 * Errors surfaced to the user. These are deliberately plain-language: the
 * previous forms claimed success without doing any work, so every failure path
 * now has to say something honest and actionable.
 */
export class SubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SubmissionError';
  }
}

const NOT_CONFIGURED =
  'This form is not connected to a database in this environment, so nothing was saved. Please contact support.';
const OFFLINE =
  "We couldn't reach the server, so your submission was not saved. Please check your connection and try again.";
const DUPLICATE = 'This has already been submitted.';

/** Postgres error code for a unique-constraint violation. */
const UNIQUE_VIOLATION = '23505';

/** Postgres error codes for a CHECK-constraint violation. */
const CHECK_VIOLATION = '23514';

function toSubmissionError(error: { code?: string; message?: string } | null): SubmissionError {
  if (error?.code === UNIQUE_VIOLATION) {
    return new SubmissionError(DUPLICATE);
  }
  if (error?.code === CHECK_VIOLATION) {
    return new SubmissionError('Some of the details provided are not valid. Please check and try again.');
  }
  // A network-layer failure has no Postgres code.
  if (!error?.code) {
    return new SubmissionError(OFFLINE);
  }
  return new SubmissionError("We couldn't save your submission. Please try again.");
}

/** Requires a configured client, or throws the honest "not saved" message. */
function requireClient() {
  const supabase = getSupabaseClient();
  if (!supabase || !isSupabaseConfigured()) {
    throw new SubmissionError(NOT_CONFIGURED);
  }
  return supabase;
}

/** The signed-in user's id, or null for an anonymous visitor. */
async function currentOwnerId(): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

export interface RateAlertInput {
  email: string;
  fromCurrency: string;
  toCurrency: string;
  direction: 'above' | 'below';
  targetRate: number;
}

/**
 * Saves a rate alert. Resolves only once the row exists in Postgres, so a
 * success message always means the alert survived.
 */
export async function createRateAlert(input: RateAlertInput): Promise<void> {
  const supabase = requireClient();
  const { error } = await supabase.from('rate_alerts').insert({
    email: input.email.trim(),
    from_currency: input.fromCurrency,
    to_currency: input.toCurrency,
    direction: input.direction,
    target_rate: input.targetRate,
    user_id: await currentOwnerId(),
  });
  if (error) throw toSubmissionError(error);
}

export interface NewsletterInput {
  email: string;
  frequency: 'daily' | 'weekly';
}

/**
 * Subscribes an email address. The unique constraint on `email` means a repeat
 * submission is reported as "already subscribed" rather than a fake success.
 */
export async function subscribeToNewsletter(input: NewsletterInput): Promise<void> {
  const supabase = requireClient();
  const email = input.email.trim().toLowerCase();

  // The table has no owner column: a subscription is keyed by email alone and
  // is deliberately not linked to the auth user.
  const { error } = await supabase
    .from('newsletter_subscriptions')
    .insert({ email, frequency: input.frequency });

  if (!error) return;

  // Already subscribed. The email column is unique and there is no UPDATE
  // policy for this table, so changing cadence is not something the browser
  // can do — say so honestly instead of pretending it worked.
  if (error.code === UNIQUE_VIOLATION) {
    throw new SubmissionError(
      'This email is already subscribed. Contact support if you need to change the cadence.',
    );
  }

  throw toSubmissionError(error);
}

export interface ContactInput {
  name: string;
  email: string;
  topic: string;
  message: string;
}

/** Stores a contact enquiry. */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  const supabase = requireClient();
  const { error } = await supabase.from('contact_inquiries').insert({
    full_name: input.name.trim(),
    email: input.email.trim(),
    topic: input.topic,
    message: input.message.trim(),
    user_id: await currentOwnerId(),
  });
  if (error) throw toSubmissionError(error);
}

export interface PartnerApplicationInput {
  companyName: string;
  businessEmail: string;
  track: string;
  estimatedVolume: string;
}

/** Stores a partner-program application. */
export async function submitPartnerApplication(input: PartnerApplicationInput): Promise<void> {
  const supabase = requireClient();
  const { error } = await supabase.from('partner_applications').insert({
    company_name: input.companyName.trim(),
    business_email: input.businessEmail.trim(),
    track: input.track,
    estimated_volume: input.estimatedVolume.trim() || null,
  });
  if (error) throw toSubmissionError(error);
}
