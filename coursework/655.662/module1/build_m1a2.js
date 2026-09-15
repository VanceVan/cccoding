// M1A2: Context Diagram — builds standalone SVG + a print-ready HTML for Chromium PDF.
// System of interest: Peritoneal Dialysis Remote Patient Monitoring System (PD-RPM).
const fs = require('fs');

/* ----------------------------- diagram model ----------------------------- */

const PALETTE = {
  patient:  { fill: '#E8F0FA', stroke: '#2E5C8A', text: '#173A5E' },
  clinical: { fill: '#E7F4EB', stroke: '#2E7D4F', text: '#1B4D31' },
  govern:   { fill: '#FBEFE3', stroke: '#B06A2C', text: '#6E3F14' },
  infra:    { fill: '#EFEAF6', stroke: '#5B4A8A', text: '#38295C' },
};

const SOI_X = 370, SOI_Y = 320, SOI_W = 320, SOI_H = 140;
const SOI_R = SOI_X + SOI_W, SOI_B = SOI_Y + SOI_H;

const ENTITIES = [
  // LEFT — patient domain
  { x: 25,  y: 175, w: 190, h: 76, d: 'patient',
    name: ['Patient', '(ESKD, home PD)'],
    flow: ['weight, BP, fluid balance,', 'symptom & exit-site reports'], mode: 'in',
    from: [219, 213], to: [SOI_X, 350] },
  { x: 25,  y: 350, w: 190, h: 76, d: 'patient',
    name: ['Care Partner /', 'Family Member'],
    flow: ['setup assistance;', 'prompts, escalation'], mode: 'bi',
    from: [219, 388], to: [SOI_X, 390] },
  { x: 25,  y: 525, w: 190, h: 76, d: 'patient',
    name: ['Home Environment,', 'Power & Connectivity'],
    flow: ['dwelling, storage,', 'mains power, network'], mode: 'in',
    from: [219, 563], to: [SOI_X, 430] },

  // RIGHT — clinical domain
  { x: 845, y: 150, w: 190, h: 68, d: 'clinical',
    name: ['Home Dialysis Nurse /', 'PD Care Coordinator'],
    flow: ['adherence, alarms, trends;', 'thresholds, dispositions'], mode: 'bi',
    from: [SOI_R, 350], to: [841, 184] },
  { x: 845, y: 275, w: 190, h: 68, d: 'clinical',
    name: ['Nephrologist', '(prescribing)'],
    flow: ['adequacy & volume trends;', 'PD prescription changes'], mode: 'bi',
    from: [SOI_R, 375], to: [841, 309] },
  { x: 845, y: 400, w: 190, h: 68, d: 'clinical',
    name: ['Dialysis Center /', 'Urgent Escalation'],
    flow: ['suspected peritonitis', 'or access escalation'], mode: 'out',
    from: [SOI_R, 405], to: [841, 434] },
  { x: 845, y: 525, w: 190, h: 68, d: 'clinical',
    name: ['Population Health', '& Quality Analytics'],
    flow: ['de-identified trends,', 'QIP measures'], mode: 'out',
    from: [SOI_R, 430], to: [841, 559] },

  // TOP — governance domain
  { x: 250, y: 30, w: 190, h: 64, d: 'govern',
    name: ['FDA', '(SaMD / device reg.)'],
    flow: ['classification &', 'SaMD constraints'], mode: 'in',
    from: [345, 98], to: [450, SOI_Y] },
  { x: 460, y: 30, w: 190, h: 64, d: 'govern',
    name: ['HIPAA / HITECH,', 'State Licensure'],
    flow: ['privacy, security,', 'practice constraints'], mode: 'in',
    from: [555, 98], to: [530, SOI_Y] },
  { x: 670, y: 30, w: 190, h: 64, d: 'govern',
    name: ['CMS ESRD Program', '(benefit, ETC model)'],
    flow: ['coverage & ETC rules;', 'billing, quality data'], mode: 'bi',
    from: [765, 98], to: [610, SOI_Y] },

  // BOTTOM — infrastructure domain
  { x: 250, y: 690, w: 190, h: 64, d: 'infra',
    name: ['PD Cycler &', 'Home Devices'],
    flow: ['treatment logs, UF, alarms;', 'prescription push'], mode: 'bi',
    from: [345, 686], to: [450, SOI_B] },
  { x: 460, y: 690, w: 190, h: 64, d: 'infra',
    name: ['EHR / Dialysis', 'Organization IT'],
    flow: ['demographics, labs, orders;', 'observations, notes'], mode: 'bi',
    from: [555, 686], to: [530, SOI_B] },
  { x: 670, y: 690, w: 190, h: 64, d: 'infra',
    name: ['Solution Supply Chain', '& Field Support'],
    flow: ['consumable burn, faults;', 'deliveries, field support'], mode: 'bi',
    from: [765, 686], to: [610, SOI_B] },
];

