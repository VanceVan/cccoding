// M2A1 — Work Breakdown Structure for the PD-RPM remote care system.
// Document format: one page, US Letter portrait, Times New Roman 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const WBS = [
  { id: '1.1', name: 'Home Data Acquisition', kids: [
    ['1.1.1', 'Cycler Data Interface Module'],
    ['1.1.2', 'Vitals Peripherals (BP, scale)'],
    ['1.1.3', 'Patient Symptom & Exit-Site App'],
    ['1.1.4', 'Home Gateway & Store-Forward'],
  ]},
  { id: '1.2', name: 'Data Transport & Integration', kids: [
    ['1.2.1', 'Secure Transport & Encryption'],
    ['1.2.2', 'EHR Integration (HL7/FHIR)'],
    ['1.2.3', 'Ingestion & Data Normalization'],
  ]},
  { id: '1.3', name: 'Clinical Monitoring', kids: [
    ['1.3.1', 'Trending & Analytics Engine'],
    ['1.3.2', 'Alert & Threshold Logic'],
    ['1.3.3', 'Clinician Dashboard & Triage Queue'],
    ['1.3.4', 'Escalation & Notification Service'],
  ]},
  { id: '1.4', name: 'Sustainment & Support', kids: [
    ['1.4.1', 'Device Logistics & Provisioning'],
    ['1.4.2', 'Patient / Care Partner Training'],
    ['1.4.3', 'Field & Technical Support Tooling'],
  ]},
  { id: '1.5', name: 'Systems Engineering & Management', kids: [
    ['1.5.1', 'Requirements & Architecture'],
    ['1.5.2', 'Interface Management'],
    ['1.5.3', 'Trade Studies & Design Analysis'],
    ['1.5.4', 'Configuration & Data Management'],
  ]},
  { id: '1.6', name: 'Integration, Test & Validation', kids: [
    ['1.6.1', 'Component & Subsystem Test'],
    ['1.6.2', 'System Integration'],
    ['1.6.3', 'Clinical Usability Validation'],
    ['1.6.4', 'Cybersecurity & Penetration Test'],
  ]},
  { id: '1.7', name: 'Risk Management', kids: [
    ['1.7.1', 'Risk Identification'],
    ['1.7.2', 'Analysis & Mitigation Planning'],
    ['1.7.3', 'Risk Monitoring & Reporting'],
  ]},
  { id: '1.8', name: 'Regulatory & Quality Assurance', kids: [
    ['1.8.1', 'SaMD Classification & FDA Path'],
    ['1.8.2', 'HIPAA Privacy & Security'],
    ['1.8.3', 'QMS & Design History File'],
  ]},
];

const EXCLUDED = [
  ['PD cycler', 'manufacturer’s regulated Class II device; interface defined at 1.1.1'],
  ['Broadband / cellular carrier network', 'interface defined at 1.2.1'],
  ['EHR platform itself', 'interface defined at 1.2.2'],
  ['Dialysate manufacturing & distribution', 'interface defined at 1.4.1'],
];

const block = ({ id, name, kids }) => `
  <div class="grp">
    <div class="l2">${esc(id)}&nbsp;&nbsp;${esc(name)}</div>
    ${kids.map(([k, t]) => `<div class="l3">${esc(k)}&nbsp;&nbsp;${esc(t)}</div>`).join('\n    ')}
  </div>`;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.9in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Times New Roman", Tinos, Liberation Serif, serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { font-size: 10.5pt; line-height: 1.25; }
  .hdr b { font-size: 11pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 9pt; }
  h1 { font-size: 12pt; text-align: center; margin: 0 0 6pt; }
  p.intro { text-align: justify; margin: 0 0 9pt; line-height: 2.0; }
  .root { font-weight: bold; font-size: 11.5pt; margin-bottom: 5pt;
          border-bottom: 0.5pt solid #ccc; padding-bottom: 3pt; }
  .lvl { font-weight: normal; font-style: italic; font-size: 10pt; color: #444; }
  .cols { column-count: 2; column-gap: 0.38in; }
  .grp { break-inside: avoid; margin-bottom: 4pt; }
  .l2 { font-weight: bold; line-height: 2.0; }
  .l3 { padding-left: 0.2in; line-height: 2.0; }
  h2 { font-size: 11pt; margin: 8pt 0 3pt; }
  ul { margin: 0 0 6pt; padding-left: 0.26in; }
  li { line-height: 2.0; }
  .excl { margin-top: 4pt; border-top: 0.75pt solid #999; padding-top: 6pt;
           line-height: 1.35; }
  .excl-h { font-weight: bold; margin-bottom: 2pt; }
  .excl ul { margin: 3pt 0 0; padding-left: 0.26in; }
  .excl li { line-height: 1.35; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 2 | M2A1: RCS WBS
</div>
<div class="rule"></div>

<h1>Work Breakdown Structure — PD-RPM Remote Care System</h1>

<p class="intro">This work breakdown structure decomposes the PD-RPM remote care system using the
standard convention of end product, deliverables, and work packages. Deliverables 1.1–1.4 produce the
product itself; 1.5–1.8 produce no hardware but consume schedule, budget, and staff, and are carried
so the plan resources them.</p>

<div class="root">1.&nbsp;&nbsp;PD-RPM System&nbsp;&nbsp;<span class="lvl">(End Product)</span></div>

<div class="cols">
  ${WBS.map(block).join('\n')}
</div>

<div class="excl">
  <div class="excl-h">Outside the WBS</div>
  <div>Required for operation but not built by this project; an interface to each is defined instead.</div>
  <ul>
  ${EXCLUDED.map(([a, b]) => `<li><b>${esc(a)}</b> — ${esc(b)}</li>`).join('\n  ')}
  </ul>
</div>
`;

fs.writeFileSync('m2a1.html', html);
console.log('html written');
