// Context diagram for PD remote monitoring in the JHU/Montoya slide style,
// with every boundary-crossing flow labeled (rubric: system, entities,
// labeled data flows, clear direction).
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const W = 1280, H = 720;
const BX = 500, BY = 300, BW = 280, BH = 170;
const BR = BX + BW, BB = BY + BH;

const ENT = 22;          // entity label size
const FLW = 13.5;        // flow label size
const GAP = 14;          // arrow stand-off from the box

// entity = who/what sits outside; flow = what crosses the boundary
const LEFT = [
  { y: 330, name: ['Patient'],       flow: ['weight, BP, symptoms,', 'exit-site reports'] },
  { y: 388, name: ['PD Cycler'],     flow: ['fill/drain volumes,', 'dwell times, UF, alarms'] },
  { y: 446, name: ['Care Partner'],  flow: ['setup assistance,', 'confirmations'] },
];
const RIGHT = [
  { y: 330, name: ['Home Dialysis Nurse'], flow: ['adherence, alarms,', 'trend summaries'] },
  { y: 388, name: ['Nephrologist'],        flow: ['adequacy & volume', 'trends'] },
  { y: 446, name: ['Dialysis Center'],     flow: ['peritonitis / access', 'escalation'] },
];
const TOP = [
  { x: 515, name: ['Health', 'Policies'],          flow: ['CMS ESRD &', 'ETC rules'] },
  { x: 640, name: ['Health', 'Laws'],              flow: ['HIPAA privacy', '& security'] },
  { x: 765, name: ['FDA Device', 'Regulations'],   flow: ['SaMD device', 'classification'] },
];
const BOTTOM = [
  { x: 515, name: ['Infrastructure'],  flow: ['power,', 'broadband'] },
  { x: 640, name: ['Home', 'Layout'],  flow: ['storage,', 'cycler space'] },
  { x: 765, name: ['Personnel'],       flow: ['training,', 'field support'] },
];

const txt = (x, y, s, anchor, size, extra = '') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="#000"${extra}>${esc(s)}</text>`;

const flowTxt = (x, y, s, anchor) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${FLW}" font-style="italic" fill="#333">${esc(s)}</text>`;

const arrow = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="2.2" marker-end="url(#a)"/>`;

const parts = [];

// LEFT — entity, arrow into the box, flow label above the arrow
LEFT.forEach(({ y, name, flow }) => {
  const top = y - ((name.length - 1) * 27) / 2 + 8;
  name.forEach((s, i) => parts.push(txt(220, top + i * 27, s, 'end', ENT)));
  parts.push(arrow(235, y, BX - GAP, y));
  flow.forEach((s, i) => parts.push(flowTxt(360, y - 23 + i * 14, s, 'middle')));
});

// RIGHT — arrow out of the box, flow label above the arrow, entity beyond
RIGHT.forEach(({ y, name, flow }) => {
  parts.push(arrow(BR + GAP, y, 1045, y));
  flow.forEach((s, i) => parts.push(flowTxt(920, y - 23 + i * 14, s, 'middle')));
  const top = y - ((name.length - 1) * 27) / 2 + 8;
  name.forEach((s, i) => parts.push(txt(1060, top + i * 27, s, 'start', ENT)));
});

// TOP — entity above, arrow down, flow label beside the arrow
TOP.forEach(({ x, name, flow }) => {
  const first = 162 - (name.length - 1) * 28;
  name.forEach((s, i) => parts.push(txt(x, first + i * 28, s, 'middle', ENT)));
  parts.push(arrow(x, 180, x, BY - GAP));
  flow.forEach((s, i) => parts.push(flowTxt(x + 9, 224 + i * 15, s, 'start')));
});

// BOTTOM — arrow up, flow label beside the arrow, entity below
BOTTOM.forEach(({ x, name, flow }) => {
  parts.push(arrow(x, 586, x, BB + GAP));
  flow.forEach((s, i) => parts.push(flowTxt(x + 9, 524 + i * 15, s, 'start')));
  name.forEach((s, i) => parts.push(txt(x, 618 + i * 28, s, 'middle', ENT)));
});

const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
     font-family="'Segoe UI', Calibri, Carlito, Arial, sans-serif">
  <defs>
    <marker id="a" markerWidth="12" markerHeight="10" refX="11" refY="4"
            orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L12,4 L0,8 z" fill="#000"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>

  <text x="70" y="92" font-size="42" font-weight="700" fill="#1F3864">PD Remote Monitoring System</text>
  <rect x="70" y="108" width="100" height="12" fill="#8AB6E0"/>
  <text x="1215" y="54" text-anchor="end" font-size="29" font-style="italic"
        font-weight="600" fill="#000">Context Diagram</text>

  ${parts.join('\n  ')}

  <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" fill="#000000" stroke="#1F3864" stroke-width="3"/>
  <text x="${BX + BW / 2}" y="${BY + 56}" text-anchor="middle" font-size="25" font-weight="700" fill="#FFF">Peritoneal Dialysis</text>
  <text x="${BX + BW / 2}" y="${BY + 89}" text-anchor="middle" font-size="25" font-weight="700" fill="#FFF">Remote Monitoring</text>
  <text x="${BX + BW / 2}" y="${BY + 122}" text-anchor="middle" font-size="25" font-weight="700" fill="#FFF">System</text>

  <rect x="960" y="656" width="290" height="40" fill="#E4E4E4"/>
  <text x="1105" y="682" text-anchor="middle" font-size="17" font-weight="700" fill="#000">Context Diagram is a “black box”</text>
</svg>`;

fs.writeFileSync('PD-RPM_context_diagram_JHU_style.svg',
  svg.replace('<svg ', `<svg width="${W}" height="${H}" `));

fs.writeFileSync('ctx_jhu.html', `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: ${W / 96}in ${H / 96}in; margin: 0; }
  html, body { margin: 0; padding: 0; background: #fff; }
  svg { display: block; width: ${W}px; height: ${H}px; }
</style>
${svg}
`);

console.log('svg + html written');
