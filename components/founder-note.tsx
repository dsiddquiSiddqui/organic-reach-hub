import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function FounderNote({ full = false }: { full?: boolean }) {
  return <section className={`section founder-note${full ? ' founder-note--full' : ''}`}>
    <div className="container founder-note-grid">
      <div className="founder-note-mark" aria-hidden="true"><span>ORH</span><small>FOUNDER NOTE</small></div>
      <div className="founder-note-copy">
        <span className="eyebrow">A note from the founder</span>
        <h2 className="heading">Modern capability should still feel personal.</h2>
        <div className="founder-letter">
          <p>I created Organic Reach HUB after seeing businesses invest in a website and then get left to coordinate everything that came next. Small changes waited. SEO sat apart from the website. Advertising sent people to pages that were not ready to convert. Data existed, but nobody turned it into a useful next decision.</p>
          {full && <p>Business owners should not have to chase a developer, an SEO provider, a designer and an advertising specialist just to keep moving. The idea behind Organic Reach HUB is simpler: one accountable partner who understands the website, the marketing and the commercial goal connecting them.</p>}
          <p>AI gives us better ways to analyse, automate and move faster, but it does not replace judgement, care or a real conversation. We use it where it removes repetitive work or reveals a useful opportunity. Important decisions and everything we publish remain human reviewed.</p>
          <p>Our aim is to make your digital presence easier to manage, more useful to your customers and better prepared for what comes next.</p>
        </div>
        <div className="founder-signoff"><span><Sparkles size={16} aria-hidden="true"/>Founder</span><strong>Organic Reach HUB</strong></div>
        {!full && <Link className="editorial-text-link" href="/about">Read why we built Organic Reach HUB <ArrowUpRight size={15} aria-hidden="true"/></Link>}
      </div>
    </div>
  </section>;
}

export function HumanLedAi() {
  const items = [
    ['Find the signal', 'Use search, website and campaign data to identify the next useful action rather than producing more noise.'],
    ['Remove repetitive work', 'Design practical automations for reporting, enquiry handling and routine operational steps.'],
    ['Keep people in control', 'Apply human review to recommendations, customer communication and anything published in your name.'],
  ];
  return <section className="section human-ai-section"><div className="container human-ai-grid">
    <div className="human-ai-intro"><span className="eyebrow">Built for the AI age</span><h2 className="heading">Human-led growth.<br/><em>Strengthened by AI.</em></h2><p>We do not add AI because it sounds impressive. We use it when it can save time, improve visibility or help your team make a better decision—within a workflow that remains understandable and accountable.</p><Link className="btn btn-light" href="/ai-workflow-automation">Explore responsible AI automation <ArrowUpRight size={15} aria-hidden="true"/></Link></div>
    <div className="human-ai-list">{items.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
  </div></section>;
}
