// M9A1 — Word build. Same content module as the PDF.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, PageBreak,
} = require('docx');
const C = require('./m9a1_content.js');

const DXA = 1440, MT = Math.round(0.6 * DXA), MS = Math.round(0.78 * DXA);
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

const P = (text, o = {}) => new Paragraph({
  children: runs(text, { font: FONT, size: o.size || 20 }),
  spacing: { after: o.after === undefined ? 90 : o.after, line: 250 },
});

const pct = (arr) => {
  const w = arr.map((p) => Math.round(W * p / 100));
  w[w.length - 1] = W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
};

const cellP = (children) => new Paragraph({ children, spacing: { after: 0, line: 212 } });

const cell = (children, width, o = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: o.head ? { type: ShadingType.CLEAR, fill: 'E8E8E8' } : undefined,
  margins: { top: 26, bottom: 26, left: 62, right: 62 },
  children,
});

const txt = (t, o = {}) => runs(t, { font: FONT, size: o.size || 15, bold: o.bold });

const header = (names, w) => new TableRow({
  tableHeader: true,
  children: names.map((t, i) => cell([cellP(txt(t, { bold: true }))], w[i], { head: true })),
});

const borders = ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
  .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 4, color: '1A1A1A' }, a), {});

// --- the ten items: title and concept tag stacked in one cell ---------------
const wItems = pct([4, 30, 66]);
const itemTable = new Table({
  columnWidths: wItems, width: { size: W, type: WidthType.DXA }, borders,
  rows: [
    header(['#', 'Critical item', 'What it requires of PD-RPM, and the risk it removes'], wItems),
    ...C.ITEMS.map(([n, t, c, x]) => new TableRow({
      children: [
        cell([new Paragraph({ children: txt(String(n), { bold: true }),
          alignment: AlignmentType.CENTER, spacing: { after: 0, line: 212 } })], wItems[0]),
        cell([cellP(txt(t, { bold: true })),
              new Paragraph({ children: txt(c, { size: 14 }), spacing: { after: 0, line: 212 } })],
             wItems[1]),
        cell([cellP(txt(x))], wItems[2]),
      ],
    })),
  ],
});

const wGate = pct([4, 15, 19, 9, 53]);
const gateTable = new Table({
  columnWidths: wGate, width: { size: W, type: WidthType.DXA }, borders,
  rows: [
    header(['#', 'Lead function', 'Supporting', 'Closes at', 'Evidence that closes it'], wGate),
    ...C.GATE.map((r) => new TableRow({
      children: r.map((v, i) => cell([
        i === 0
          ? new Paragraph({ children: txt(String(v), { bold: true }),
              alignment: AlignmentType.CENTER, spacing: { after: 0, line: 212 } })
          : cellP(txt(String(v))),
      ], wGate[i])),
    })),
  ],
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: MT, bottom: MT, left: MS, right: MS } } },
    children: [
      new Paragraph({ children: [new TextRun({ text: 'Vance Vanvolkenburgh', bold: true, font: FONT, size: 20 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: '655.662 — Introduction to Healthcare Systems Engineering', font: FONT, size: 20 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: 'Module 9 | M9A1: Production Transition', font: FONT, size: 20 })],
        spacing: { after: 140, line: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } } }),
      new Paragraph({ children: [new TextRun({ text: C.TITLE, bold: true, font: FONT, size: 23 })],
        spacing: { after: 120, line: 264 } }),

      P(C.INTRO),
      itemTable,

      new Paragraph({ children: [new PageBreak()] }),
      P(C.GATE_LEAD),
      gateTable,
      new Paragraph({ children: [], spacing: { after: 100 } }),
      P(C.WHO, { size: 18 }),
      P(C.WEIGHT, { size: 18, after: 0 }),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync('Vanvolkenburgh_M9A1_Production_Transition.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
