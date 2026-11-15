// 2.3.2 — Word output, matching the team's document defaults (theme font, 12pt, 1.15).
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun,
} = require('docx');

const SZ = 24;              // 12pt, as in the team's docx defaults
const SPACING = { after: 160, line: 278 };

const P = (text, o = {}) => new Paragraph({
  children: [new TextRun({ text, size: SZ, ...o })],
  spacing: SPACING,
  alignment: o.align,
});

const fig = fs.readFileSync(__dirname + '/m232_figure.png');

const img = (name, w, h) => new Paragraph({
  children: [new ImageRun({ type: 'png', data: fs.readFileSync(__dirname + '/' + name),
    transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 120, after: 120 },
});

const cap = (text) => new Paragraph({
  children: [new TextRun({ text, size: SZ })],
  alignment: AlignmentType.CENTER,
  spacing: SPACING,
});

const doc = new Document({
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    children: [
      new Paragraph({
        children: [new TextRun({ text: 'Functional Analysis – Level 2', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200, line: 278 },
      }),

      P('Function 7, Validate Data, was selected from the Level 1 functional diagram and ' +
        'decomposed into a Level 2 functional diagram, shown in Figure (X). The decomposition ' +
        'preserves every external interface that Function 7 presents to the rest of the HFRMS, ' +
        'so it can be substituted for Function 7 in the Level 1 diagram without altering any ' +
        'other function. Validate Data was chosen because it carries the largest share of the ' +
        'data integrity requirements and because every function downstream of it depends on its ' +
        'output.'),

      P('The control allocation rules established for the Level 1 diagram were applied unchanged. ' +
        'Infrastructure Regulations apply to 7.1, the only subfunction that sits at the boundary ' +
        'with the transmitted observation stream. Geography applies to 7.6, which reasons about ' +
        'devices physically separated from the monitoring platform. System Configuration applies ' +
        'to 7.3, 7.5 and 7.6, each governed by a parameter set maintained by non-clinical staff: ' +
        'the timestamp tolerance, the valid measurement ranges, and the monitoring interval. ' +
        'Privacy & Security Regulations and Clinical Governance were not allocated to Function 7 ' +
        'at Level 1 and are therefore not allocated to any of its subfunctions.'),

      new Paragraph({
        children: [new ImageRun({ type: 'png', data: fig,
          transformation: { width: 624, height: 326 } })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
      }),

      new Paragraph({
        children: [new TextRun({
          text: 'Figure (X). HFRMS Level 2 Functional Diagram – 7. Validate Data', size: SZ })],
        alignment: AlignmentType.CENTER,
        spacing: SPACING,
      }),

      P('Each subfunction was traced to the operational requirements and key performance ' +
        'parameters it satisfies, using the requirements traceability matrix in Figure (X). ' +
        'OR9 is distributed across four subfunctions because it names three distinct conditions, ' +
        'incomplete, duplicate and invalid, and requires each to be identified before evaluation ' +
        'or display. KPP3 is carried by the five subfunctions that establish accuracy and ' +
        'integrity, and KPP4 by the two that recover and reconcile monitoring data.'),

      img('m232_rtm.png', 268, 342),
      cap('Figure (X). HFRMS Level 2 RTM – 7. Validate Data'),

      P('The accompanying N2 diagram is shown in Figure (X). It records the seven internal flows ' +
        'between subfunctions, the controls allocated to each, and the external interfaces the ' +
        'decomposition inherits from Function 7 at Level 1.'),

      img('m232_n2.png', 624, 195),
      cap('Figure (X). HFRMS Level 2 N2 Diagram – 7. Validate Data'),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync(__dirname + '/2.3.2 - Functional Architecture 2.docx', b);
  console.log('docx written —', b.length, 'bytes');
});
