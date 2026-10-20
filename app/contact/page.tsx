import type { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';
import { PageHero } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Organic Reach HUB about website management, SEO, Google Ads or Meta Ads.',
  alternates: { canonical: '/contact' },
};

const packageNames: Record<string, string> = {
  'website-seo': 'Website + SEO',
  'advanced-growth': 'Advanced Growth',
  'growth-plus': 'Growth Plus',
};
const serviceNames: Record<string, string> = {
  cro: 'CRO Improvements',
  'ai-automation': 'AI Workflow Automation',
  analytics: 'Analytics and Tracking',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string; service?: string }> }) {
  const params = await searchParams;
  const selectedService = packageNames[params.package || ''] || serviceNames[params.service || ''] || '';
  return <>
    <PageHero eyebrow="Get in touch" title="Tell us what your website needs." copy={selectedService ? `Interested in ${selectedService}? Tell us a little about your business and we’ll share the details.` : 'A question, an existing site, or a growth plan in mind? Send a few details and we’ll get back to you.'} actions={false} compact />
    <section className="section"><div className="container content-grid"><div><span className="eyebrow">A direct conversation</span><h2 className="heading" style={{ fontSize: 56, margin: '18px 0' }}>No complicated brief required.</h2><p className="muted" style={{ lineHeight: 1.8 }}>Tell us about the business, the website and what is frustrating you. We’ll help work out a sensible next step.</p><p className="business-note">Your enquiry is made to Organic Reach HUB. Organic Reach HUB and Agile Digital Technologies are separate businesses under shared ownership.</p></div><LeadForm kind="contact" selectedService={selectedService} /></div></section>
  </>;
}