/* ------------------------------ svg emitters ----------------------------- */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function entityBox(e) {
  const p = PALETTE[e.d];
  const cx = e.x + e.w / 2;
  const first = e.h > 70 ? e.y + 31 : e.y + 27;
  return `
  <g>
    <rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="7"
          fill="${p.fill}" stroke="${p.stroke}" stroke-width="1.8"/>
    ${e.name.map((ln, i) =>
      `<text x="${cx}" y="${first + i * 17}" text-anchor="middle" font-size="13.5"
             font-weight="600" fill="${p.text}">${esc(ln)}</text>`).join('')}
  </g>`;
}

function flowArrow(e) {
  const [x1, y1] = e.from;
  const [x2, y2] = e.to;
  const ms = e.mode === 'bi' ? ' marker-start="url(#as)"' : '';
  const me = ' marker-end="url(#ae)"';
  // 'out' flows originate at the SoI, so from/to already encode direction.
  const line = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#5A5A5A"
        stroke-width="1.6"${ms}${me}/>`;

  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const longest = Math.max(...e.flow.map((s) => s.length));
  const bw = longest * 5.15 + 10;
  const bh = e.flow.length * 13 + 6;
  const label = `
    <rect x="${mx - bw / 2}" y="${my - bh / 2}" width="${bw}" height="${bh}" rx="3"
          fill="#FFFFFF" fill-opacity="0.93"/>
    ${e.flow.map((ln, i) =>
      `<text x="${mx}" y="${my - bh / 2 + 12 + i * 13}" text-anchor="middle"
             font-size="11" fill="#333333">${esc(ln)}</text>`).join('')}`;
  return line + label;
}

function legend() {
  const rows = [
    ['patient',  'Patient domain'],
    ['clinical', 'Clinical / care-delivery domain'],
    ['govern',   'Regulatory, legal & payer domain'],
    ['infra',    'Enabling infrastructure domain'],
  ];
  const x = 25, y = 634;
  return `
  <g>
    <text x="${x}" y="${y}" font-size="12" font-weight="700" fill="#222">LEGEND</text>
    ${rows.map(([d, label], i) => {
      const p = PALETTE[d];
      const yy = y + 20 + i * 20;
      return `<rect x="${x}" y="${yy - 10}" width="15" height="13" rx="2.5"
                    fill="${p.fill}" stroke="${p.stroke}" stroke-width="1.5"/>
              <text x="${x + 22}" y="${yy}" font-size="11.5" fill="#333">${esc(label)}</text>`;
    }).join('')}
    <line x1="${x}" y1="${y + 96}" x2="${x + 26}" y2="${y + 96}" stroke="#5A5A5A"
          stroke-width="1.6" marker-end="url(#ae)"/>
    <text x="${x + 33}" y="${y + 100}" font-size="11.5" fill="#333">one-way flow</text>
    <line x1="${x}" y1="${y + 118}" x2="${x + 26}" y2="${y + 118}" stroke="#5A5A5A"
          stroke-width="1.6" marker-start="url(#as)" marker-end="url(#ae)"/>
    <text x="${x + 33}" y="${y + 122}" font-size="11.5" fill="#333">bidirectional flow</text>
  </g>`;
}

const svg = `<svg viewBox="0 0 1060 790" xmlns="http://www.w3.org/2000/svg"
     font-family="Calibri, Carlito, 'Segoe UI', sans-serif">
  <defs>
    <marker id="ae" markerWidth="10" markerHeight="8" refX="9" refY="3"
            orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L10,3 L0,6 z" fill="#5A5A5A"/>
    </marker>
    <marker id="as" markerWidth="10" markerHeight="8" refX="1" refY="3"
            orient="auto" markerUnits="userSpaceOnUse">
      <path d="M10,0 L0,3 L10,6 z" fill="#5A5A5A"/>
    </marker>
  </defs>

  <text x="25" y="42" font-size="15" font-weight="700" fill="#1F3864">Figure 1.</text>
  <text x="25" y="62" font-size="12.5" fill="#333">Context diagram —</text>
  <text x="25" y="79" font-size="12.5" fill="#333">PD-RPM System</text>

  ${ENTITIES.map(flowArrow).join('')}

  <rect x="${SOI_X - 16}" y="${SOI_Y - 16}" width="${SOI_W + 32}" height="${SOI_H + 32}" rx="16"
        fill="none" stroke="#1F3864" stroke-width="1.6"
        stroke-dasharray="7 5" stroke-opacity="0.8"/>
  <rect x="${SOI_X - 18}" y="${SOI_B + 22}" width="104" height="15" rx="2" fill="#FFFFFF" fill-opacity="0.95"/>
  <text x="${SOI_X - 16}" y="${SOI_B + 34}" font-size="11" font-style="italic" fill="#1F3864">system boundary</text>

  <rect x="${SOI_X}" y="${SOI_Y}" width="${SOI_W}" height="${SOI_H}" rx="10"
        fill="#1F3864" stroke="#0F1F3D" stroke-width="2"/>
  <text x="${SOI_X + SOI_W / 2}" y="${SOI_Y + 42}" text-anchor="middle" font-size="16"
        font-weight="700" fill="#FFFFFF">Peritoneal Dialysis Remote</text>
  <text x="${SOI_X + SOI_W / 2}" y="${SOI_Y + 63}" text-anchor="middle" font-size="16"
        font-weight="700" fill="#FFFFFF">Patient Monitoring System</text>
  <text x="${SOI_X + SOI_W / 2}" y="${SOI_Y + 83}" text-anchor="middle" font-size="14"
        font-weight="700" fill="#AFC6E9">(PD-RPM)</text>
  <text x="${SOI_X + SOI_W / 2}" y="${SOI_Y + 108}" text-anchor="middle" font-size="11"
        font-style="italic" fill="#C9D8F0">system of interest — black box;</text>
  <text x="${SOI_X + SOI_W / 2}" y="${SOI_Y + 122}" text-anchor="middle" font-size="11"
        font-style="italic" fill="#C9D8F0">internals defined in later modules</text>

  ${ENTITIES.map(entityBox).join('')}
  ${legend()}

  <text x="1035" y="775" text-anchor="end" font-size="10.5" font-style="italic" fill="#666">
    Every arrow crossing the boundary is a candidate interface requirement.
  </text>
</svg>`;

fs.writeFileSync('PD-RPM_context_diagram.svg',
  svg.replace('<svg ', '<svg width="1060" height="790" '));

/* ------------------------------ interface table --------------------------- */

const TABLE = [
  ['Patient (ESKD, home PD)', 'Patient', 'In',
   'Daily weight, blood pressure, self-reported fluid balance, structured symptom responses, and exit-site condition reports (including images where supported).'],
  ['Care Partner / Family Member', 'Patient', 'Bi',
   'In: assistance with cycler setup and measurement, confirmation of readings. Out: exchange reminders, plain-language guidance, escalation notification.'],
  ['Home Environment, Power & Connectivity', 'Patient', 'In',
   'Dwelling conditions and solution storage space, mains power (the cycler runs overnight), and broadband or cellular service of variable reliability. Given conditions, not design choices.'],
  ['Home Dialysis Nurse / PD Care Coordinator', 'Clinical', 'Bi',
   'Out: session adherence, cycler alarm history, ultrafiltration and volume trends, prioritized triage queue. In: patient-specific thresholds, care-plan updates, alert dispositions.'],
  ['Nephrologist (prescribing)', 'Clinical', 'Bi',
   'Out: adequacy and volume-status trends, escalation summaries, technique-failure risk indicators. In: PD prescription changes (dwell, fill volume, dextrose concentration, cycle count).'],
  ['Dialysis Center / Urgent Escalation', 'Clinical', 'Out',
   'Suspected-peritonitis alert (effluent cloudiness, abdominal pain, fever) or catheter/exit-site access alert, with recent trend context, at the point where remote management is no longer sufficient.'],
  ['Population Health & Quality Analytics', 'Clinical', 'Out',
   'De-identified longitudinal data supporting technique-survival analysis, home-program evaluation, and ESRD Quality Incentive Program measure reporting.'],
  ['FDA (SaMD / device regulation)', 'Governance', 'In',
   'Device classification, software-as-a-medical-device constraints, clinical-decision-support boundaries, labeling and change-control obligations.'],
  ['HIPAA / HITECH, State Licensure', 'Governance', 'In',
   'PHI privacy and security obligations, audit-logging requirements, breach-notification duties, cross-state telehealth practice constraints.'],
  ['CMS ESRD Program (benefit, ETC model)', 'Governance', 'Bi',
   'In: Medicare ESRD benefit coverage rules, ETC model home-dialysis incentives, RPM billing criteria, QIP measure definitions. Out: billing-qualifying data, time documentation, quality measure submissions.'],
  ['PD Cycler & Home Devices', 'Infrastructure', 'Bi',
   'In: per-session treatment logs (fill and drain volumes, dwell times, net ultrafiltration), alarm records, device state; plus BP cuff and scale readings. Out: prescription updates pushed to the cycler.'],
  ['EHR / Dialysis Organization IT', 'Infrastructure', 'Bi',
   'In: patient demographics, problem list, medications, laboratory results (Kt/V, albumin, potassium), orders, identity and access control. Out: observations, flowsheet entries, alerts, documentation.'],
  ['Solution Supply Chain & Field Support', 'Infrastructure', 'Bi',
   'Out: consumable burn rate, projected solution shortfall, device fault and service triggers. In: dialysate and supply deliveries, cycler replacement, on-site or remote technical support.'],
];

const OUT_OF_SCOPE = [
  ['The PD cycler itself',
   'A separately regulated Class II device with its own manufacturer, clearance, and control loop. PD-RPM consumes its telemetry and pushes prescription updates across a defined interface, but does not deliver or modulate therapy.'],
  ['Home hemodialysis',
   'A distinct modality carrying water treatment, vascular access, and a different alarm set as whole subsystems. Excluded to keep the SoI bounded; a candidate for a later increment rather than this one.'],
  ['In-center hemodialysis',
   'Not remote care. The center is a destination the system escalates to, not part of the monitored system.'],
  ['The EHR / dialysis organization clinical information system',
   'PD-RPM exchanges data with it across a defined interface. Absorbing it into the boundary would make the project unbounded.'],
  ['Clinical decision authority over the PD prescription',
   'The system surfaces trends and escalates; the nephrologist prescribes. This boundary is a regulatory constraint, not a preference.'],
  ['Solution manufacturing and distribution logistics',
   'PD-RPM signals consumption and faults; the supply organization fulfills. The interface is in scope, the logistics operation is not.'],
];

/* --------------------------------- html ---------------------------------- */

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.85in; }
  @page land { size: letter landscape; margin: 0.4in 0.45in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Calibri, Carlito, "Segoe UI", sans-serif; font-size: 10.5pt;
         line-height: 1.10; margin: 0; color: #000; }
  .name { font-weight: 700; }
  .meta { font-size: 9.5pt; }
  .rule { border-bottom: 0.75pt solid #aaa; padding-bottom: 7pt; margin-bottom: 8pt; }
  h1 { font-size: 12pt; text-align: center; margin: 0 0 9pt; line-height: 1.2; }
  h2 { font-size: 10.5pt; font-weight: 700; color: #1F3864; margin: 8pt 0 3.5pt;
       page-break-after: avoid; }
  p { text-align: justify; margin: 0 0 6pt; }
  ol, ul { margin: 0 0 6pt; padding-left: 17pt; }
  li { margin-bottom: 3pt; text-align: justify; }
  .diagram { page: land; page-break-before: always; page-break-after: always; }
  .diagram svg { width: 100%; height: auto; display: block; }
  table { border-collapse: collapse; width: 100%; font-size: 8.3pt; margin-bottom: 8pt; }
  th { background: #1F3864; color: #fff; font-weight: 700; text-align: left;
       padding: 4pt 5pt; border: 0.5pt solid #1F3864; }
  td { padding: 3.5pt 5pt; border: 0.5pt solid #B8C2D4; vertical-align: top; }
  tr:nth-child(even) td { background: #F4F7FC; }
  .c-ent { width: 21%; font-weight: 600; }
  .c-dom { width: 11%; }
  .c-dir { width: 7%; text-align: center; }
  .c-os1 { width: 27%; font-weight: 600; }
</style>

<div class="name">Vance Vanvolkenburgh</div>
<div class="meta">655.662 — Introduction to Healthcare Systems Engineering</div>
<div class="meta rule">Module 1 | M1A2: Context Diagram</div>

<h1>Context Diagram — Peritoneal Dialysis Remote Patient Monitoring System (PD-RPM)</h1>

<h2>What Is a Context Diagram?</h2>
<p>A context diagram is the highest-level model of a system. It represents the system of interest (SoI) as a
single undifferentiated <em>black box</em>, draws an explicit boundary around it, and shows every external
entity the system exchanges something with, together with the labeled, directional flows that cross that
boundary. Its defining characteristic is what it deliberately withholds: it says nothing whatsoever about
internal components, functions, or architecture. INCOSE defines the system boundary as the “line of
demarcation” between the system under consideration and its greater context, and states that the boundary
determines what belongs to the system and what does not. The context diagram is the artifact that makes
that line explicit, visible, and reviewable by people who would otherwise each assume a different one.</p>
<p>Its notation is intentionally minimal — one box for the SoI, one box per external entity, one labeled arrow
per flow. That economy is the point. Because the diagram cannot express internal design, it cannot be used
to argue about internal design, which forces a team to finish the question of scope before opening the
question of solution.</p>

<h2>What Is Its Purpose?</h2>
<ol>
  <li><strong>Fix scope and boundary before design begins.</strong> Every element is either inside the box or
  outside it, and the diagram makes that commitment visible. This is the earliest and cheapest defense
  against both scope creep and its quieter twin, scope gaps — the interfaces nobody claimed because nobody
  drew them.</li>
  <li><strong>Enumerate the full stakeholder set.</strong> Building the diagram forces the question “who or
  what else touches this?” until the answers run out. It routinely surfaces entities no single stakeholder
  would have volunteered — the supply chain, the payer, the care partner — a structural remedy for the
  blind-men-and-the-elephant problem, in which each participant describes only the part they can see.</li>
  <li><strong>Identify every external interface.</strong> Each arrow crossing the boundary is a future
  interface requirement. Interfaces are where systems most often fail and where integration cost concentrates,
  so enumerating them at the beginning is disproportionately valuable relative to the effort involved.</li>
  <li><strong>Seed operational needs and requirements.</strong> The flows are the raw material for the needs
  and requirements developed later in the lifecycle: what the system must accept, what it must produce, at
  what rate, and under what conditions. The diagram is therefore the first input to the systems engineering
  method.</li>
  <li><strong>Expose constraints that are not negotiable.</strong> Laws, regulations, reimbursement rules,
  and existing infrastructure are not design choices; they are givens that the design must satisfy. Placing
  them on the diagram prevents a team from discovering them late, when accommodating them is most expensive.</li>
  <li><strong>Create a shared mental model.</strong> A single page a clinician, an engineer, a compliance
  officer, and an executive can all read and correct is how a systems view becomes shared rather than
  privately held.</li>
</ol>

<h2>Selected Remote Healthcare System</h2>
<p>The system of interest is a <strong>peritoneal dialysis remote patient monitoring system (PD-RPM)</strong>:
a home-based capability that monitors adults with end-stage kidney disease performing peritoneal dialysis at
home and escalates to the home dialysis care team when the data indicate the therapy is failing. National
policy has pushed to expand home dialysis — the 2019 Advancing American Kidney Health initiative and CMS’s
ESRD Treatment Choices model both incentivize it — yet home PD carries a persistent technique-failure
problem, with peritonitis and inadequate ultrafiltration among the leading causes of transfer back to
in-center hemodialysis. The signals preceding those failures are generated nightly: declining ultrafiltration
volumes, missed or shortened exchanges, recurring cycler alarms, rising weight and blood pressure, early
exit-site changes. They are frequently reviewed only at a monthly clinic visit. The gap is not therapy or
diagnostic knowledge; it is a sensing-and-escalation capability operating in the interval between visits. The
environment spans this module’s tiers: home-based care, a clinical monitoring node at the dialysis
organization, and urgent in-center or emergency response at the escalation limit.</p>

<div class="diagram">${svg}</div>

<h2>Interface Summary — Flows Crossing the System Boundary</h2>
<table>
  <tr><th class="c-ent">External Entity</th><th class="c-dom">Domain</th>
      <th class="c-dir">Dir.</th><th>Content of the flow</th></tr>
  ${TABLE.map(([e, d, dir, f]) => `<tr><td class="c-ent">${esc(e)}</td><td class="c-dom">${esc(d)}</td>
      <td class="c-dir">${esc(dir)}</td><td>${esc(f)}</td></tr>`).join('\n  ')}
</table>
<p style="font-size:8.5pt; margin-top:-3pt;"><em>Dir. — In: entity to system. Out: system to entity.
Bi: bidirectional.</em></p>

<h2>Boundary Decisions — What Is Deliberately Outside the Box</h2>
<p>A boundary is only meaningful if the exclusions are stated as explicitly as the inclusions. The following
are outside the PD-RPM boundary by decision, not by oversight.</p>
<table>
  <tr><th class="c-os1">Excluded from the SoI</th><th>Rationale</th></tr>
  ${OUT_OF_SCOPE.map(([a, b]) => `<tr><td class="c-os1">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n  ')}
</table>

<h2>Assumptions</h2>
<ul>
  <li>The deployment setting is home peritoneal dialysis in the United States, for adult ESKD patients
  enrolled in a dialysis organization’s home program.</li>
  <li>Monitoring is continuous for the duration of home PD therapy rather than time-bounded, and ends at
  modality change, transplant, or death.</li>
  <li>The system is informational and escalatory. It does not deliver therapy and does not exercise
  autonomous clinical decision authority over the PD prescription.</li>
  <li>Patients and care partners may have limited technical proficiency, intermittent connectivity, and
  variable support at home. These are context conditions the design must tolerate, not assumptions to be
  engineered away.</li>
  <li>Early detection of peritonitis and of declining ultrafiltration is taken as the core value hypothesis,
  since both are leading contributors to technique failure.</li>
</ul>

<h2>References</h2>
<p style="font-size:8.5pt;">INCOSE. (2023). <em>Systems engineering handbook</em> (5th ed.). INCOSE-TP-2003-002-05. ·
Kossiakoff, A., Biemer, S. M., Seymour, S. J., &amp; Flanigan, D. A. (2020). <em>Systems engineering
principles and practice</em> (3rd ed.). Wiley. · Montoya, M. Module 1: Framework, context, and motivation
[Course lecture]. Johns Hopkins University. · Executive Order 13879, Advancing American Kidney Health (2019). ·
Centers for Medicare &amp; Medicaid Services, ESRD Treatment Choices (ETC) Model.</p>
`;

fs.writeFileSync('m1a2.html', html);
console.log('svg + html written');
