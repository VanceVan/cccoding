// M5A1 — Physical architecture view of PD-RPM (SV-1 diagram + SV-6 interface matrix).
// Two pages, US Letter LANDSCAPE, Arial.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// -------------------------------------------------------------- elements ----
// id, name, type, segment, allocated M4A1 functions
const EL = [
  ['CY-1', 'PD Cycler',                 'HW (external)', 'Home',       '— (source)'],
  ['BP-1', 'Blood Pressure Monitor',    'HW',            'Home',       '1'],
  ['SC-1', 'Weight Scale',              'HW',            'Home',       '1'],
  ['PT-1', 'Patient Tablet + App',      'HW / SW',       'Home',       '1, 3'],
  ['HG-1', 'Home Gateway, LTE-M',       'HW / FW',       'Home',       '1, 2, 4, 5, 6'],
  ['CN-1', 'LTE-M Carrier Network',     'Svc (external)', 'Transport', '6'],
  ['IN-1', 'Public Internet',           'Svc (external)', 'Transport', '6'],
  ['EG-1', 'Edge / API Gateway',        'SW',            'Monitoring', '7'],
  ['IS-1', 'Ingest & Normalization',    'SW',            'Monitoring', '7, 8'],
  ['DS-1', 'Data Store (time series + relational)', 'SW', 'Monitoring', '8'],
  ['AE-1', 'Analytics Engine',          'SW',            'Monitoring', '9'],
  ['RE-1', 'Rules & Alert Engine',      'SW',            'Monitoring', '10'],
  ['CW-1', 'Clinician Web Application', 'SW',            'Monitoring', '11'],
  ['NG-1', 'Notification Gateway',      'SW',            'Monitoring', '12'],
  ['DM-1', 'Device Management Server',  'SW',            'Monitoring', 'sustains 1–6'],
  ['IM-1', 'Identity & Access Management', 'SW',         'Monitoring', 'sustains 11, 12'],
  ['EI-1', 'EHR Integration Service',   'SW',            'Monitoring', '8, 11'],
  ['CS-1', 'Clinician Workstation',     'HW (COTS)',     'Care team',  '11'],
  ['MD-1', 'On-call Mobile Device',     'HW (COTS)',     'Care team',  '12'],
  ['EH-1', 'Electronic Health Record',  'SW (external)', 'External',   '— (sink/source)'],
];

// id, from, to, medium / protocol, data exchanged
const IF = [
  ['I-1',  'CY-1', 'HG-1', 'USB 2.0 / RS-232 data port', 'Treatment session record: fill and drain volumes, dwell times, net UF, alarm codes'],
  ['I-2',  'BP-1', 'HG-1', 'Bluetooth LE 5.0, Blood Pressure Profile', 'Systolic, diastolic, pulse, measurement timestamp'],
  ['I-3',  'SC-1', 'HG-1', 'Bluetooth LE 5.0, Weight Scale Profile', 'Body weight, measurement timestamp'],
  ['I-4',  'PT-1', 'HG-1', '802.11n local Wi-Fi (gateway-hosted AP), HTTPS', 'Daily symptom and exit-site entries'],
  ['I-5',  'HG-1', 'CN-1', 'LTE-M (Cat-M1) radio, private carrier APN', 'Encrypted session payload, gateway telemetry (bidirectional)'],
  ['I-6',  'CN-1', 'IN-1', 'IP transit', 'Routed traffic (bidirectional)'],
  ['I-7',  'IN-1', 'EG-1', 'TLS 1.3, mutual certificate authentication', 'Session upload, delivery acknowledgment (bidirectional)'],
  ['I-8',  'EG-1', 'IS-1', 'Internal REST over mTLS', 'Raw session payload'],
  ['I-9',  'IS-1', 'DS-1', 'Internal API over mTLS', 'Normalized, unit-consistent records'],
  ['I-10', 'DS-1', 'AE-1', 'Internal API over mTLS', 'Patient time series'],
  ['I-11', 'AE-1', 'RE-1', 'Internal API over mTLS', 'Trend series with derived values'],
  ['I-12', 'bus',  'bus',  'Internal service bus, mTLS service mesh', 'Service-to-service calls among DS-1, RE-1, CW-1, NG-1, DM-1, IM-1, EI-1'],
  ['I-13', 'CW-1', 'CS-1', 'HTTPS (TLS 1.3), browser session', 'Triage queue, trend views, clinician dispositions (bidirectional)'],
  ['I-14', 'NG-1', 'MD-1', 'SMS and push notification over carrier', 'Page with alert summary and patient identifier'],
  ['I-15', 'DM-1', 'HG-1', 'TLS 1.3 tunneled over I-7 → I-6 → I-5', 'Configuration, firmware images, certificates; device health returned'],
  ['I-16', 'EI-1', 'EH-1', 'HL7 v2.5.1 and FHIR R4 over TLS', 'Demographics and prescription of record in; treatment summaries out'],
];

