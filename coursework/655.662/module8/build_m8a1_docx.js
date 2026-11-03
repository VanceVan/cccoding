// M8A1 — Word build. All content comes from m8a1_content.js, same as the PDF.
const fs = require('fs');
const d = require('docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, PageBreak, ImageRun,
} = d;
const C = require('./m8a1_content.js');

const DXA = 1440;
const MT = Math.round(0.62 * DXA), MS = Math.round(0.8 * DXA);
const W = 12240 - 2 * MS;                       // usable content width, 9936 dxa
const FONT = 'Arial';

// ---- **bold** / *italic* inline markup -> runs -----------------------------
const runs = (s, opt = {}) => {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
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
  spacing: { after: o.after === undefined ? 80 : o.after, line: o.line || 250 },
  alignment: o.align,
  ...(o.border ? { border: o.border } : {}),
});

const H = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, font: FONT, size: 21, color: '000000' })],
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 110, after: 45 },
});

const cell = (text, width, o = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: o.head ? { type: ShadingType.CLEAR, fill: 'E8E8E8' } : undefined,
  margins: { top: 22, bottom: 22, left: 60, right: 60 },
  children: [new Paragraph({
    children: runs(text, { font: FONT, size: o.size || 14, bold: o.head || o.bold }),
    spacing: { after: 0, line: 206 },
  })],
});

const table = (widths, head, rows, boldFirst) => new Table({
  columnWidths: widths,
  width: { size: W, type: WidthType.DXA },
  borders: ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
    .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 4, color: '1A1A1A' }, a), {}),
  rows: [
    new TableRow({
      tableHeader: true,
      children: head.map((t, i) => cell(t, widths[i], { head: true })),
    }),
    ...rows.map((r) => new TableRow({
      children: r.map((t, i) => cell(t, widths[i], { bold: boldFirst && i === 0 })),
    })),
  ],
});

// ---------------------------------------------------------------- document --
const hdr = [
  new Paragraph({ children: [new TextRun({ text: 'Vance Vanvolkenburgh', bold: true, font: FONT, size: 20 })],
    spacing: { after: 0, line: 240 } }),
  new Paragraph({ children: [new TextRun({ text: '655.662 — Introduction to Healthcare Systems Engineering', font: FONT, size: 20 })],
    spacing: { after: 0, line: 240 } }),
  new Paragraph({
    children: [new TextRun({ text: 'Module 8 | M8A1: Integration Plan', font: FONT, size: 20 })],
    spacing: { after: 140, line: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } },
  }),
  new Paragraph({
    children: [new TextRun({ text: C.TITLE, bold: true, font: FONT, size: 23 })],
    spacing: { after: 120, line: 264 },
  }),
];

const fig = fs.readFileSync('m8a1_figure.png');

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 },
              margin: { top: MT, bottom: MT, left: MS, right: MS } },
    },
    children: [
      ...hdr,

      H('1. Integration strategy'),
      P(C.S1A), P(C.S1B), P(C.S1C),

      H('2. Method'),
      table([1420, 8516], ['Step', 'How it is applied to PD-RPM'],
        C.S2.map(([a, b]) => [a, b]), true),

      H('3. The gate rule — what opens and closes a stage'),
      P('Every gate in Figure 1 applies the same seven criteria. They are the mechanism by which ' +
        'the plan prevents error rather than discovering it late.'),
      table([1060, 8876], ['Type', 'Criterion'], C.GATE.map(([a, b]) => [a, b]), true),

      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        children: [new ImageRun({ type: 'png', data: fig,
          transformation: { width: 560, height: 866 } })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Figure 1. ', bold: true, font: FONT, size: 17 }),
          new TextRun({ text: 'Integration build-up for PD-RPM. Two threads are built in parallel, ' +
            'converge at S5, and the patient is added last. Gate G8 is validation; every gate ' +
            'before it is verification.', font: FONT, size: 17 }),
        ],
        spacing: { after: 0, line: 240 },
      }),

      new Paragraph({ children: [new PageBreak()] }),
      H('4. Stage detail and exit criteria'),
      table([740, 2340, 1240, 1380, 4236],
        ['Stage', 'Objects added', 'Interfaces closed', 'V&V method', 'Exit criterion'],
        C.TBL, true),

      H('5. Risk reduction'),
      table([3180, 6756],
        ['Risk the sequence is designed against', 'How the sequence reduces it'],
        C.RISK.map(([a, b]) => [a, b]), true),

      H('6. Early error detection'),
      P(C.DETECT),

      H('7. Why the plan is agile, and what that buys'),
      P(C.AGILE1), P(C.AGILE2),

      H('8. Verification, validation, and configuration control'),
      P(C.CLOSE, { after: 0 }),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync('Vanvolkenburgh_M8A1_Integration_Plan.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
