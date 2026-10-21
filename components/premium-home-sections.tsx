import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Bot, ChartNoAxesCombined, Search, Wrench } from 'lucide-react';
import { clientLogos } from '@/lib/client-logos';
import { getPublishedProjects } from '@/lib/portfolio.server';

const pathways = [
  { number: '01', title: 'Look after my website', copy: 'Keep it secure, current and improving without chasing a developer for every change.', href: '/website-management', icon: Wrench },
  { number: '02', title: 'Help customers find me', copy: 'Strengthen the technical foundations and pages that support useful search visibility.', href: '/seo', icon: Search },
  { number: '03', title: 'Turn more visits into enquiries', copy: 'Clarify the message, reduce friction and measure the actions that matter to the business.', href: '/conversion-rate-optimisation', icon: ChartNoAxesCombined },
  { number: '04', title: 'Automate repetitive work', copy: 'Use practical, human-reviewed AI workflows to give your team back useful time.', href: '/ai-workflow-automation', icon: Bot },
];

export function PremiumHero() {
  return <section className="premium-hero"><div className="container premium-hero-grid">
    <div className="premium-hero-copy">
      <span className="eyebrow">A hands-on digital partner for growing businesses</span>
      <h1>A better website.<br/>A clearer growth plan.<br/><em>One partner accountable.</em></h1>
      <p>I help businesses look after their websites, become easier to find and use smarter systems to turn more digital activity into meaningful enquiries.</p>
      <div className="hero-actions"><Link className="btn btn-dark" href="#digital-diagnosis">Show me what to improve <ArrowDownRight size={17} aria-hidden="true"/></Link><Link className="premium-text-link" href="#ways-to-help">See how I can help <ArrowDownRight size={16} aria-hidden="true"/></Link></div>
      <div className="premium-hero-promise"><span>Website</span><i/><span>Search</span><i/><span>Conversion</span><i/><span>Responsible AI</span></div>
    </div>
    <div className="premium-hero-journal" aria-label="Founder perspective">
      <div className="journal-top"><span>FROM THE FOUNDER’S DESK</span><span>ORH / 01</span></div>
      <div className="journal-orbit" aria-hidden="true"><span>ORH</span><i/><i/><i/></div>
      <blockquote>“Your website should not become another part of the business that only gets attention when something breaks.”</blockquote>
      <p>Organic Reach HUB was created to connect the website, the marketing and the commercial goal behind both.</p>
      <div className="journal-signature"><span>Founder</span><strong>Organic Reach HUB</strong></div>
    </div>
  </div><span className="growth-thread growth-thread-one" aria-hidden="true"/></section>;
}

export function CuratedCredibility() {
  const logos = clientLogos.filter((logo) => logo.featured).slice(0, 8);
  return <section className="premium-credibility"><div className="container">
    <div className="premium-credibility-copy"><span className="eyebrow">Experience across real organisations</span><p>Previous work spanning retail, education, professional services and ecommerce. Selected here to show breadth—not to imply a current retained relationship.</p><Link href="/our-work">See the work behind the business <ArrowUpRight size={14} aria-hidden="true"/></Link></div>
    <div className="premium-logo-row">{logos.map((logo) => <div key={logo.src}><Image src={logo.src} alt={`${logo.name} logo`} fill sizes="(max-width: 640px) 50vw, 12vw"/></div>)}</div>
  </div></section>;
}

export function GoalPathways() {
  return <section className="section premium-pathways" id="ways-to-help"><div className="container">
    <div className="premium-section-heading"><div><span className="eyebrow">Start with the outcome</span><h2>How can I help?</h2></div><p>You do not need to diagnose whether the answer is technical SEO, CRO or a particular tool. Start with what is getting in the way.</p></div>
    <div className="pathway-list">{pathways.map(({ icon: Icon, ...item }) => <Link href={item.href} key={item.number} className="pathway-row"><span className="pathway-number">{item.number}</span><span className="pathway-icon"><Icon size={21} aria-hidden="true"/></span><span className="pathway-copy"><strong>{item.title}</strong><small>{item.copy}</small></span><ArrowUpRight className="pathway-arrow" size={24} aria-hidden="true"/></Link>)}</div>
  </div></section>;
}

