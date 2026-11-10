// M9A2 — Word build. Same content module as the PDF.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle,
} = require('docx');
const C = require('./m9a2_content.js');

const DXA = 1440, MT = Math.round(0.58 * DXA), MS = Math.round(0.75 * DXA);
const W = 12240 - 2 * MS;
const FONT = 'Arial';

const runs = (s, opt = {}) => {
  const out = []; const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let last = 0, m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: s.slice(last, m.index), ...opt }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...opt }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...opt }));
    last = m.index + t.length;
  }
  if (last < s.length) out.push(new TextRun({ text: s.slice(last), ...opt }));
  return out;
};

const pct = (arr) => {
  const w = arr.map((p) => Math.round(W * p / 100));
  w[w.length - 1] = W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
};
const cellP = (children) => new Paragraph({ children, spacing: { after: 0, line: 208 } });
const txt = (t, o = {}) => runs(t, { font: FONT, size: o.size || 14.5, bold: o.bold });
const cell = (children, width, head) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: head ? { type: ShadingType.CLEAR, fill: 'E8E8E8' } : undefined,
  margins: { top: 24, bottom: 24, left: 58, right: 58 },
  children,
});

const w = pct([19, 27, 30, 24]);
const borders = ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
  .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 4, color: '1A1A1A' }, a), {});

const table = new Table({
  columnWidths: w, width: { size: W, type: WidthType.DXA }, borders,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        'Area, and who is at the table',
        'Weighed concurrently: feasibility, manufacturability, cost',
        'Risk retired early, and how the design is optimized for production',
        'Documentation trail',
      ].map((t, i) => cell([cellP(txt(t, { bold: true }))], w[i], true)),
    }),
    ...C.AREAS.map(([a, f, c, r, d], i) => new TableRow({
      children: [
        cell([cellP(txt(`${i + 1}. ${a}`, { bold: true })),
              new Paragraph({ children: txt(f, { size: 13.5 }),
                spacing: { after: 0, line: 208 } })], w[0]),
        cell([cellP(txt(c))], w[1]),
        cell([cellP(txt(r))], w[2]),
        cell([cellP(txt(d))], w[3]),
      ],
    })),
  ],
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: MT, bottom: MT, left: MS, right: MS } } },
    children: [
      new Paragraph({ children: [new TextRun({ text: 'Vance Vanvolkenburgh', bold: true, font: FONT, size: 19 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: '655.662 — Introduction to Healthcare Systems Engineering', font: FONT, size: 19 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: 'Module 9 | M9A2: Concurrent Engineering', font: FONT, size: 19 })],
        spacing: { after: 120, line: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } } }),
      new Paragraph({ children: [new TextRun({ text: C.TITLE, bold: true, font: FONT, size: 22 })],
        spacing: { after: 100, line: 260 } }),
      new Paragraph({ children: runs(C.INTRO, { font: FONT, size: 20 }),
        spacing: { after: 90, line: 244 } }),
      table,
      new Paragraph({ children: [], spacing: { after: 80 } }),
      new Paragraph({ children: runs(C.CLOSE, { font: FONT, size: 17.5 }),
        spacing: { after: 0, line: 240 } }),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync('Vanvolkenburgh_M9A2_Concurrent_Engineering.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
