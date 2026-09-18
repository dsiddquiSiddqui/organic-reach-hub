const stages = [
  ['01', 'Monitor', 'Keep the foundations healthy.'],
  ['02', 'Improve', 'Make the next useful change.'],
  ['03', 'Measure', 'See what visitors actually do.'],
  ['04', 'Repeat', 'Use what we learn next month.'],
];

export function MomentumStrip() {
  return <section className="momentum-section" aria-label="Our continuous improvement cycle">
    <div className="container momentum-inner" data-home-reveal>
      <div className="momentum-intro"><span className="eyebrow">The monthly rhythm</span><h2 className="heading">Growth is a<br /><em>working habit.</em></h2><p>Good websites are tended, tested and improved. The work connects from one month to the next.</p></div>
      <div className="momentum-track"><div className="momentum-progress" aria-hidden="true" />{stages.map(([number, title, copy]) => <div className="momentum-stage" key={number}><span className="momentum-index">{number}</span><span className="momentum-dot" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </div>
  </section>;
}
