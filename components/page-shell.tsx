import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteUrl } from '@/lib/site';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  actions?: boolean;
  compact?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageHero({ eyebrow, title, copy, actions = true, compact = false, secondaryHref = '/services', secondaryLabel = 'Explore services' }: PageHeroProps) {
  return <section className={`page-hero editorial-hero${compact ? ' editorial-hero-compact' : ''}`}>
    <div className="container editorial-hero-grid">
      <div className="editorial-hero-main">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display">{title}</h1>
        <div className="editorial-hero-bottom">
          <p className="muted">{copy}</p>
          {actions && <div className="hero-actions"><Link className="btn btn-dark" href="/free-website-review">Get your free website review <ArrowUpRight size={16} aria-hidden="true" /></Link><Link className="editorial-text-link" href={secondaryHref}>{secondaryLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link></div>}
        </div>
      </div>
      <div className="editorial-hero-aside" aria-hidden="true">
        <div className="editorial-hero-aside-top"><span>ORH / FIELD NOTES</span><span>01—03</span></div>
        <div className="editorial-hero-symbol"><span className="editorial-hero-symbol-inner">O<span>R</span>H</span><i /><i /></div>
        <div className="editorial-hero-aside-bottom"><span>WEBSITE<br />SEARCH<br />GROWTH</span><span>ONE PARTNER.<br />EVERY MONTH.</span></div>
      </div>
    </div>
  </section>;
}

export function FeatureSection({ eyebrow, title, intro, items }: { eyebrow: string; title: string; intro: string; items: { title: string; copy: string }[] }) {
  return <section className="section feature-section">
    <div className="container feature-section-grid">
      <div className="feature-intro"><span className="eyebrow">{eyebrow}</span><h2 className="heading">{title}</h2><p className="muted">{intro}</p></div>
      <div className="feature-list">{items.map((item, index) => <div className="feature-row" key={item.title}><span className="feature-index">{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></div>)}</div>
    </div>
  </section>;
}

export function BottomCta({ title = 'Let’s see what your website needs next.' }: { title?: string }) {
  return <section className="section bottom-cta"><div className="container bottom-cta-inner"><div><span className="eyebrow">A useful first step</span><h2 className="heading">{title}</h2></div><Link className="btn btn-dark" href="/free-website-review">Request a free review <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>;
}

export function ServiceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  const graph = [
    { '@context': 'https://schema.org', '@type': 'Service', name, description, provider: { '@type': 'Organization', name: 'Organic Reach HUB', url: siteUrl }, url: `${siteUrl}${path}`, areaServed: ['GB', 'US'] },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name, item: `${siteUrl}${path}` },
    ] },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
