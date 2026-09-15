// Context diagram for PD remote monitoring, drawn in the JHU/Montoya slide style:
// black box, bare text labels, plain arrows, 3 flows per side.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const W = 1280, H = 720;
const BX = 460, BY = 308, BW = 300, BH = 174;      // black box
const BR = BX + BW, BB = BY + BH;

const LABEL = 22;        // label font size
const GAP = 14;          // arrow tip stand-off from the box

// ---- flows -----------------------------------------------------------------
const LEFT = [   // text -> box
  { y: 348, lines: ['Patient'] },
  { y: 395, lines: ['PD Cycler'] },
  { y: 442, lines: ['Care Partner'] },
];
const RIGHT = [  // box -> text
  { y: 348, lines: ['Patient Dialysis Vitals'] },
  { y: 395, lines: ['Monitoring System Status'] },
  { y: 442, lines: ['Clinical Alerts & Escalation'] },
];
const TOP = [    // text -> box (downward)
  { x: 470, lines: ['Health', 'Policies'] },
  { x: 610, lines: ['Health', 'Laws'] },
  { x: 750, lines: ['FDA Device', 'Regulations'] },
];
const BOTTOM = [ // text -> box (upward)
  { x: 470, lines: ['Infrastructure'] },
  { x: 610, lines: ['Home Layout'] },
  { x: 750, lines: ['Personnel'] },
];

// ---- emitters --------------------------------------------------------------
const txt = (x, y, s, anchor, size = LABEL, extra = '') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="#000"${extra}>${esc(s)}</text>`;

const line = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="2.2" marker-end="url(#a)"/>`;

const parts = [];

// left: label right-aligned, arrow into the box
LEFT.forEach(({ y, lines }) => {
  const top = y - ((lines.length - 1) * 27) / 2 + 8;
  lines.forEach((s, i) => parts.push(txt(316, top + i * 27, s, 'end')));
  parts.push(line(336, y, BX - GAP, y));
});

// right: arrow out of the box, label left-aligned
RIGHT.forEach(({ y, lines }) => {
  parts.push(line(BR + GAP, y, 892, y));
  const top = y - ((lines.length - 1) * 27) / 2 + 8;
  lines.forEach((s, i) => parts.push(txt(908, top + i * 27, s, 'start')));
});

// top: label above, arrow down into the box
TOP.forEach(({ x, lines }) => {
  const first = 160 - (lines.length - 1) * 28;
  lines.forEach((s, i) => parts.push(txt(x, first + i * 28, s, 'middle')));
  parts.push(line(x, 178, x, BY - GAP));
});

// bottom: label below, arrow up into the box
BOTTOM.forEach(({ x, lines }) => {
  parts.push(line(x, 592, x, BB + GAP));
  lines.forEach((s, i) => parts.push(txt(x, 622 + i * 28, s, 'middle')));
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

  <text x="70" y="98" font-size="46" font-weight="700" fill="#1F3864">PD Remote Monitoring System</text>
  <rect x="70" y="116" width="108" height="13" fill="#8AB6E0"/>
  <text x="1210" y="58" text-anchor="end" font-size="31" font-style="italic"
        font-weight="600" fill="#000">Context Diagram</text>

  ${parts.join('\n  ')}

  <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" fill="#000000" stroke="#1F3864" stroke-width="3"/>
  <text x="${BX + BW / 2}" y="${BY + 58}" text-anchor="middle" font-size="27" font-weight="700" fill="#FFF">Peritoneal Dialysis</text>
  <text x="${BX + BW / 2}" y="${BY + 93}" text-anchor="middle" font-size="27" font-weight="700" fill="#FFF">Remote Monitoring</text>
  <text x="${BX + BW / 2}" y="${BY + 128}" text-anchor="middle" font-size="27" font-weight="700" fill="#FFF">System</text>

  <rect x="948" y="646" width="302" height="42" fill="#E4E4E4"/>
  <text x="1099" y="673" text-anchor="middle" font-size="18" font-weight="700" fill="#000">Context Diagram is a “black box”</text>
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