// --------------------------------------------------------------- diagram ----
const W_ = (t, px) => t.length * px * 0.56;

function box(x, y, w, h, id, lines, ext) {
  const cx = x + w / 2;
  const total = 16 + lines.length * 15;
  const ty = y + (h - total) / 2 + 13;
  let o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${ext ? '#efefef' : '#ffffff'}" ` +
          `stroke="#1a1a1a" stroke-width="1.1"${ext ? ' stroke-dasharray="5 3"' : ''}/>`;
  o += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="15.5" font-weight="bold" ` +
       `fill="#000">${esc(id)}</text>`;
  lines.forEach((t, i) => {
    o += `<text x="${cx}" y="${ty + 16 + i * 15}" text-anchor="middle" font-size="12.5" ` +
         `fill="#000">${esc(t)}</text>`;
  });
  return o;
}

// zone outline with the title straddling the border, as on a drawing sheet
const grp = (x, y, w, h, label) => {
  const lw = W_(label, 13) + 14;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#8a8a8a" ` +
    `stroke-width="1"/>` +
    `<rect x="${x + 12}" y="${y - 8}" width="${lw}" height="16" fill="#ffffff"/>` +
    `<text x="${x + 19}" y="${y + 4}" font-size="13" font-weight="bold" fill="#000">${esc(label)}</text>`;
};

const ar = (pts, both) => `<polyline points="${pts}" fill="none" stroke="#1a1a1a" ` +
  `stroke-width="1.1" marker-end="url(#ah)"${both ? ' marker-start="url(#ah)"' : ''}/>`;

// plain interface tag on a white backing so it stays readable where lines run close
const tag = (x, y, t, anchor) => {
  const w = W_(t, 12) + 6, a = anchor || 'middle';
  const rx = a === 'start' ? x - 3 : a === 'end' ? x - w + 3 : x - w / 2;
  return `<rect x="${rx}" y="${y - 9}" width="${w}" height="12" fill="#ffffff"/>` +
         `<text x="${x}" y="${y}" text-anchor="${a}" font-size="12" fill="#000">${esc(t)}</text>`;
};

const tb = (x, y, rows) => {
  const w = 330, rh = 21;
  let o = `<rect x="${x}" y="${y}" width="${w}" height="${rh * rows.length}" fill="#ffffff" ` +
          `stroke="#1a1a1a" stroke-width="1.1"/>`;
  rows.forEach(([k, v], i) => {
    const ry = y + i * rh;
    if (i) o += `<line x1="${x}" y1="${ry}" x2="${x + w}" y2="${ry}" stroke="#1a1a1a" stroke-width="0.6"/>`;
    o += `<text x="${x + 7}" y="${ry + 14.5}" font-size="11.5" fill="#000">${esc(k)}</text>`;
    o += `<text x="${x + 112}" y="${ry + 14.5}" font-size="11.5" font-weight="${i ? 'normal' : 'bold'}" ` +
         `fill="#000">${esc(v)}</text>`;
  });
  o += `<line x1="${x + 105}" y1="${y}" x2="${x + 105}" y2="${y + rh * rows.length}" ` +
       `stroke="#1a1a1a" stroke-width="0.6"/>`;
  return o;
};

const NOTES = [
  '1.  Dashed outline denotes an element outside the system boundary. An interface to it is',
  '     defined and controlled; the element itself is not built by this program.',
  '2.  HG-1 is the alternative selected by the M4A2 trade study (dedicated LTE-M gateway).',
  '3.  I-15 (device management) is tunnelled over I-7 → I-6 → I-5. No separate physical link.',
  '4.  Interface identifiers I-1 through I-16 are specified in Table 2, sheet 2.',
];

