// M3A2 — System concept, three scenarios, and a labeled concept diagram for PD-RPM.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ---------------------------------------------------------------- diagram ----
const IN = { fill: '#eaf1fa', stroke: '#24405c', title: '#14233a', sub: '#33465e' };
const EX = { fill: '#f4f4f4', stroke: '#8a8a8a', title: '#444444', sub: '#555555' };

function box(x, y, w, h, title, subs = [], ext = false, ts = 20, ss = 16.5) {
  const c = ext ? EX : IN;
  const cx = x + w / 2;
  const lead = ss + 4.5;
  const totalH = ts + subs.length * lead;
  const ty = y + (h - totalH) / 2 + ts * 0.8;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c.fill}" ` +
            `stroke="${c.stroke}" stroke-width="1.6"${ext ? ' stroke-dasharray="7 4"' : ''}/>`;
  out += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="${ts}" font-weight="bold" ` +
         `fill="${c.title}">${esc(title)}</text>`;
  subs.forEach((t, i) => {
    out += `<text x="${cx}" y="${ty + ts * 0.95 + i * lead}" text-anchor="middle" font-size="${ss}" ` +
           `fill="${c.sub}">${esc(t)}</text>`;
  });
  return out;
}

const grp = (x, y, w, h, label, dx = 10) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="none" stroke="#7a8da0" ` +
  `stroke-width="1.3" stroke-dasharray="4 4"/>` +
  `<text x="${x + dx}" y="${y + 24}" font-size="18" font-weight="bold" fill="#41566b" ` +
  `letter-spacing="0.5">${esc(label)}</text>`;

const arrow = (pts, opt = {}) =>
  `<polyline points="${pts}" fill="none" stroke="${opt.stroke || '#24405c'}" ` +
  `stroke-width="${opt.w || 1.8}"${opt.dash ? ` stroke-dasharray="${opt.dash}"` : ''} ` +
  `marker-end="url(#ah)"${opt.both ? ' marker-start="url(#ahs)"' : ''}/>`;

const lbl = (x, y, t, anchor = 'middle', italic = false) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="16" fill="#2f3f52"` +
  `${italic ? ' font-style="italic"' : ''}>${esc(t)}</text>`;

const svg = `<svg viewBox="0 0 1010 640" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs>
  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker>
  <marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker>
  <marker id="ahf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8c4a1f"/></marker>
</defs>

<!-- tier 1: the home -->
${grp(60, 46, 880, 188, 'PATIENT HOME')}
${box(80, 82, 255, 60, 'A1  PD Cycler', ['volumes, UF, alarms'], true)}
${box(372, 82, 255, 60, 'A2  Vitals Peripherals', ['BP cuff, scale'])}
${box(665, 82, 255, 60, 'A3  Patient App', ['daily symptom & exit-site'])}
${box(80, 166, 840, 46, 'A4  Home Gateway \u2014 store-and-forward buffer', [])}
${arrow('207,142 207,164')}
${arrow('500,142 500,164')}
${arrow('792,142 792,164')}

<!-- tier 2: transport and the EHR interface -->
${box(80, 272, 840, 46, 'T1  Secure Transport \u2014 TLS over broadband or cellular', [])}
${box(840, 392, 150, 70, 'T2  EHR', ['HL7/FHIR', '(external)'], true)}
${arrow('134,214 134,270')}
${arrow('134,320 134,398')}
${arrow('838,427 804,427', { both: true })}

<!-- tier 3: the monitoring center -->
${grp(60, 368, 740, 120, 'MONITORING CENTER', 165)}
${box(69, 402, 130, 70, 'M1', ['Data Ingestion', 'normalization'], false, 20, 15)}
${box(217, 402, 130, 70, 'M2', ['Trending &', 'Analytics'], false, 20, 15)}
${box(365, 402, 130, 70, 'M3', ['Alert Logic', 'thresholds'], false, 20, 15)}
${box(513, 402, 130, 70, 'M4', ['Triage Queue', 'dashboard'], false, 20, 15)}
${box(661, 402, 130, 70, 'M5', ['Escalation', 'paging'], false, 20, 15)}
${arrow('199,437 215,437')}${arrow('347,437 363,437')}
${arrow('495,437 511,437')}${arrow('643,437 659,437')}

<!-- tier 4: the care team -->
${grp(60, 526, 880, 96, 'CARE TEAM')}
${box(85, 558, 265, 52, 'U1  Home Dialysis Nurse', [])}
${box(368, 558, 265, 52, 'U2  Nephrologist', [])}
${box(651, 558, 265, 52, 'U3  Home Program', ['& Dialysis Center'], false, 20, 15)}
${arrow('578,472 578,524')}
${arrow('726,472 726,524')}
<polyline points="200,524 200,490" fill="none" stroke="#8c4a1f" stroke-width="1.8"
  stroke-dasharray="7 4" marker-end="url(#ahf)"/>

