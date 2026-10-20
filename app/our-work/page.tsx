import type { Metadata } from 'next';
import { PageHero, BottomCta } from '@/components/page-shell';
import { PortfolioGrid } from '@/components/trust-content';
import { getPublishedProjects } from '@/lib/portfolio.server';

export const metadata: Metadata = {
  title: 'Our Work & Digital Portfolio',
  description: 'Explore selected website development and creative projects from the experience behind Organic Reach HUB, including historical work through Agile Digital Technologies.',
  alternates: { canonical: '/our-work' },
  openGraph: { title: 'Our Work & Digital Portfolio | Organic Reach HUB', description: 'Selected historical digital work, clearly attributed and published only after verification.', url: '/our-work' },
};

export default function OurWorkPage() {
  const projects = getPublishedProjects();
  return <><PageHero eyebrow="Selected experience" title="Selected Work & Digital Experience" copy="Explore approved website development and creative projects delivered through Agile Digital Technologies, the agency connected to Organic Reach HUB through shared ownership." actions={false}/><section className="portfolio-disclosure"><div className="container"><strong>Clear attribution</strong><p>These examples represent historical agency work and are not presented as projects commissioned from Organic Reach HUB.</p></div></section><section className="section"><div className="container"><PortfolioGrid projects={projects}/></div></section><BottomCta title="Need reliable support for your business website?"/></>;
}
