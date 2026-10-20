import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, FeatureSection, BottomCta } from '@/components/page-shell';
import { PortfolioGrid } from '@/components/trust-content';
import { getPublishedProjects } from '@/lib/portfolio.server';
import { ClientLogoWall } from '@/components/client-logo-wall';
import { FounderNote, HumanLedAi } from '@/components/founder-note';

export const metadata:Metadata={title:'About Organic Reach HUB',description:'Meet the thinking behind Organic Reach HUB: human-led website, SEO and digital growth support strengthened by responsible AI.',alternates:{canonical:'/about'},openGraph:{title:'About Organic Reach HUB',description:'A personal, practical approach to ongoing website, SEO and digital growth support.',url:'/about'}};

export default function Page(){
  const projects=getPublishedProjects().slice(0,3);
  return <>
    <PageHero eyebrow="About Organic Reach HUB" title="A fresh approach, built on real digital experience." copy="Organic Reach HUB brings together website management, SEO and digital growth in one ongoing service, built on practical experience from the digital agency world." secondaryHref="/our-work" secondaryLabel="View our previous work"/>
    <section className="section about-story"><div className="container content-grid"><div><span className="eyebrow">Our story</span><h2 className="heading">A website launch is only the beginning.</h2></div><div className="long-copy"><p>Organic Reach HUB was created to help businesses move beyond one-off website projects.</p><p>Through experience in website development and digital marketing, we recognised that launching a website is only the beginning. Businesses also need reliable technical support, consistent improvements and a clear plan for reaching customers.</p><p>Our focus is to make that ongoing work simpler, more transparent and better connected to business goals.</p></div></div></section>
    <FounderNote full/>
    <section className="section background-panel"><div className="container content-grid"><div><span className="eyebrow">Our approach</span><h2 className="heading">Experience without the agency maze.</h2></div><div className="long-copy"><p>We bring website, search, conversion and digital operations into one practical working relationship. That means fewer handovers, clearer priorities and somebody accountable for understanding how the pieces affect one another.</p><p>The projects in our work archive demonstrate approved previous experience. They are not presented as current retained clients, and we do not attach performance claims where the evidence is unavailable.</p><Link className="editorial-text-link" href="/our-work">View our previous work <ArrowUpRight size={15} aria-hidden="true"/></Link></div></div></section>
    {projects.length>0&&<section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Previous experience</span><h2 className="heading">Experience behind the work.</h2></div></div><PortfolioGrid projects={projects}/></div></section>}
    <FeatureSection eyebrow="How we work" title="Useful work beats busy work." intro="The relationship is designed around understandable priorities, accountable delivery and steady improvement." items={[{title:'Clear communication',copy:'A direct point of contact and straightforward discussion about priorities, trade-offs and next steps.'},{title:'Practical solutions',copy:'Work is shaped around the website, available evidence and the needs of the business.'},{title:'Continuous improvement',copy:'Each cycle should leave the website more dependable, discoverable or easier to use.'},{title:'Transparent reporting',copy:'Know what changed, why it mattered and which decisions need attention next.'}]}/>
    <HumanLedAi/>
    <ClientLogoWall compact/>
    <BottomCta title="Let’s see where your website can improve."/>
  </>;
}
