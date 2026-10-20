import type { Metadata } from 'next';
import { PackagesSection } from '@/components/packages-section';
import { PageHero } from '@/components/page-shell';
import { Check, Minus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Packages',
  description: 'Explore Website + SEO, Advanced Growth and Growth Plus support from Organic Reach HUB. Ask us which package fits your business.',
  alternates: { canonical: '/packages' },
};

export default function PackagesPage() {
  const rows = [
    ['Website care and monitoring', true, true, true],
    ['Technical, on-page and local SEO', true, true, true],
    ['Up to three small website changes', true, true, true],
    ['Google Ads or Meta Ads management', false, true, true],
    ['One landing-page optimisation monthly', false, true, true],
    ['Ongoing CRO reviews', false, false, true],
    ['Scoped AI workflow automation', false, false, true],
  ] as const;
  return <><PageHero eyebrow="Our packages" title="Your website and growth, looked after." copy="Choose the level of ongoing support that fits where your business is now. We’ll confirm the precise scope, access and commercial terms before work begins." /><PackagesSection />
    <section className="section package-comparison"><div className="container"><div className="section-head"><div><span className="eyebrow">Compare the scope</span><h2 className="heading">See where each package goes further.</h2></div><p className="muted">A tick means the work is included within the agreed monthly priorities. It does not mean unlimited requests or major development.</p></div><div className="table-scroll" tabIndex={0}><table><caption className="sr-only">Package deliverables comparison</caption><thead><tr><th scope="col">Deliverable</th><th scope="col">Website + SEO</th><th scope="col">Advanced Growth</th><th scope="col">Growth Plus</th></tr></thead><tbody>{rows.map(([label,...values])=><tr key={label}><th scope="row">{label}</th>{values.map((included,index)=><td key={index}><span className="sr-only">{included?'Included':'Not included'}</span>{included?<Check aria-hidden="true"/>:<Minus aria-hidden="true"/>}</td>)}</tr>)}</tbody></table></div></div></section>
    <section className="section scope-section"><div className="container content-grid"><div><span className="eyebrow">Scope in plain English</span><h2 className="heading">What “small changes” means.</h2><p className="muted">A small change is a contained update to an existing page: a copy edit, image replacement, CTA adjustment or minor layout refinement. New templates, major redesigns, integrations and custom features are assessed and quoted separately.</p></div><div className="flow-card good"><h3>Advertising management is not advertising spend.</h3><p>Advanced Growth and Growth Plus can include management of one agreed platform. The media budget is paid by you directly to Google or Meta and stays under your control.</p></div></div></section>
    <section className="section process-section"><div className="container"><div className="section-head"><div><span className="eyebrow">Onboarding</span><h2 className="heading">A considered start, not a rushed handover.</h2></div></div><div className="process-grid"><article><span>01</span><h3>Review and fit</h3><p>We review the site, current tools, goals and access before confirming the right package.</p></article><article><span>02</span><h3>Scope and access</h3><p>Responsibilities, priorities, account ownership and any exclusions are documented.</p></article><article><span>03</span><h3>First-month plan</h3><p>We address urgent risks, establish measurement and agree the first useful improvements.</p></article></div></div></section>
  </>;
}