export function FounderStoryPreview() {
  return <section className="section premium-founder"><div className="container premium-founder-grid">
    <div className="premium-founder-panel" aria-hidden="true"><span className="founder-panel-label">WHY THIS EXISTS</span><strong>Better digital work starts when someone owns the whole picture.</strong><div className="founder-panel-notes"><span>01 / Clear priorities</span><span>02 / Direct communication</span><span>03 / Consistent progress</span></div></div>
    <div className="premium-founder-copy"><span className="eyebrow">A note from the founder</span><h2>I built the service I wanted businesses to have after launch.</h2><p>Too many owners end up coordinating a developer, an SEO provider and an advertising specialist themselves. Small changes wait, useful data gets ignored and nobody is accountable for how the pieces work together.</p><p>Organic Reach HUB gives that responsibility a home. The work is practical, the priorities are visible and important decisions remain human—even when AI helps us move faster.</p><div className="founder-signature-line"><span>Founder</span><strong>Organic Reach HUB</strong></div><Link className="premium-text-link" href="/about">Read the full story <ArrowUpRight size={15} aria-hidden="true"/></Link></div>
  </div><span className="growth-thread growth-thread-two" aria-hidden="true"/></section>;
}

const method = [
  ['Stabilise', 'Fix the risks, access gaps and reliability issues that undermine everything else.'],
  ['Be found', 'Improve the technical and content signals that help the right people discover the business.'],
  ['Make it clear', 'Strengthen the message, trust and journey from first visit to meaningful action.'],
  ['Measure', 'Track useful enquiries and learn which pages and channels contribute to them.'],
  ['Simplify', 'Use responsible automation where it removes repetitive work without removing oversight.'],
];

export function MomentumMethod() {
  return <section className="section premium-method"><div className="container">
    <div className="premium-method-intro"><span className="eyebrow">Our signature approach</span><h2>The Website<br/><em>Momentum Method.</em></h2><p>A website becomes more valuable when maintenance, visibility and conversion are treated as one continuous discipline—not disconnected projects.</p></div>
    <ol className="premium-method-steps">{method.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
  </div></section>;
}

export function PremiumWorkShowcase() {
  const projects = getPublishedProjects().filter((project) => project.featured).slice(0, 3);
  return <section className="section premium-work"><div className="container">
    <div className="premium-section-heading"><div><span className="eyebrow">Selected previous work</span><h2>Experience you can see.</h2></div><div><p>Real website work, presented without borrowed metrics or inflated claims.</p><Link className="premium-text-link" href="/our-work">Explore all work <ArrowUpRight size={15} aria-hidden="true"/></Link></div></div>
    <div className="premium-work-list">{projects.map((project, index) => { const image = project.images.find((item) => item.publicPath); if (!image) return null; return <Link href={`/our-work/${project.slug}`} className="premium-work-item" key={project.id}><div className="premium-work-image"><Image src={image.publicPath!} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 60vw"/></div><div className="premium-work-meta"><span>0{index + 1} / {project.category}</span><h3>{project.name}</h3><p>{project.summary}</p><strong>View project <ArrowUpRight size={15} aria-hidden="true"/></strong></div></Link>; })}</div>
  </div></section>;
}

export function PremiumAiPositioning() {
  return <section className="section premium-ai"><div className="container premium-ai-grid">
    <div><span className="eyebrow">Built for the AI age</span><h2>AI should give your team more time—not more tools to manage.</h2></div>
    <div className="premium-ai-copy"><p>We use AI to accelerate research, organise information and remove repetitive steps. We do not use it to replace judgement, publish unchecked content or make important customer decisions without oversight.</p><ul><li>Find patterns in website and search data</li><li>Prepare clearer reporting and lead context</li><li>Automate repetitive, well-understood workflows</li><li>Keep people responsible for the final decision</li></ul><Link className="btn btn-light" href="/ai-workflow-automation">Explore responsible AI automation <ArrowUpRight size={15} aria-hidden="true"/></Link></div>
  </div></section>;
}
