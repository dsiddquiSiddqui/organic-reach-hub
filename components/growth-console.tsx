const lanes = [
  { number: '01', title: 'Monitor', detail: 'Catch the small issues early' },
  { number: '02', title: 'Improve', detail: 'Make the next useful change' },
  { number: '03', title: 'Measure', detail: 'See what moves people to act' },
];

export function GrowthConsole() {
  return <div className="console" aria-label="Illustration of our monthly website improvement process">
    <div className="console-top"><span className="dots" aria-hidden="true"><i /><i /><i /></span><span>ORGANIC REACH HUB / THE MONTHLY RHYTHM</span><span>01—03</span></div>
    <div className="console-body">
      <div className="console-title"><div><small>WORK IN MOTION</small><strong>A website that keeps getting better.</strong></div><span className="pill"><i /> ONGOING CARE</span></div>
      <div className="console-flow" aria-hidden="true"><div className="console-flow-line"><i /></div>{lanes.map(lane => <div className="console-lane" key={lane.number}><span>{lane.number}</span><b>{lane.title}</b><small>{lane.detail}</small></div>)}</div>
      <div className="console-worklist"><div><span>WEBSITE</span><strong>Health and upkeep</strong><i>↗</i></div><div><span>SEARCH</span><strong>Visibility and pages</strong><i>↗</i></div><div><span>GROWTH</span><strong>Enquiry journey</strong><i>↗</i></div></div>
    </div>
    <div className="floating-note"><span>YOUR MONTHLY UPDATE</span><b>What changed. What’s next. ↗</b></div>
  </div>;
}
