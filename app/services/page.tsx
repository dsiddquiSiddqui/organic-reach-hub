import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Wrench, Search, Megaphone, Target, Workflow, BarChart3 } from 'lucide-react';
import { PageHero, BottomCta } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Website management, SEO, paid growth, CRO and practical AI workflow automation from one dedicated partner.',
  alternates: { canonical: '/services' },
};

const items = [
  { id: 'website-management', icon: Wrench, title: 'Website management', copy: 'Maintenance, monitoring and monthly improvements that keep your site working harder.', href: '/website-management', points: ['Updates, backups and security', 'Forms, uptime and speed checks', 'Small changes and CTA improvements'] },
  { id: 'seo', icon: Search, title: 'SEO', copy: 'Practical technical and on-page work to improve how people find and use your site.', href: '/seo', points: ['Indexing and technical health', 'Service page optimisation', 'Local and internal linking improvements'] },
  { id: 'paid-growth', icon: Megaphone, title: 'Paid growth', copy: 'A focused Google Ads or Meta Ads channel with ongoing optimisation and conversion tracking.', href: '/paid-growth', points: ['Campaign setup and management', 'Budget and audience refinement', 'Landing page optimisation'] },
  { id: 'cro', icon: Target, title: 'CRO improvements', copy: 'Turn more relevant visits into enquiries by removing friction from your most important pages.', href: '/conversion-rate-optimisation', points: ['Headlines and calls to action', 'Form and mobile journey improvements', 'Measured changes to high-intent pages'] },
  { id: 'ai-automation', icon: Workflow, title: 'AI workflow automation', copy: 'Make repetitive tasks lighter with carefully designed, human-reviewed AI-assisted workflows.', href: '/ai-workflow-automation', points: ['Lead intake and routing', 'Follow-up drafts and reminders', 'Checks and human approval where it matters'] },
  { id: 'analytics', icon: BarChart3, title: 'Analytics and tracking', copy: 'Understand what visitors do and use that evidence to guide the next improvement.', href: '/analytics-conversion-tracking', points: ['Enquiry and conversion events', 'Search and campaign reporting', 'A clearer view of what is working'] },
];

export default function Services() {
  return <>
    <PageHero eyebrow="What we do" title="The work behind a website that keeps moving." copy="Technical care, search visibility, conversion and practical automations all connect. We look after the moving parts and make sensible improvements every month." secondaryHref="/packages" secondaryLabel="Explore packages" />
    <section className="section"><div className="container"><div className="service-grid services-overview-grid">
      {items.map((item, index) => <Link id={item.id} href={item.href} className="service-tile" key={item.id}>
        <span className="tile-icon"><item.icon size={20} aria-hidden="true" /></span><ArrowUpRight className="tile-arrow" size={18} aria-hidden="true" />
        <span className="tile-index">{String(index + 1).padStart(2, '0')} / 06</span>
        <h2>{item.title}</h2><p>{item.copy}</p>
        <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
      </Link>)}
    </div></div></section>
    <BottomCta />
  </>;
}
