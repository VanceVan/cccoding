// 2.3.2 — HFRMS Level 2 functional decomposition of F7 Validate Data.
// Styled to match the team's Level 1 draw.io diagram (colors taken from its source).
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// palette lifted verbatim from Functional Diagram.drawio
const C = {
  boundaryFill: '#f5f5f5', boundaryStroke: '#666666',
  infra: { fill: '#fff2cc', stroke: '#d6b656' },
  geo:   { fill: '#d5e8d4', stroke: '#82b366' },
  cfg:   { fill: '#dae8fc', stroke: '#6c8ebf' },
};

const BOX = [
  ['7.1', 'Parse and Check Completeness', 150, 140],
  ['7.2', 'Verify Patient Attribution',   330, 140],
  ['7.3', 'Verify Acquisition Metadata',  510, 140],
  ['7.5', 'Classify Observation Validity', 710, 140],
  ['7.4', 'Detect Duplicate Observations', 330, 270],
  ['7.6', 'Reconcile Expected Readings',  330, 400],
  ['7.7', 'Assemble Validation Result',   710, 400],
];
const BW = 140, BH = 58;

const fn = ([id, name, x, y]) => {
  const words = name.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 17) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  const all = [id + '.', ...lines];
  const start = y + BH / 2 - (all.length - 1) * 5.8 + 3.6;
  return `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" fill="#ffffff"
     stroke="#000000" stroke-width="1"/>
  ${all.map((t, i) => `<text x="${x + BW / 2}" y="${start + i * 11.6}" font-size="10"
     text-anchor="middle"${i === 0 ? ' font-weight="bold"' : ''}>${esc(t)}</text>`).join('')}`;
};

const ar = (pts, o = {}) => `<polyline points="${pts}" fill="none"
   stroke="${o.stroke || '#000000'}" stroke-width="${o.w || 1}"
   ${o.dash ? 'stroke-dasharray="5 3"' : ''} marker-end="url(#${o.m || 'k'})"/>`;

const lab = (x, y, t, anchor) =>
  `<text x="${x}" y="${y}" font-size="9" text-anchor="${anchor || 'middle'}">${esc(t)}</text>`;

const bar = (x, y, w, t, c) => `<rect x="${x}" y="${y}" width="${w}" height="26"
   fill="${c.fill}" stroke="${c.stroke}" stroke-width="1"/>
  <text x="${x + w / 2}" y="${y + 17}" font-size="10" text-anchor="middle">${esc(t)}</text>`;

const SVG = `<svg viewBox="-80 0 1190 600" width="100%"
  xmlns="http://www.w3.org/2000/svg" font-family="Helvetica, Arial, sans-serif">
<defs>
 <marker id="k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
   orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="#000000"/></marker>
 <marker id="y" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
   orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${C.infra.stroke}"/></marker>
 <marker id="g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
   orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${C.geo.stroke}"/></marker>
 <marker id="b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
   orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${C.cfg.stroke}"/></marker>
</defs>

<rect x="120" y="95" width="780" height="410" fill="${C.boundaryFill}"
   stroke="${C.boundaryStroke}" stroke-width="1"/>
<text x="128" y="110" font-size="9" fill="#333333">7. Validate Data</text>

${bar(160, 36, 160, 'Infrastructure Regulations', C.infra)}
${bar(300, 542, 150, 'Geography', C.geo)}
${bar(560, 542, 170, 'System Configuration', C.cfg)}

${BOX.map(fn).join('\n')}

${ar('220,62 220,140', { stroke: C.infra.stroke, m: 'y' })}
${ar('375,542 375,458', { stroke: C.geo.stroke, m: 'g', dash: true })}
${ar('600,542 600,480 430,480 430,458', { stroke: C.cfg.stroke, m: 'b' })}
${ar('690,542 690,215 580,215 580,198', { stroke: C.cfg.stroke, m: 'b' })}
${ar('690,215 820,215 820,198', { stroke: C.cfg.stroke, m: 'b' })}

${ar('120,169 150,169')}
${ar('290,169 330,169')}
${ar('470,169 510,169')}
${ar('650,169 710,169')}
${ar('400,198 400,270')}
${ar('120,315 330,315')}
${ar('270,315 270,220 360,220 360,198')}
${ar('470,299 760,299 760,198')}
${ar('300,315 300,415 330,415')}
${ar('120,443 330,443')}
${ar('470,429 710,429')}
${ar('780,198 780,400')}

${ar('850,429 875,429 875,185 900,185')}
${ar('875,245 900,245')}
${ar('875,305 900,305')}
${ar('875,365 900,365')}
${ar('850,449 900,449')}

${lab(310, 132, 'Parsed Observation Data')}
${lab(490, 132, 'Attributed Observation Data')}
${lab(680, 132, 'Metadata Verified Data')}
${lab(408, 238, 'Attributed Observation Data', 'start')}
${lab(615, 292, 'Duplicate Finding Data')}
${lab(590, 422, 'Monitoring Gap Data')}
${lab(780, 392, 'Classified Observation Data')}

${lab(116, 161, 'Encoded Patient Data', 'end')}
${lab(116, 308, 'Stored Patient Data', 'end')}
${lab(116, 436, 'Encoded Order Data', 'end')}

${lab(906, 181, 'Validated Patient Data', 'start')}
${lab(906, 241, 'Encoded Validated Patient Data', 'start')}
${lab(906, 301, 'Encoded Clinical Data', 'start')}
${lab(906, 361, 'Encoded System Data', 'start')}
${lab(906, 445, 'Analytics Data', 'start')}

${lab(906, 193, 'to 8. Store Data', 'start')}
${lab(906, 253, 'to 5. Compile Patient Data', 'start')}
${lab(906, 313, 'to 11. Display Clinical Data', 'start')}
${lab(906, 373, 'to 13. Display System Data', 'start')}

${lab(116, 173, 'from 5. Compile Patient Data', 'end')}
${lab(116, 320, 'from 8. Store Data', 'end')}
${lab(116, 448, 'from 12. Receive Clinical Input', 'end')}
</svg>`;

fs.writeFileSync('m232_fig.html',
  '<!doctype html><meta charset="utf-8">' +
  '<style>html,body{margin:0;padding:0;background:#fff}svg{display:block}</style>' +
  SVG.replace('width="100%"', 'width="1440"'));
console.log('figure html written');
