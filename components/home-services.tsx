import Link from 'next/link';
import { ArrowUpRight, Wrench, Search, MousePointer2, BarChart3, ShieldCheck, Gauge, ScanSearch, Megaphone, Target, Workflow } from 'lucide-react';

const services = [
  { icon: Wrench, title: 'Website management', copy: 'Updates, monitoring, fixes and useful changes every month.', href: '/website-management' },
  { icon: Search, title: 'SEO', copy: 'Keep key pages discoverable, relevant and technically sound.', href: '/seo' },
  { icon: ScanSearch, title: 'Technical SEO', copy: 'Indexing, schema, links, sitemaps and site health.', href: '/services' },
  { icon: Megaphone, title: 'Google Ads', copy: 'Focused search campaigns built around buying intent.', href: '/paid-growth' },
  { icon: MousePointer2, title: 'Meta Ads', copy: 'Reach the right audience and learn what converts.', href: '/paid-growth' },
  { icon: Gauge, title: 'Landing pages', copy: 'Improve headlines, forms and calls to action.', href: '/paid-growth' },
  { icon: BarChart3, title: 'Analytics', copy: 'Know what people find, click and enquire about.', href: '/services#analytics' },
  { icon: Target, title: 'CRO improvements', copy: 'Refine the content, forms and page journeys that turn visits into enquiries.', href: '/services#cro', variant: 'cro' },
  { icon: Workflow, title: 'AI workflow automation', copy: 'Reduce repetitive admin with practical, human-reviewed AI-assisted workflows.', href: '/services#ai-automation', variant: 'ai' },
  { icon: ShieldCheck, title: 'Conversion tracking', copy: 'Measure the enquiries that matter, then improve the journey.', href: '/services#analytics', variant: 'tracking' },
];

export function HomeServices() {
  return <div className="service-grid home-services" data-home-reveal>
    {services.map((service, index) => <Link className={`service-tile${service.variant ? ` service-tile--${service.variant}` : ''}`} href={service.href} key={service.title}>
      <span className="tile-icon"><service.icon size={20} aria-hidden="true" /></span>
      <ArrowUpRight size={18} className="tile-arrow" aria-hidden="true" />
      <span className="tile-index">{String(index + 1).padStart(2, '0')} / 10</span>
      <h3>{service.title}</h3><p>{service.copy}</p>
    </Link>)}
  </div>;
}
