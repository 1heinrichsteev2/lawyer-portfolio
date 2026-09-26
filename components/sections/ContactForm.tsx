'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { advocate, isPlaceholder } from '@/data/advocate';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const TOPICS = ['General information', 'Criminal matter', 'Bail', 'Cybercrime', 'Other matter'];

/**
 * Contact form. INTEGRATION POINT: set NEXT_PUBLIC_CONTACT_ENDPOINT (see .env.example) to an
 * HTTPS endpoint that accepts JSON. With no endpoint, nothing is sent and the form says so.
 * It never reports success unless the endpoint responds with a 2xx status.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = 'Enter your name.';
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Enter a valid email address.';
    if (!data.message?.trim() || data.message.trim().length < 10) next.message = 'Write a short message of at least 10 characters.';
    if (!data.consent) next.consent = 'Confirm that you have read the notice above.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    if (!site.contactEndpoint) {
      setStatus('not-configured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone ?? '', topic: data.topic, message: data.message })
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full rounded-[12px] border border-ivory/12 bg-ivory/[0.03] px-4 py-3 text-[0.95rem] text-ivory placeholder:text-stone/60 transition-colors focus:border-champagne/60 focus:outline-none focus-visible:outline-none';
  const emailAvailable = !isPlaceholder(advocate.email);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-notice">
      <p id="form-notice" className="rounded-[12px] border border-champagne/30 bg-champagne/[0.05] px-4 py-3 text-[0.85rem] leading-relaxed text-ivory/80">
        Please share only general details. Do not send confidential or sensitive information. Sending a message does not create
        an advocate–client relationship.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">
            Name
          </label>
          <input id="cf-name" name="name" autoComplete="name" className={cn(field, 'mt-2')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
          {errors.name && <p id="cf-name-err" className="mt-1.5 text-[0.8rem] text-[#e8a88f]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="label">
            Email
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" className={cn(field, 'mt-2')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
          {errors.email && <p id="cf-email-err" className="mt-1.5 text-[0.8rem] text-[#e8a88f]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="label">
            Phone (optional)
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={cn(field, 'mt-2')} />
        </div>
        <div>
          <label htmlFor="cf-topic" className="label">
            Topic
          </label>
          <select id="cf-topic" name="topic" className={cn(field, 'mt-2 appearance-none')} defaultValue={TOPICS[0]}>
            {TOPICS.map(t => (
              <option key={t} value={t} className="bg-carbon">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="label">
          Message
        </label>
        <textarea id="cf-message" name="message" rows={5} className={cn(field, 'mt-2 resize-y')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <p id="cf-message-err" className="mt-1.5 text-[0.8rem] text-[#e8a88f]">{errors.message}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 text-[0.88rem] text-ivory/80">
          <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-[#C8A45D]" aria-invalid={!!errors.consent} />
          <span>
            I have read the notice above and the{' '}
            <Link href="/privacy" className="link-underline text-ivory">
              privacy policy
            </Link>
            , and I understand this message is not a request for legal advice on specific facts.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-[0.8rem] text-[#e8a88f]">{errors.consent}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-11 items-center rounded-full bg-ivory px-6 text-[0.9rem] font-medium text-ink transition-colors hover:bg-[#f6f1e6] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <div role="status" aria-live="polite" className="text-[0.9rem]">
        {status === 'sent' && <p className="text-champagne-pale">Message sent. Thank you.</p>}
        {status === 'error' && <p className="text-[#e8a88f]">The message could not be sent. Please try again, or use the email address on this page.</p>}
        {status === 'not-configured' && (
          <p className="text-ivory/85">
            Online messaging is not set up yet, so nothing was sent.{' '}
            {emailAvailable ? (
              <>
                Please email{' '}
                <a className="link-underline text-ivory" href={`mailto:${advocate.email}`}>
                  {advocate.email}
                </a>{' '}
                instead.
              </>
            ) : (
              'Please use the contact details on this page instead.'
            )}
          </p>
        )}
      </div>
    </form>
  );
}
