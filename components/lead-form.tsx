'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type LeadFormProps = { kind?: 'review' | 'contact'; selectedService?: string };
const services = ['Website Management', 'SEO', 'Google Ads', 'Meta Ads', 'CRO Improvements', 'AI Workflow Automation', 'Analytics and Tracking', 'Website + SEO', 'Advanced Growth', 'Growth Plus'];

export function LeadForm({ kind = 'review', selectedService = '' }: LeadFormProps) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage('');
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, kind }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      setMessage('Thank you. Your enquiry has been received. We’ll be in touch soon.');
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setPending(false);
    }
  }

  return <form className="form" onSubmit={submit}>
    <div className="form-grid"><label>Your name<input name="name" required autoComplete="name" placeholder="Jane Smith" /></label><label>Work email<input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" /></label></div>
    <div className="form-grid"><label>Company<input name="company" required placeholder="Your business" /></label><label>Website URL<input name="website_url" type="url" placeholder="https://example.com" required={kind === 'review'} /></label></div>
    {kind === 'contact' && <label>What help do you need?<select name="service" required defaultValue={selectedService}><option value="" disabled>Select a service</option>{services.map(service => <option key={service} value={service}>{service}</option>)}</select></label>}
    <label>{kind === 'review' ? 'Anything we should know? (optional)' : 'Your message'}<textarea name="message" placeholder="Tell us about your website or goals" required={kind === 'contact'} /></label>
    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true"><label>Leave this blank<input name="website_address" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="btn btn-dark" type="submit" disabled={pending}>{pending ? 'Sending…' : kind === 'review' ? 'Review my website' : 'Send enquiry'} <ArrowUpRight size={15} /></button>
    <div className="form-status" role="status">{message}</div>
  </form>;
}