${lbl(150, 248, 'within 30 min of session end', 'start', true)}
${lbl(742, 513, 'views, alerts, and pages', 'start')}
<text x="216" y="513" font-size="16" fill="#8c4a1f">prescription change recorded → M2</text>
</svg>`;

// ------------------------------------------------------------------ prose ----
const CONCEPT = [
  '**The concept.** PD-RPM is a monitoring and decision-support layer wrapped around therapy the patient ' +
  'already performs at home. It does not dialyze anyone and it does not control the cycler. It observes each ' +
  'completed treatment, adds the two things the cycler cannot see — the patient’s vitals and the patient’s ' +
  'symptoms — and delivers a reviewed signal to the person able to act on it. The diagram below shows the four ' +
  'functional blocks and the boundary. Home acquisition (A1–A4) captures data; transport (T1) moves it; the ' +
  'monitoring center (M1–M5) turns readings into a ranked queue and, when warranted, a page; the care team ' +
  '(U1–U3) decides.',

  '**The commitment the diagram makes.** No automated element crosses into clinical decision-making. M3 may ' +
  'flag and M5 may escalate, but every path terminates at a human, and the only arrow returning into the ' +
  'system carries a decision a clinician already made. Gray dashed elements lie outside the boundary: PD-RPM ' +
  'defines an interface to the cycler and the EHR but builds neither.',
];

const LANES = [
  ['① Declining ultrafiltration',
   'A1 → A4 → T1 → M1 → M2 → M3 → M4 → U1 → U2 → M2'],
  ['② Early peritonitis',
   'A3 → A4 → T1 → M1 → M2 → M3 → M4 → M5 → U1 → U3'],
  ['③ Supply shortfall',
   'A1 → A4 → T1 → M1 → M2 → M3 → M4 → M5 → U3'],
];

const SCENARIOS = [
  '**① A declining ultrafiltration trend.** A 58-year-old man, fourteen months on automated PD, works ' +
  'full time, comfortable with a smartphone, living alone in a suburb with reliable broadband and no care ' +
  'partner. Over three weeks his net ultrafiltration drifts downward without any single night looking ' +
  'abnormal. A1 reports fill and drain volumes nightly, A4 forwards them through T1, M1 normalizes them, and ' +
  'M2 finds the seven-day mean twenty-four percent below the thirty-day mean. M3 raises a non-urgent flag, M4 ' +
  'places it in the nurse’s queue, and the nephrologist shortens the dwell. That change is recorded back into ' +
  'M2 so the following fourteen days can be judged against it rather than against memory.',

  '**② Early peritonitis.** A 71-year-old woman, four months on continuous ambulatory PD, mild cognitive ' +
  'impairment, her daughter as care partner, a rural home on cellular service only. She reports cloudy ' +
  'effluent and abdominal discomfort on the daily sixty-second check in A3. Coverage is out that evening, so ' +
  'A4 buffers and forwards when the link returns. M1 ingests the entry, M3 recognizes a positive peritonitis ' +
  'screen and marks it urgent, which promotes it to the head of the M4 queue and triggers M5 to page the ' +
  'on-call nurse within fifteen minutes. U3 brings her in for an effluent cell count the same day. The value ' +
  'delivered here is lead time, not data.',

  '**③ A supply shortfall.** A 44-year-old man, three years on automated PD, spouse as care partner, a ' +
  'fourth-floor urban apartment with storage for roughly two weeks of solution. He does nothing at all in ' +
  'this scenario, which is the point. A1 reports cassette and bag consumption with each session, M1 ' +
  'normalizes it, and M2 projects days of supply remaining from observed consumption rather than from order ' +
  'history. When the projection falls below fourteen days the supply rule in M3 fires and M5 notifies the ' +
  'home program, which ships early. ' +
  'Because the projection follows what was used rather than what was ordered, it does not inherit the ' +
  'ordering distortions examined in Module 2.',

  '**Coverage.** Together the three scenarios exercise every operational need from M3A1: ON-1 and ON-4 in the ' +
  'first, ON-3 in the second, ON-5 in the third, and ON-2 throughout, since no path asks the patient for more ' +
  'than a sixty-second check.',
];

const words = CONCEPT.concat(SCENARIOS).join(' ').replace(/\*\*/g, '').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.8in 0.9in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 8pt; }
  p { text-align: justify; margin: 0; line-height: 1.95; text-indent: 0.3in; }
  .fig { margin: 7pt 0 3pt; text-align: center; }
  .fig svg { width: 90%; }
  .cap { font-size: 9.5pt; text-align: center; margin: 0 0 4pt; text-indent: 0;
         line-height: 1.3; }
  .lane { font-size: 9.5pt; line-height: 1.5; text-indent: 0; margin: 0;
          text-align: left; }
  .lane b { display: inline-block; min-width: 2.15in; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 3 | M3A2: RCS System Concept
</div>
<div class="rule"></div>

<h1>System Concept — PD-RPM Remote Care System</h1>

${CONCEPT.map((t) => `<p>${md(t)}</p>`).join('\n')}

<div class="fig">${svg}</div>
<p class="cap"><b>Figure 1.</b> PD-RPM system concept. Solid arrows carry data; the brown dashed arrow is the
clinician feedback path; gray dashed boxes lie outside the system boundary.</p>
${LANES.map(([n, p]) => `<p class="lane"><b>${esc(n)}</b>${esc(p)}</p>`).join('\n')}

<div class="brk"></div>
${SCENARIOS.map((t) => `<p>${md(t)}</p>`).join('\n')}
`;

fs.writeFileSync('m3a2.html', html);
console.log('html written —', words, 'words');
