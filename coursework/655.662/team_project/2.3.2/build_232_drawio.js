// 2.3.2 — editable draw.io source. Geometry matches the rendered figure
// (shifted +80 in x so nothing sits at a negative coordinate).
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const S = {
  boundary: 'rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;fontColor=#333333;' +
            'strokeColor=#666666;verticalAlign=top;align=left;spacingLeft=6;spacingTop=2;',
  fn: 'rounded=0;whiteSpace=wrap;html=1;',
  ext: 'text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;verticalAlign=middle;rounded=0;',
  flow: 'text;html=1;whiteSpace=wrap;fillColor=none;align=center;verticalAlign=middle;rounded=0;' +
        'fontFamily=Helvetica;fontSize=9;fontColor=default;gradientColor=none;fontStyle=0;',
  infra: 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;rounded=0;' +
         'fillColor=#fff2cc;strokeColor=#d6b656;',
  geo: 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;rounded=0;' +
       'fillColor=#d5e8d4;strokeColor=#82b366;',
  cfg: 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;rounded=0;' +
       'fillColor=#dae8fc;strokeColor=#6c8ebf;',
};
const E = 'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;';

let n = 0;
const out = [];
const V = (id, value, style, x, y, w, h) => {
  out.push(`        <mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>`);
  return id;
};
const Edge = (src, tgt, opt = {}) => {
  const id = `e${++n}`;
  const st = E + (opt.exit ? `exitX=${opt.exit[0]};exitY=${opt.exit[1]};exitDx=0;exitDy=0;` : '')
    + (opt.entry ? `entryX=${opt.entry[0]};entryY=${opt.entry[1]};entryDx=0;entryDy=0;` : '')
    + (opt.stroke ? `strokeColor=${opt.stroke};` : '') + (opt.dashed ? 'dashed=1;' : '');
  const pts = (opt.points || []).map(([x, y]) => `            <mxPoint x="${x}" y="${y}" />`).join('\n');
  out.push(`        <mxCell id="${id}" style="${st}" edge="1" parent="1" source="${src}" target="${tgt}">
          <mxGeometry relative="1" as="geometry">${pts ? `
            <Array as="points">
${pts}
            </Array>` : ''}
          </mxGeometry>
        </mxCell>`);
};

// ---- containers, controls, functions --------------------------------------
V('bnd', '7. Validate Data', S.boundary, 200, 95, 780, 410);
V('ctlInfra', 'Infrastructure Regulations', S.infra, 240, 36, 160, 26);
V('ctlGeo', 'Geography', S.geo, 380, 542, 150, 26);
V('ctlCfg', 'System Configuration', S.cfg, 640, 542, 170, 26);

const FN = [
  ['f71', '<b>7.1.</b><br>Parse and Check Completeness', 230, 140],
  ['f72', '<b>7.2.</b><br>Verify Patient Attribution', 410, 140],
  ['f73', '<b>7.3.</b><br>Verify Acquisition Metadata', 590, 140],
  ['f75', '<b>7.5.</b><br>Classify Observation Validity', 790, 140],
  ['f74', '<b>7.4.</b><br>Detect Duplicate Observations', 410, 270],
  ['f76', '<b>7.6.</b><br>Reconcile Expected Readings', 410, 400],
  ['f77', '<b>7.7.</b><br>Assemble Validation Result', 790, 400],
];
FN.forEach(([id, v, x, y]) => V(id, v, S.fn, x, y, 140, 58));

// ---- external interface labels --------------------------------------------
V('in1', 'Encoded Patient Data<br>from 5. Compile Patient Data', S.ext + 'align=right;', 4, 152, 192, 34);
V('in2', 'Stored Patient Data<br>from 8. Store Data', S.ext + 'align=right;', 4, 298, 192, 34);
V('in3', 'Encoded Order Data<br>from 12. Receive Clinical Input', S.ext + 'align=right;', 4, 426, 192, 34);
V('o1', 'Validated Patient Data<br>to 8. Store Data', S.ext + 'align=left;', 984, 168, 220, 34);
V('o2', 'Encoded Validated Patient Data<br>to 5. Compile Patient Data', S.ext + 'align=left;', 984, 228, 220, 34);
V('o3', 'Encoded Clinical Data<br>to 11. Display Clinical Data', S.ext + 'align=left;', 984, 288, 220, 34);
V('o4', 'Encoded System Data<br>to 13. Display System Data', S.ext + 'align=left;', 984, 348, 220, 34);
V('o5', 'Analytics Data', S.ext + 'align=left;', 984, 439, 220, 20);

