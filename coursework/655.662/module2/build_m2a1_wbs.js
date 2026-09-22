// M2A1 — Work Breakdown Structure for the PD-RPM remote care system.
// One page, US Letter landscape, Arial.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const W = 960, H = 720;

const LEFT_COL = [
  { id: '1.1', name: 'Home Data Acquisition', kids: [
    '1.1.1  Cycler Data Interface Module',
    '1.1.2  Patient Vitals Peripherals (BP, scale)',
    '1.1.3  Patient App — Symptoms & Exit Site',
    '1.1.4  Home Gateway & Store-Forward',
  ]},
  { id: '1.2', name: 'Data Transport & Integration', kids: [
    '1.2.1  Secure Transport & Encryption',
    '1.2.2  EHR Integration Interface (HL7/FHIR)',
    '1.2.3  Ingestion & Data Normalization',
  ]},
  { id: '1.3', name: 'Clinical Monitoring', kids: [
    '1.3.1  Trending & Analytics Engine',
    '1.3.2  Alert & Threshold Logic',
    '1.3.3  Clinician Dashboard & Triage Queue',
    '1.3.4  Escalation & Notification Service',
  ]},
  { id: '1.4', name: 'Sustainment & Support', kids: [
    '1.4.1  Device Logistics & Kit Provisioning',
    '1.4.2  Patient / Care Partner Training',
    '1.4.3  Field & Technical Support Tooling',
  ]},
];

const RIGHT_COL = [
  { id: '1.5', name: 'Systems Engineering & Mgmt', kids: [
    '1.5.1  Requirements & Architecture',
    '1.5.2  Interface Management',
    '1.5.3  Trade Studies & Design Analysis',
    '1.5.4  Configuration & Data Management',
  ]},
  { id: '1.6', name: 'Integration, Test & Validation', kids: [
    '1.6.1  Component & Subsystem Test',
    '1.6.2  System Integration',
    '1.6.3  Clinical Usability Validation',
    '1.6.4  Cybersecurity & Penetration Test',
  ]},
  { id: '1.7', name: 'Risk Management', kids: [
    '1.7.1  Risk Identification',
    '1.7.2  Analysis & Mitigation Planning',
    '1.7.3  Risk Monitoring & Reporting',
  ]},
  { id: '1.8', name: 'Regulatory & Quality Assurance', kids: [
    '1.8.1  SaMD Classification & FDA Strategy',
    '1.8.2  HIPAA Privacy & Security Compliance',
    '1.8.3  QMS & Design History File',
  ]},
];

const EXCLUDED = [
  'PD cycler — manufacturer’s regulated Class II device; interface defined at 1.1.1',
  'Broadband / cellular carrier network; interface defined at 1.2.1',
  'EHR platform itself; interface defined at 1.2.2',
  'Dialysate manufacturing & distribution; interface defined at 1.4.1',
];

const BOX_W = 370, BOX_H = 30, KID_LH = 16, BLOCK_GAP = 14;
const COL_X = [40, 550];
const TOP_Y = 150;

const parts = [];

function column(items, x) {
  const spineX = x - 16;
  let y = TOP_Y;
  const stubs = [];
  items.forEach(({ id, name, kids }) => {
    stubs.push(y + BOX_H / 2);
    parts.push(
      `<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" fill="#E8EEF7" stroke="#1F3864" stroke-width="1.6"/>`,
      `<text x="${x + 10}" y="${y + 20}" font-size="12.5" font-weight="700" fill="#1F3864">${esc(id + '  ' + name)}</text>`
    );
    kids.forEach((k, i) =>
      parts.push(`<text x="${x + 18}" y="${y + BOX_H + 13 + i * KID_LH}" font-size="10.5" fill="#222">${esc(k)}</text>`)
    );
    y += BOX_H + kids.length * KID_LH + BLOCK_GAP;
  });
  // vertical spine plus a stub into each element box
  const last = stubs[stubs.length - 1];
  parts.push(`<line x1="${spineX}" y1="${TOP_Y + BOX_H / 2}" x2="${spineX}" y2="${last}" stroke="#1F3864" stroke-width="1.4"/>`);
  stubs.forEach((sy) =>
    parts.push(`<line x1="${spineX}" y1="${sy}" x2="${x}" y2="${sy}" stroke="#1F3864" stroke-width="1.4"/>`));
  return spineX;
}

const leftSpine = column(LEFT_COL, COL_X[0]);
const rightSpine = column(RIGHT_COL, COL_X[1]);

const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
     font-family="Arial, Helvetica, Liberation Sans, sans-serif">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>

  <text x="0" y="14" font-size="10.5" fill="#333">Vance Vanvolkenburgh · 655.662 Introduction to Healthcare Systems Engineering · Module 2 | M2A1: RCS WBS</text>
  <text x="0" y="42" font-size="20" font-weight="700" fill="#1F3864">Work Breakdown Structure — Peritoneal Dialysis Remote Patient Monitoring System</text>
  <line x1="0" y1="52" x2="${W}" y2="52" stroke="#AAA" stroke-width="0.8"/>

  <rect x="330" y="70" width="300" height="38" fill="#1F3864"/>
  <text x="480" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="#FFF">1.0  PD-RPM SYSTEM</text>

  <line x1="480" y1="108" x2="480" y2="126" stroke="#1F3864" stroke-width="1.6"/>
  <line x1="${leftSpine}" y1="126" x2="${rightSpine}" y2="126" stroke="#1F3864" stroke-width="1.6"/>
  <line x1="${leftSpine}" y1="126" x2="${leftSpine}" y2="${TOP_Y + BOX_H / 2}" stroke="#1F3864" stroke-width="1.4"/>
  <line x1="${rightSpine}" y1="126" x2="${rightSpine}" y2="${TOP_Y + BOX_H / 2}" stroke="#1F3864" stroke-width="1.4"/>

  ${parts.join('\n  ')}

  <rect x="0" y="592" width="${W}" height="88" fill="#F5F5F5" stroke="#BBB" stroke-width="1"/>
  <text x="12" y="611" font-size="11" font-weight="700" fill="#1F3864">Outside the WBS — required for operation, not built by this project (interface defined instead):</text>
  ${EXCLUDED.map((s, i) =>
    `<text x="20" y="${629 + i * 14}" font-size="10" fill="#333">•  ${esc(s)}</text>`).join('\n  ')}

  <text x="0" y="700" font-size="9.5" font-style="italic" fill="#666">Elements 1.5–1.8 are non-deliverable work packages: they consume schedule, budget, and staff, so they are carried in the WBS even though they produce no hardware.</text>
</svg>`;

fs.writeFileSync('M2A1_PD-RPM_WBS.svg', svg.replace('<svg ', `<svg width="${W}" height="${H}" `));

fs.writeFileSync('m2a1.html', `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: 11in 8.5in; margin: 0.5in; }
  html, body { margin: 0; padding: 0; background: #fff; }
  svg { display: block; width: ${W}px; height: ${H}px; }
</style>
${svg}
`);

console.log('svg + html written');
