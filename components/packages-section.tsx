import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';

const packages = [
  {
    number: '01',
    name: 'Website + SEO',
    label: 'The essential partnership',
    copy: 'A healthier website, stronger search foundations and useful improvements every month.',
    points: [
      'Website care, updates, backups and monitoring',
      'Technical, on-page and local SEO improvements',
      'Up to three small website changes each month',
      'Proactive improvements and a monthly update',
    ],
    href: '/contact?package=website-seo',
  },
  {
    number: '02',
    name: 'Advanced Growth',
    label: 'For active acquisition',
    copy: 'Everything in Website + SEO, with one paid channel and a sharper route from click to enquiry.',
    points: [
      'Everything in Website + SEO',
      'Google Ads or Meta Ads management',
      'Campaign and conversion tracking optimisation',
      'One landing page optimisation each month',
    ],
    href: '/contact?package=advanced-growth',
  },
  {
    number: '03',
    name: 'Growth Plus',
    label: 'For connected growth',
    copy: 'A more hands-on partnership for businesses ready to connect acquisition, conversion and smarter operations.',
    points: [
      'Everything in Advanced Growth',
      'Ongoing CRO reviews and conversion improvements',
      'Practical AI workflow automation, scoped to your team',
      'Joined-up reporting and a clear growth roadmap',
    ],
    href: '/contact?package=growth-plus',
  },
];

export function PackagesSection({ compact = false }: { compact?: boolean }) {
  return <section className={`section packages-section${compact ? ' packages-section-compact' : ''}`} id="packages">
    <div className="container">
      <div className="section-head" data-home-reveal={compact ? '' : undefined}>
        <div><span className="eyebrow">Ways to work together</span><h2 className="heading">The right support.<br />A clear scope.</h2></div>
        <p className="muted">Three ways to get consistent support, from the essentials to a more connected growth partnership. Tell us what you need and we’ll help find the fit.</p>
      </div>
      <div className="package-grid" data-home-reveal={compact ? '' : undefined}>
        {packages.map((item) => <article className="package-card" key={item.name}>
          <div className="package-card-top"><span className="package-number">{item.number} / 03</span><span className="package-mark" aria-hidden="true">↗</span></div>
          <div><span className="eyebrow">{item.label}</span><h3>{item.name}</h3><p className="package-copy">{item.copy}</p></div>
          <ul>{item.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
          <Link className="package-link" href={item.href}>Ask about {item.name} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <p className="package-footnote">Advertising spend is paid directly to Google or Meta. Larger development projects are scoped separately.</p>
    </div>
  </section>;
}