// ---- flow labels -----------------------------------------------------------
V('l1', 'Parsed Observation Data', S.flow, 320, 118, 140, 20);
V('l2', 'Attributed Observation Data', S.flow, 500, 118, 140, 20);
V('l3', 'Metadata Verified Data', S.flow, 690, 118, 140, 20);
V('l4', 'Attributed Observation Data', S.flow + 'align=left;', 488, 224, 150, 20);
V('l5', 'Duplicate Finding Data', S.flow, 625, 278, 140, 20);
V('l6', 'Monitoring Gap Data', S.flow, 600, 408, 140, 20);
V('l7', 'Classified Observation Data', S.flow, 790, 378, 140, 20);

// ---- data flows ------------------------------------------------------------
Edge('in1', 'f71', { exit: [1, 0.5], entry: [0, 0.5] });
Edge('f71', 'f72', { exit: [1, 0.5], entry: [0, 0.5] });
Edge('f72', 'f73', { exit: [1, 0.5], entry: [0, 0.5] });
Edge('f73', 'f75', { exit: [1, 0.5], entry: [0, 0.5] });
Edge('f72', 'f74', { exit: [0.5, 1], entry: [0.5, 0] });
Edge('in2', 'f74', { exit: [1, 0.5], entry: [0, 0.776] });
Edge('in2', 'f72', { exit: [1, 0.5], entry: [0.214, 1],
  points: [[350, 315], [350, 220], [440, 220]] });
Edge('in2', 'f76', { exit: [1, 0.5], entry: [0, 0.259],
  points: [[380, 315], [380, 415]] });
Edge('in3', 'f76', { exit: [1, 0.5], entry: [0, 0.741] });
Edge('f74', 'f75', { exit: [1, 0.5], entry: [0.357, 1], points: [[840, 299]] });
Edge('f76', 'f77', { exit: [1, 0.5], entry: [0, 0.5] });
Edge('f75', 'f77', { exit: [0.5, 1], entry: [0.5, 0] });

// ---- output distribution ---------------------------------------------------
Edge('f77', 'o1', { exit: [1, 0.5], entry: [0, 0.5], points: [[955, 429], [955, 185]] });
Edge('f77', 'o2', { exit: [1, 0.5], entry: [0, 0.5], points: [[955, 429], [955, 245]] });
Edge('f77', 'o3', { exit: [1, 0.5], entry: [0, 0.5], points: [[955, 429], [955, 305]] });
Edge('f77', 'o4', { exit: [1, 0.5], entry: [0, 0.5], points: [[955, 429], [955, 365]] });
Edge('f77', 'o5', { exit: [1, 0.845], entry: [0, 0.5] });

// ---- control flows ---------------------------------------------------------
Edge('ctlInfra', 'f71', { exit: [0.375, 1], entry: [0.5, 0], stroke: '#d6b656' });
Edge('ctlGeo', 'f76', { exit: [0.5, 0], entry: [0.321, 1], stroke: '#82b366', dashed: true });
Edge('ctlCfg', 'f76', { exit: [0.235, 0], entry: [0.714, 1], stroke: '#6c8ebf',
  points: [[680, 480], [510, 480]] });
Edge('ctlCfg', 'f73', { exit: [0.765, 0], entry: [0.5, 1], stroke: '#6c8ebf',
  points: [[770, 215], [660, 215]] });
Edge('ctlCfg', 'f75', { exit: [0.765, 0], entry: [0.786, 1], stroke: '#6c8ebf',
  points: [[770, 215], [900, 215]] });

const xml = `<mxfile host="app.diagrams.net">
  <diagram name="7. Validate Data (Level 2)" id="hfrms-l2-f7">
    <mxGraphModel dx="1100" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1"
      arrows="1" fold="1" page="1" pageScale="1" pageWidth="1300" pageHeight="700" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
${out.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`;
fs.writeFileSync(__dirname + '/Functional Diagram - Level 2 (7. Validate Data).drawio', xml);
console.log('drawio written —', xml.length, 'bytes,', n, 'edges,', FN.length, 'functions');
