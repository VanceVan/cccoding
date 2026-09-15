const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, convertInchesToTwip,
} = require('docx');
const fs = require('fs');
const C = require('./content');

const FONT = 'Calibri';
const SIZE = 21;          // half-points -> 10.5pt
const LINE = 264;         // ~1.1 line spacing

const body = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 130, line: LINE },
  children: [new TextRun({ text, font: FONT, size: SIZE })],
});

const head = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 190, after: 70 },
  children: [new TextRun({ text, font: FONT, size: SIZE, bold: true, color: '1F3864' })],
});

const ref = (text) => new Paragraph({
  spacing: { after: 50, line: 240 },
  indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.35) },
  children: [new TextRun({ text, font: FONT, size: 17 })],
});

const children = [
  new Paragraph({
    spacing: { after: 10 },
    children: [new TextRun({ text: C.author, font: FONT, size: SIZE, bold: true })],
  }),
  new Paragraph({
    spacing: { after: 10 },
    children: [new TextRun({ text: C.course, font: FONT, size: 19 })],
  }),
  new Paragraph({
    spacing: { after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, space: 6, color: 'AAAAAA' } },
    children: [new TextRun({ text: C.assignment, font: FONT, size: 19 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 150 },
    children: [new TextRun({ text: C.title, font: FONT, size: 23, bold: true })],
  }),
];

for (const s of C.sections) {
  children.push(head(s.heading));
  children.push(body(s.body));
}

children.push(new Paragraph({
  spacing: { before: 210, after: 70 },
  children: [new TextRun({ text: 'References', font: FONT, size: 19, bold: true })],
}));
for (const r of C.references) children.push(ref(r));

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },  // US Letter
        margin: {
          top: convertInchesToTwip(0.8),
          bottom: convertInchesToTwip(0.8),
          left: convertInchesToTwip(0.9),
          right: convertInchesToTwip(0.9),
        },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync('Vanvolkenburgh_M1A1_Systems_Viewpoint.docx', buf);
  console.log('docx written');
});
