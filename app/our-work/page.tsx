import type { Metadata } from 'next';
import { PageHero, BottomCta } from '@/components/page-shell';
import { PortfolioGrid } from '@/components/trust-content';
import { getPublishedProjects } from '@/lib/portfolio.server';
import { ClientLogoWall } from '@/components/client-logo-wall';

export const metadata: Metadata = {
  title: 'Our Work & Digital Portfolio',
  description: 'Explore selected website projects and approved brand experience behind Organic Reach HUB.',
  alternates: { canonical: '/our-work' },
  openGraph: { title: 'Our Work & Digital Portfolio | Organic Reach HUB', description: 'Selected previous digital work and approved brand experience behind Organic Reach HUB.', url: '/our-work' },
};

export default function OurWorkPage() {
  const projects = getPublishedProjects();
  return <><PageHero eyebrow="Selected experience" title="Selected Work & Digital Experience" copy="Explore approved website projects from relevant professional experience behind Organic Reach HUB." actions={false}/><section className="portfolio-disclosure"><div className="container"><strong>Previous work, presented clearly</strong><p>Selected experience from work delivered through Agile Digital Technologies, a separate business under shared ownership with Organic Reach HUB. We do not present the organisations as current Organic Reach HUB clients or attach results that have not been verified.</p></div></section><section className="section"><div className="container"><PortfolioGrid projects={projects}/></div></section><ClientLogoWall/><BottomCta title="Need reliable support for your business website?"/></>;
}
