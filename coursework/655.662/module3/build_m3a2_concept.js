// M3A2 — System concept, three scenarios, and a labeled concept diagram for PD-RPM.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ---------------------------------------------------------------- diagram ----
const IN = { fill: '#eaf1fa', stroke: '#24405c', title: '#14233a', sub: '#33465e' };
const EX = { fill: '#f4f4f4', stroke: '#8a8a8a', title: '#444444', sub: '#555555' };

function box(x, y, w, h, title, subs = [], ext = false) {
  const c = ext ? EX : IN;
  const cx = x + w / 2;
  const lead = 21;
  const totalH = 20 + subs.length * lead;
  const ty = y + (h - totalH) / 2 + 16;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c.fill}" ` +
            `stroke="${c.stroke}" stroke-width="1.6"${ext ? ' stroke-dasharray="7 4"' : ''}/>`;
  out += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="20" font-weight="bold" ` +
         `fill="${c.title}">${esc(title)}</text>`;
  subs.forEach((s, i) => {
    out += `<text x="${cx}" y="${ty + 19 + i * lead}" text-anchor="middle" font-size="16.5" ` +
           `fill="${c.sub}">${esc(s)}</text>`;
  });
  return out;
}

const grp = (x, y, w, h, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="none" stroke="#7a8da0" ` +
  `stroke-width="1.3" stroke-dasharray="4 4"/>` +
  `<text x="${x + 10}" y="${y + 24}" font-size="18" font-weight="bold" fill="#41566b" ` +
  `letter-spacing="0.5">${esc(label)}</text>`;

const arrow = (pts, opt = {}) =>
  `<polyline points="${pts}" fill="none" stroke="${opt.stroke || '#24405c'}" ` +
  `stroke-width="${opt.w || 1.8}"${opt.dash ? ` stroke-dasharray="${opt.dash}"` : ''} ` +
  `marker-end="url(#ah)"${opt.both ? ' marker-start="url(#ahs)"' : ''}/>`;

const lbl = (x, y, t, anchor = 'middle', italic = false) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="16" fill="#2f3f52"` +
  `${italic ? ' font-style="italic"' : ''}>${esc(t)}</text>`;

const svg = `<svg viewBox="0 0 1055 540" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs>
  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker>
  <marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker>
  <marker id="ahf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8c4a1f"/></marker>
</defs>

${grp(6, 62, 280, 372, 'PATIENT HOME')}
${box(44, 100, 232, 66, 'A1  PD Cycler', ['volumes, UF, alarms', '(external device)'], true)}
${box(44, 178, 232, 58, 'A2  Vitals Peripherals', ['BP cuff, scale'])}
${box(44, 248, 232, 66, 'A3  Patient App', ['daily symptom &', 'exit-site check'])}
${box(44, 356, 232, 66, 'A4  Home Gateway', ['store-and-forward', 'buffer'])}
<polyline points="44,133 26,133" fill="none" stroke="#24405c" stroke-width="1.8"/>
<polyline points="44,207 26,207" fill="none" stroke="#24405c" stroke-width="1.8"/>
<polyline points="44,281 26,281" fill="none" stroke="#24405c" stroke-width="1.8"/>
<polyline points="26,133 26,389" fill="none" stroke="#24405c" stroke-width="1.8"/>
${arrow('26,389 42,389')}

${box(310, 332, 165, 76, 'T1  Transport', ['secure TLS over', 'broadband/cellular'])}
${box(310, 446, 165, 76, 'T2  EHR', ['HL7/FHIR interface', '(external)'], true)}

${grp(495, 62, 290, 390, 'MONITORING CENTER')}
${box(505, 100, 270, 52, 'M1  Data Ingestion', ['normalization, quality checks'])}
${box(505, 170, 270, 52, 'M2  Trending & Analytics', ['per-session and 14/30-day'])}
${box(505, 240, 270, 52, 'M3  Alert Logic', ['thresholds and rules'])}
${box(505, 310, 270, 52, 'M4  Triage Queue', ['clinician dashboard'])}
${box(505, 380, 270, 52, 'M5  Escalation', ['paging and notification'])}
${arrow('630,152 630,168')}${arrow('630,222 630,238')}
${arrow('630,292 630,308')}${arrow('630,362 630,378')}

${grp(813, 62, 196, 272, 'CARE TEAM')}
${box(825, 100, 180, 58, 'U1  Home Dialysis', ['Nurse (monitoring)'])}
${box(825, 170, 180, 58, 'U2  Nephrologist', [])}
${box(825, 260, 180, 58, 'U3  Home Program', ['& Dialysis Center'])}

${arrow('276,389 308,370')}
${arrow('475,370 503,130')}
<polyline points="775,336 801,336" fill="none" stroke="#24405c" stroke-width="1.8"/>
<polyline points="775,406 801,406" fill="none" stroke="#24405c" stroke-width="1.8"/>
<polyline points="801,129 801,406" fill="none" stroke="#24405c" stroke-width="1.8"/>
${arrow('801,129 823,129')}${arrow('801,199 823,199')}${arrow('801,289 823,289')}

${arrow('475,484 492,484 492,468 555,468 555,454', { both: true })}
<polyline points="1005,199 1040,199 1040,22 485,22 485,196 503,196" fill="none"
  stroke="#8c4a1f" stroke-width="1.8" stroke-dasharray="7 4" marker-end="url(#ahf)"/>

${lbl(392, 420, 'within 30 min of', 'middle', true)}
${lbl(392, 436, 'session end', 'middle', true)}
${lbl(795, 50, 'views, alerts, and pages', 'start')}
${lbl(600, 502, 'demographics, orders, treatment summaries', 'start')}
<text x="762" y="16" text-anchor="middle" font-size="16" fill="#8c4a1f">prescription change recorded — compared over next 14 days</text>
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
  .fig { margin: 7pt 0 3pt; }
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
