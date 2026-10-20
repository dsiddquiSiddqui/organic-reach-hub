import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, Minus } from 'lucide-react';
import { BottomCta, FeatureSection, PageHero, ServiceSchema } from '@/components/page-shell';

export type ServiceLandingData = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  audience: string[];
  problems: { title: string; copy: string }[];
  deliverables: { title: string; copy: string }[];
  process: { title: string; copy: string }[];
  exclusions: string[];
  related: { title: string; href: string; copy: string }[];
  faqs: [string, string][];
};

export function serviceMetadata(data: ServiceLandingData): Metadata {
  return { title: data.title, description: data.description, alternates: { canonical: data.path }, openGraph: { title: data.title, description: data.description, url: data.path }, twitter: { card: 'summary_large_image', title: data.title, description: data.description } };
}

export function ServiceLanding({ data }: { data: ServiceLandingData }) {
  const faqGraph = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
  return <>
    <ServiceSchema name={data.title} description={data.description} path={data.path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqGraph) }} />
    <PageHero eyebrow={data.eyebrow} title={data.title} copy={data.intro} secondaryHref="/packages" secondaryLabel="Compare packages" />
    <section className="section intent-panel"><div className="container content-grid">
      <div><span className="eyebrow">A good fit for</span><h2 className="heading">Practical support for a site that matters to the business.</h2></div>
      <ul className="check-list">{data.audience.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
    </div></section>
    <FeatureSection eyebrow="Problems we solve" title="Remove the issues that quietly hold the site back." intro="We start with the current position, prioritise the work that matters, and avoid change for change’s sake." items={data.problems} />
    <FeatureSection eyebrow="What is included" title="A clear, useful scope." intro="The exact monthly priorities are agreed after we review your website, access and goals." items={data.deliverables} />
    <section className="section process-section"><div className="container"><div className="section-head"><div><span className="eyebrow">How the work runs</span><h2 className="heading">Review. Prioritise. Improve. Explain.</h2></div></div><div className="process-grid">{data.process.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="section scope-section"><div className="container content-grid"><div><span className="eyebrow">Scope boundaries</span><h2 className="heading">Clear before work begins.</h2><p className="muted">These items are not assumed to be included. If one is needed, we will explain why and agree a separate scope first.</p></div><ul className="exclusion-list">{data.exclusions.map(item => <li key={item}><Minus size={17} aria-hidden="true" />{item}</li>)}</ul></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Common questions</span><h2 className="heading">Before we get started.</h2></div></div><div className="faq-list">{data.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="section related-services"><div className="container"><div className="section-head"><div><span className="eyebrow">Connected services</span><h2 className="heading">The next useful layer.</h2></div></div><div className="related-grid">{data.related.map(item => <Link href={item.href} key={item.href}><h3>{item.title}</h3><p>{item.copy}</p><span>Explore service <ArrowUpRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section>
    <BottomCta title={`See whether ${data.title.toLowerCase()} is the right next step.`} />
  </>;
}
