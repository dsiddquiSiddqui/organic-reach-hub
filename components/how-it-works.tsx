'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BarChart3, Check, KeyRound, ListChecks, Search, Wrench } from 'lucide-react';

const steps = [
  {
    title: 'Free website review',
    summary: 'We look at your site and identify useful priorities.',
    focus: 'See the whole picture.',
    detail: 'We review the site people actually use: its health, search visibility and path to enquiry.',
    output: 'A clear starting point',
    tasks: ['Website health', 'Search visibility', 'Enquiry journey'],
    icon: Search,
  },
  {
    title: 'Agree the right support',
    summary: 'We shape the ongoing work around your website and goals.',
    focus: 'Make a practical plan.',
    detail: 'We agree what needs regular attention and which opportunities are worth tackling first.',
    output: 'A focused scope of work',
    tasks: ['Business priorities', 'Monthly scope', 'First improvements'],
    icon: ListChecks,
  },
  {
    title: 'We take over management',
    summary: 'We agree access, priorities and a working rhythm.',
    focus: 'Hand over with confidence.',
    detail: 'We get the right access, establish the baseline and make sure the essentials are monitored.',
    output: 'One clear point of contact',
    tasks: ['Access and setup', 'Baseline checks', 'Working rhythm'],
    icon: KeyRound,
  },
  {
    title: 'Monthly improvements',
    summary: 'We maintain, optimise and make purposeful changes.',
    focus: 'Keep moving forward.',
    detail: 'Website care, SEO and conversion improvements become a steady part of the month.',
    output: 'Useful work, every month',
    tasks: ['Maintain', 'Optimise', 'Improve'],
    icon: Wrench,
  },
  {
    title: 'Track growth',
    summary: 'You get a clear update on work and progress.',
    focus: 'Know what changed.',
    detail: 'We share what was done, what the data tells us and the next useful priority.',
    output: 'A clear monthly update',
    tasks: ['Work completed', 'What we learned', 'Next priority'],
    icon: BarChart3,
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); };
  }, []);

  const playing = visible && !reducedMotion && !manual;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % steps.length), 4800);
    return () => window.clearInterval(timer);
  }, [playing]);

  const step = steps[active];
  const Icon = step.icon;

  return <section className="section process-section" ref={sectionRef} aria-labelledby="process-title">
    <div className="container">
      <div className="process-heading" data-home-reveal>
        <div><span className="eyebrow">How it works</span><h2 className="heading" id="process-title">A straightforward way<br /><em>forward.</em></h2></div>
        <div className="process-heading-aside"><span>01 — 05</span><p>A useful first look becomes a steady working partnership. Select a step to see what happens.</p></div>
      </div>

      <div className={`process-layout${playing ? ' is-playing' : ''}`}>
        <nav className="process-nav" aria-label="Our process steps">
          {steps.map((item, index) => <button
            className={`process-step${active === index ? ' is-active' : ''}`}
            type="button"
            aria-pressed={active === index}
            onClick={() => { setManual(true); setActive(index); }}
            key={item.title}
          >
            <span className="process-step-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="process-step-copy"><strong>{item.title}</strong><small>{item.summary}</small></span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>)}
        </nav>

        <div className="process-panel">
          <div className="process-panel-top"><span className="eyebrow">Inside the process</span><span className="process-counter">{String(active + 1).padStart(2, '0')} <span>/ 05</span></span></div>
          <div className="process-panel-content" key={active}>
            <div className="process-focus-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
            <h3>{step.focus}</h3>
            <p>{step.detail}</p>
            <div className="process-preview" aria-label={`Example focus areas for ${step.title}`}>
              <div className="process-preview-top"><span className="process-preview-dots"><i /><i /><i /></span><span>ORGANIC REACH HUB / WORKFLOW</span><span>0{active + 1}</span></div>
              <div className="process-preview-body"><span className="process-preview-label">THIS STEP</span><strong>{step.output}</strong><div className="process-task-list">{step.tasks.map((task, index) => <span key={task}><Check size={14} aria-hidden="true" /><span>{task}</span><small>0{index + 1}</small></span>)}</div></div>
            </div>
          </div>
          <div className="process-progress" aria-hidden="true">{steps.map((item, index) => <span className={`${index < active ? 'is-complete' : index === active ? 'is-current' : ''}`} key={item.title}><i key={`${active}-${index}`} /></span>)}</div>
        </div>
      </div>
    </div>
  </section>;
}
