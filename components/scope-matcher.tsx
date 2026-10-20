'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

type Answer = { label: string; value: string; scores: [number, number, number] };
type Question = { title: string; help: string; answers: Answer[] };

const questions: Question[] = [
  { title: 'What needs the most attention?', help: 'Choose the area creating the biggest obstacle today.', answers: [
    { label: 'Website upkeep and small changes', value: 'website-care', scores: [4, 1, 0] },
    { label: 'Search visibility and local discovery', value: 'seo', scores: [4, 2, 1] },
    { label: 'More qualified enquiries from advertising', value: 'ads', scores: [0, 5, 2] },
    { label: 'Conversion, reporting and connected growth', value: 'growth', scores: [0, 2, 5] },
  ]},
  { title: 'How often does your website need attention?', help: 'Think about the changes you currently postpone or handle inconsistently.', answers: [
    { label: 'A few focused changes each month', value: 'few-changes', scores: [4, 2, 1] },
    { label: 'Frequent landing-page or campaign changes', value: 'frequent-changes', scores: [1, 5, 3] },
    { label: 'Ongoing testing across several journeys', value: 'continuous-testing', scores: [0, 2, 5] },
  ]},
  { title: 'Are you actively using paid advertising?', help: 'Advertising spend is always separate from management.', answers: [
    { label: 'No—website and organic search come first', value: 'no-ads', scores: [5, 0, 0] },
    { label: 'Yes—Google Ads or Meta Ads', value: 'one-channel', scores: [0, 5, 2] },
    { label: 'Yes—and we need a more connected system', value: 'connected-ads', scores: [0, 2, 5] },
  ]},
  { title: 'What would make the biggest operational difference?', help: 'Your answer helps us separate marketing support from workflow work.', answers: [
    { label: 'A dependable website and clearer search plan', value: 'dependable', scores: [5, 1, 0] },
    { label: 'Better campaign and conversion visibility', value: 'visibility', scores: [1, 5, 2] },
    { label: 'Less repetitive admin through sensible automation', value: 'automation', scores: [0, 1, 6] },
  ]},
];

const packages = [
  { name: 'Website + SEO', slug: 'website-seo', summary: 'The strongest fit when website reliability, useful monthly changes and organic visibility are the immediate priorities.', points: ['Website care and monitoring', 'SEO foundations and page improvements', 'Up to three small website changes each month'] },
  { name: 'Advanced Growth', slug: 'advanced-growth', summary: 'A good fit when you need the website and SEO foundations plus active management of one paid acquisition channel.', points: ['Everything in Website + SEO', 'Google Ads or Meta Ads management', 'Campaign tracking and landing-page optimisation'] },
  { name: 'Growth Plus', slug: 'growth-plus', summary: 'Designed for businesses connecting acquisition, conversion, reporting and practical AI-enabled workflows.', points: ['Everything in Advanced Growth', 'Ongoing conversion improvement', 'Scoped AI workflow automation and joined-up reporting'] },
];

export function ScopeMatcher() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const finished = answers.length === questions.length;
  const totals = answers.reduce((sum, answer) => sum.map((value, index) => value + answer.scores[index]) as [number, number, number], [0, 0, 0] as [number, number, number]);
  const recommendation = packages[totals.indexOf(Math.max(...totals))];
  const choose = (answer: Answer) => {
    const next = [...answers.slice(0, step), answer];
    setAnswers(next);
    setStep(Math.min(step + 1, questions.length));
  };
  const reset = () => { setAnswers([]); setStep(0); };
  const brief = encodeURIComponent(answers.map((answer) => answer.label).join(' | '));

  return <section className="section scope-matcher-section" id="scope-matcher"><div className="container scope-matcher-shell">
    <div className="scope-matcher-intro"><span className="eyebrow">Interactive scope matcher</span><h2 className="heading">Which support model fits your next stage?</h2><p>Answer four practical questions. We will suggest a starting point—not an automated quote or a binding scope.</p><div className="matcher-progress" aria-label={`Question ${Math.min(step + 1, questions.length)} of ${questions.length}`}>{questions.map((_, index) => <span className={index < answers.length ? 'is-complete' : index === step ? 'is-current' : ''} key={index}/>)}</div></div>
    <div className="scope-matcher-card" aria-live="polite">
      {!finished ? <>
        <span className="matcher-count">Question {step + 1} / {questions.length}</span>
        <h3>{questions[step].title}</h3><p>{questions[step].help}</p>
        <div className="matcher-options">{questions[step].answers.map((answer) => <button type="button" onClick={() => choose(answer)} key={answer.value}><span>{answer.label}</span><ArrowRight size={17} aria-hidden="true"/></button>)}</div>
        {step > 0 && <button className="matcher-back" type="button" onClick={() => { setAnswers(answers.slice(0, -1)); setStep(step - 1); }}><ArrowLeft size={15} aria-hidden="true"/>Previous question</button>}
      </> : <div className="matcher-result">
        <span className="eyebrow">Suggested starting point</span><h3>{recommendation.name}</h3><p>{recommendation.summary}</p>
        <ul>{recommendation.points.map((point) => <li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul>
        <p className="matcher-boundary">Final scope depends on your website, access, goals and available evidence. Advertising spend and larger development work are separate.</p>
        <div className="matcher-actions"><Link className="btn btn-dark" href={`/contact?package=${recommendation.slug}&brief=${brief}`}>Discuss this recommendation <ArrowRight size={16} aria-hidden="true"/></Link><button type="button" onClick={reset}><RotateCcw size={15} aria-hidden="true"/>Start again</button></div>
      </div>}
    </div>
  </div></section>;
}
