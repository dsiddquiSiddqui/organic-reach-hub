import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { faq } from '@/lib/site';

export function HomeFaq() {
  return <section className="section home-faq" aria-labelledby="home-faq-title">
    <div className="container home-faq-layout">
      <div className="home-faq-intro" data-home-reveal>
        <span className="eyebrow">Common questions</span>
        <h2 className="heading" id="home-faq-title">The details,<br /><em>clearly.</em></h2>
        <p>No jargon and no hidden process. Here are the things business owners usually want to know before we work together.</p>
        <Link href="/contact" className="home-faq-link">Still have a question? <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <div className="home-faq-aside" aria-hidden="true"><span>ASK / UNDERSTAND / MOVE FORWARD</span><i /></div>
      </div>
      <div className="home-faq-list" data-home-reveal>
        {faq.map(([question, answer], index) => <details className="home-faq-item" key={question}>
          <summary>
            <span className="home-faq-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="home-faq-question">{question}</span>
            <span className="home-faq-toggle" aria-hidden="true"><i /><i /></span>
          </summary>
          <div className="home-faq-answer"><p>{answer}</p></div>
        </details>)}
      </div>
    </div>
  </section>;
}
