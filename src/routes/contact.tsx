import { useState } from 'react';
import { Mail, CheckCircle2, MessageSquare } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { sendContactMessage, SubmissionError } from '@/lib/submissions';

const CONTACT_TOPICS = [
  'General question',
  'Data or rates issue',
  'Correction request',
  'Media or press',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  // These were previously uncontrolled, so the values were never read at all.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(CONTACT_TOPICS[0]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'loading') return;

    setSubmitError(null);
    setSubmitStatus('loading');
    try {
      await sendContactMessage({ name, email, topic, message });
      setSubmitStatus('success');
      window.setTimeout(() => {
        setSubmitted(true);
        setSubmitStatus('idle');
      }, 800);
    } catch (error) {
      setSubmitStatus('idle');
      setSubmitError(
        error instanceof SubmissionError
          ? error.message
          : "We couldn't send your message. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Contact</span>
          <h1>Get in Touch with VectisX</h1>
          <p className="text-ink-500">
            VectisX is an independent currency-conversion project. Spot a wrong rate, a broken
            link or something that reads inaccurately, and this is the fastest way to report it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-surface space-y-3">
              <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email</span>
              </div>
              <p className="text-[14px] leading-[22px] text-ink-700">
                <a
                  href="mailto:akhtarabdulmannan@gmail.com"
                  className="font-semibold text-ink underline underline-offset-2 hover:no-underline"
                >
                  akhtarabdulmannan@gmail.com
                </a>
              </p>
              <p className="text-caption text-ink-500">
                This is a one-person project, so replies are usually within a couple of days
                rather than within the hour.
              </p>
            </div>

            <div className="card p-6 bg-surface space-y-3">
              <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Use the form</span>
              </div>
              <p className="text-[14px] leading-[22px] text-ink-700">
                Messages sent through the form are stored in the project&apos;s database and read
                in the same inbox. There is no phone line and no postal address behind this site.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 card p-6 sm:p-8 bg-surface">
            <h2 className="mb-2">Send a Message</h2>
            <p className="text-ink-500 mb-6">
              Fill this in and it is saved straight to the project&apos;s inbox.
            </p>

            {submitted ? (
              <div className="p-8 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto" aria-hidden="true" />
                <h3 className="text-gain">Message Received</h3>
                <p className="text-[14px] max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been saved; replies go to the email
                  address you gave, usually within a couple of days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={200}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block mb-1.5">
                    Topic / Inquiry Type
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="select-field text-[14px] font-medium"
                  >
                    {CONTACT_TOPICS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    maxLength={5000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe how we can assist you..."
                    className="input-field"
                  />
                </div>

                {submitError && (
                  <p role="alert" className="text-[14px] text-loss">
                    {submitError}
                  </p>
                )}

                <ActionButton
                  type="submit"
                  status={submitStatus}
                  successLabel="Message Sent"
                  className="w-full justify-center btn-lg"
                >
                  Submit Inquiry
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