const svg = `<svg viewBox="0 0 1500 700" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
  orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>

${grp(20, 90, 400, 320, 'Home — patient residence')}
${box(35, 130, 190, 54, 'CY-1', ['PD Cycler'], true)}
${box(35, 194, 190, 54, 'BP-1', ['Blood Pressure Monitor'])}
${box(35, 258, 190, 54, 'SC-1', ['Weight Scale'])}
${box(35, 322, 190, 54, 'PT-1', ['Patient Tablet + App'])}
${box(250, 194, 155, 182, 'HG-1', ['Home Gateway', 'LTE-M cellular', 'store-and-forward', '(per M4A2)'])}
${ar('227,157 246,228')}${tag(238, 180, 'I-1')}
${ar('227,221 246,254')}${tag(238, 230, 'I-2')}
${ar('227,285 246,285')}${tag(238, 278, 'I-3')}
${ar('227,349 246,342')}${tag(238, 358, 'I-4')}

${grp(450, 90, 190, 330, 'Transport')}
${box(462, 210, 166, 70, 'CN-1', ['LTE-M Carrier Network'], true)}
${box(462, 320, 166, 70, 'IN-1', ['Public Internet'], true)}
${ar('407,275 460,258', true)}${tag(430, 252, 'I-5')}
${ar('545,282 545,318', true)}${tag(562, 304, 'I-6', 'start')}
${ar('630,345 686,175', true)}${tag(668, 262, 'I-7', 'end')}

${grp(670, 90, 470, 470, 'Monitoring center — dialysis organization')}
${box(690, 130, 200, 58, 'EG-1', ['Edge / API Gateway'])}
${box(690, 206, 200, 58, 'IS-1', ['Ingest & Normalization'])}
${box(690, 282, 200, 58, 'DS-1', ['Data Store'])}
${box(690, 358, 200, 58, 'AE-1', ['Analytics Engine'])}
${box(690, 434, 200, 58, 'RE-1', ['Rules & Alert Engine'])}
${box(920, 130, 200, 58, 'CW-1', ['Clinician Web App'])}
${box(920, 206, 200, 58, 'NG-1', ['Notification Gateway'])}
${box(920, 282, 200, 58, 'DM-1', ['Device Mgmt Server'])}
${box(920, 358, 200, 58, 'IM-1', ['Identity & Access Mgmt'])}
${box(920, 434, 200, 58, 'EI-1', ['EHR Integration Svc'])}
${ar('752,188 752,204')}${tag(772, 200, 'I-8', 'start')}
${ar('752,264 752,280')}${tag(772, 276, 'I-9', 'start')}
${ar('752,340 752,356')}${tag(772, 352, 'I-10', 'start')}
${ar('752,416 752,432')}${tag(772, 428, 'I-11', 'start')}
<polyline points="905,146 905,478" fill="none" stroke="#1a1a1a" stroke-width="1.8"/>
${[159, 235, 311, 387, 463].map((y) => ar(`905,${y} 918,${y}`, true)).join('')}
${[311, 463].map((y) => ar(`905,${y} 892,${y}`, true)).join('')}
${tag(905, 141, 'I-12')}

${grp(1180, 90, 280, 200, 'Care team')}
${box(1200, 130, 240, 58, 'CS-1', ['Clinician Workstation'])}
${box(1200, 206, 240, 58, 'MD-1', ['On-call Mobile Device'])}
${ar('1122,159 1198,159', true)}${tag(1160, 154, 'I-13')}
${ar('1122,235 1198,235')}${tag(1160, 230, 'I-14')}

${box(920, 595, 200, 58, 'EH-1', ['Electronic Health Record'], true)}
${ar('1020,494 1020,593', true)}${tag(1036, 548, 'I-16', 'start')}

<text x="24" y="455" font-size="13" font-weight="bold" fill="#000">NOTES</text>
${NOTES.map((t, i) => `<text x="24" y="${474 + i * 16}" font-size="12.3" fill="#000">${esc(t)}</text>`).join('\n')}

${tb(1150, 472, [
  ['Drawing', 'PD-RPM Physical Architecture'],
  ['System', 'PD-RPM Remote Care System'],
  ['View', 'Physical (DoDAF SV-1 / SV-2)'],
  ['Prepared by', 'V. Vanvolkenburgh'],
  ['Course', 'EN.655.662, Module 5'],
  ['Rev / Date', 'A  —  13 Oct 2026'],
  ['Sheet', '1 of 2'],
])}
</svg>`;

