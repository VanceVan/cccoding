// M8A2 — Word build. Same content module as the PDF.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, PageBreak, ImageRun,
} = require('docx');
const C = require('./m8a2_content.js');

const DXA = 1440, MT = Math.round(0.62 * DXA), MS = Math.round(0.8 * DXA);
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
  spacing: { after: o.after === undefined ? 80 : o.after, line: 250 },
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
    children: runs(text, { font: FONT, size: 14, bold: o.head || o.bold }),
    spacing: { after: 0, line: 206 },
  })],
});

const pct = (arr) => {
  const w = arr.map((p) => Math.round(W * p / 100));
  w[w.length - 1] = W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
};

const table = (head, rows, widths) => {
  const w = pct(widths);
  return new Table({
    columnWidths: w,
    width: { size: W, type: WidthType.DXA },
    borders: ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
      .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 4, color: '1A1A1A' }, a), {}),
    rows: [
      new TableRow({ tableHeader: true,
        children: head.map((t, i) => cell(t, w[i], { head: true })) }),
      ...rows.map((r) => new TableRow({
        children: r.map((t, i) => cell(t, w[i], { bold: i === 0 })) })),
    ],
  });
};

const fig = fs.readFileSync('m8a2_figure.png');

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
      new Paragraph({ children: [new TextRun({ text: 'Module 8 | M8A2: Test & Assessment Approach', font: FONT, size: 20 })],
        spacing: { after: 140, line: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } } }),
      new Paragraph({ children: [new TextRun({ text: C.TITLE, bold: true, font: FONT, size: 23 })],
        spacing: { after: 120, line: 264 } }),

      H('1. Approach'), P(C.P1), P(C.P2), P(C.P3),
      H('2. Test levels'),
      table(['Level', 'Name', 'What is under test', 'Where it happens', 'V&V class'],
        C.LVL, [7, 13, 31, 34, 15]),
      H('3. Assessment methods'),
      table(['Method', 'Definition', 'Worked example in PD-RPM'], C.METH, [14, 34, 52]),
      H('4. Coverage model'),
      table(['Dimension', 'What is required'], C.COV, [22, 78]),

      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ children: [new ImageRun({ type: 'png', data: fig,
        transformation: { width: 620, height: 556 } })],
        alignment: AlignmentType.CENTER, spacing: { after: 90 } }),
      new Paragraph({ children: [
        new TextRun({ text: 'Figure 1. ', bold: true, font: FONT, size: 17 }),
        new TextRun({ text: 'Test and assessment V-model for PD-RPM. Each horizontal pair binds a ' +
          'definition artifact to the level that tests it. Scenario A climbs every level; Scenario B ' +
          'exists only at L4 and L5.', font: FONT, size: 17 })],
        spacing: { after: 140, line: 240 } }),

      H('5. Scenario A — declining ultrafiltration trend (nominal path, incremental)'),
      P('A patient’s net ultrafiltration falls steadily across 14 treatments. This is operational ' +
        'requirement OR-1, the system’s primary clinical purpose, and it is retested at all five levels.'),
      table(['Level', 'Configuration under test', 'Stimulus', 'Pass criterion', 'Method'],
        C.SCA, [7, 23, 23, 35, 12]),

      new Paragraph({ children: [new PageBreak()] }),
      H('6. Scenario B — silent gateway across three Sunday nights (exceptional path, total system)'),
      table(['Step', 'Action', 'Condition', 'Expected system response and pass criterion'],
        C.SCB, [6, 18, 31, 45]),
      P(C.SCB_WHY),
      H('7. Functionality and utility, scored separately'),
      table(['Scenario', 'Functionality — does it meet the specification?',
             'Utility — is the care team better off?'], C.FU, [24, 38, 38]),
      H('8. Risk mitigation through the test program'),
      table(['Risk', 'How the approach mitigates it'], C.RISKC, [28, 72]),
      H('9. Why the approach is agile'), P(C.AGILE),
      H('10. Coverage, limits, and end-to-end assurance'), P(C.CLOSE, { after: 0 }),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync('Vanvolkenburgh_M8A2_Test_Assessment_Approach.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
