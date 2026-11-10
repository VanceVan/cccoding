// M9A3 — Word build. Same content module as the PDF.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, BorderStyle, HeadingLevel, AlignmentType,
} = require('docx');
const C = require('./m9a3_content.js');

const DXA = 1440, MT = Math.round(0.6 * DXA), MS = Math.round(0.85 * DXA);
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
  children: runs(text, { font: FONT, size: 19.5 }),
  spacing: { after: o.after === undefined ? 80 : o.after, line: 244 },
  ...(o.bullet ? { bullet: { level: 0 } } : {}),
});

const H = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, font: FONT, size: 19.5, color: '000000' })],
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 120, after: 50 },
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 19.5 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: MT, bottom: MT, left: MS, right: MS } } },
    children: [
      new Paragraph({ children: [new TextRun({ text: 'Vance Vanvolkenburgh', bold: true, font: FONT, size: 19 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: '655.662 — Introduction to Healthcare Systems Engineering', font: FONT, size: 19 })],
        spacing: { after: 0, line: 240 } }),
      new Paragraph({ children: [new TextRun({ text: 'Module 9 | M9A3: Team Success', font: FONT, size: 19 })],
        spacing: { after: 120, line: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } } }),
      new Paragraph({ children: [new TextRun({ text: C.TITLE, bold: true, font: FONT, size: 22 })],
        spacing: { after: 90, line: 258 } }),

      ...C.SECS.flatMap(([h, t]) => [H(h), P(t)]),

      H('What it changes at transition'),
      ...C.PRACTICES.map(([p]) => P(p, { bullet: true, after: 50 })),

      H('Why it lowers risk and sustains learning'),
      P(C.WHY), P(C.RISK), P(C.CLOSE, { after: 0 }),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync('Vanvolkenburgh_M9A3_Team_Success.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