// ---------------------------------------------------------------- tables ----
const elTbl = `<table class="t"><tr><th>ID</th><th>Physical element</th><th>Type</th>
<th>Segment</th><th>M4A1 functions allocated</th></tr>` +
  EL.map(([a, b, c, d, e]) =>
    `<tr><td class="id">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td><td>${esc(d)}</td>` +
    `<td>${esc(e)}</td></tr>`).join('') + `</table>`;

const ifTbl = `<table class="t"><tr><th>ID</th><th>Interface</th><th>Medium / protocol</th>
<th>Data exchanged</th></tr>` +
  IF.map(([i, f, t, m, d]) =>
    `<tr><td class="id">${esc(i)}</td><td class="ep">${
      f === 'bus' ? 'monitoring-center services' : esc(f) + ' → ' + esc(t)
    }</td><td>${esc(m)}</td><td>${esc(d)}</td></tr>`).join('') + `</table>`;

// ----------------------------------------------------------------- prose ----
const INTRO =
  'An architecture is "the structure of components, their relationships, and the principles and guidelines ' +
  'governing their design and evolution over time." The **physical architecture view** expresses that ' +
  'structure as the physical elements of the system and their interfaces. Figure 1 is the PD-RPM physical ' +
  'architecture, organized by the four physical locations the system actually occupies, and corresponds to ' +
  'DoDAF **SV-1** (systems interface description) and **SV-2** (systems resource flow). The element ' +
  'inventory and interface matrix on page 2 complete it as an **SV-6**.';

const PRIN =
  '**Principles governing design and evolution.** Four rules constrain every element above. One, nothing ' +
  'inside the home makes a clinical judgment — HG-1 buffers and forwards, and all evaluation happens at ' +
  'RE-1 under version control. Two, every interface crossing a location boundary is mutually authenticated ' +
  'and encrypted, so adding a location adds no new trust assumption. Three, monitoring-center services are ' +
  'stateless behind the I-12 bus, so any one can be replaced without touching its neighbors. Four, CY-1 and ' +
  'EH-1 stay outside the boundary, so their vendors’ release cycles cannot stall this program.';

const MM =
  '**On mental models.** Drawing the physical view forced an assumption into the open that the functional ' +
  'view had concealed: I had been picturing "the monitoring center" as one thing. It is ten services with ' +
  'five distinct failure modes, and the patient cannot tell which one failed. Making the picture explicit is ' +
  'what let that be examined rather than carried.';

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter landscape; margin: 0.45in 0.5in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10pt; margin: 0; color: #000; }
  .hdr { font-size: 9.5pt; line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 4pt 0 5pt; }
  h1 { font-size: 10.5pt; text-align: center; margin: 0 0 5pt; }
  h2 { font-size: 9.5pt; margin: 7pt 0 2pt; color: #14233a; }
  p { text-align: justify; margin: 0 0 4pt; line-height: 1.33; font-size: 9pt; }
  .fig { margin: 3pt 0 2pt; text-align: center; }
  .fig svg { width: 98%; }
  .cap { font-size: 8.5pt; text-align: center; margin: 0 0 4pt; line-height: 1.25; }
  table.t { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin: 2pt 0 4pt; }
  table.t th, table.t td { border: 0.5pt solid #9aa7b4; padding: 1.8pt 3pt;
       vertical-align: top; line-height: 1.2; }
  table.t th { background: #24405c; color: #fff; text-align: left; }
  table.t td.id { font-weight: bold; color: #24405c; width: 26pt; }
  table.t td.ep { white-space: nowrap; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b> &nbsp;|&nbsp; 655.662 — Introduction to Healthcare Systems Engineering
  &nbsp;|&nbsp; Module 5 | M5A1: Architecture Development
</div>
<div class="rule"></div>
<h1>Physical Architecture — PD-RPM Remote Care System</h1>
<p>${md(INTRO)}</p>
<div class="fig">${svg}</div>
<p class="cap"><b>Figure 1.</b> PD-RPM physical architecture (SV-1 / SV-2). Twenty physical elements in four
locations; sixteen interfaces, each tagged with the identifier used in Table 2.</p>
<p>${md(PRIN)}</p>
<p>${md(MM)}</p>

<div class="brk"></div>
<h1>Element Inventory and Interface Matrix — PD-RPM Remote Care System</h1>
<h2>Table 1. Physical element inventory</h2>
${elTbl}
<h2>Table 2. Interface matrix (SV-6)</h2>
${ifTbl}
`;

fs.writeFileSync('m5a1.html', html);
console.log('ok —', EL.length, 'elements,', IF.length, 'interfaces');
