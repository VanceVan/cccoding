// 2.3.2 — N2 matrix and RTM rows for the Validate Data decomposition.
// Shared data; rendered to HTML here and to .xlsx by the companion python script.
const fs = require('fs');

const FN = ['7.1 Parse and Check Completeness', '7.2 Verify Patient Attribution',
  '7.3 Verify Acquisition Metadata', '7.4 Detect Duplicate Observations',
  '7.5 Classify Observation Validity', '7.6 Reconcile Expected Readings',
  '7.7 Assemble Validation Result'];

// control bands, in the column of each subfunction they govern
const CTL = [
  ['Infrastructure Regulations', [0]],
  ['System Configuration', [2, 4, 5]],
  ['Geography', [5]],
];

// external inputs, in the column of the receiving subfunction
const EXT_IN = [
  ['Encoded Patient Data', 0], ['Stored Patient Data', 1],
  ['Stored Patient Data', 3], ['Stored Patient Data', 5],
  ['Encoded Order Data', 5],
];

// external outputs, on the row of the producing subfunction
const EXT_OUT = { 6: ['Validated Patient Data', 'Encoded Validated Patient Data',
  'Encoded Clinical Data', 'Encoded System Data', 'Analytics Data'] };

// [producing, consuming, flow]
const FLOW = [
  [0, 1, 'Parsed Observation Data'],
  [1, 2, 'Attributed Observation Data'],
  [1, 3, 'Attributed Observation Data'],
  [2, 4, 'Metadata Verified Data'],
  [3, 4, 'Duplicate Finding Data'],
  [4, 6, 'Classified Observation Data'],
  [5, 6, 'Monitoring Gap Data'],
];

const RTM = [
  ['OR6',  [1]],
  ['OR7',  [2]],
  ['OR9',  [0, 3, 4, 6]],
  ['OR18', [5]],
  ['OR19', [5, 6]],
  ['OR21', [5, 6]],
  ['KPP1', [4, 6]],
  ['KPP3', [0, 1, 2, 3, 4]],
  ['KPP4', [5, 6]],
];

module.exports = { FN, CTL, EXT_IN, EXT_OUT, FLOW, RTM };

// ------------------------------------------------------------------ render --
if (require.main === module) {
  const short = FN.map((f) => f.split(' ')[0]);
  const css = `<style>
    body{margin:0;background:#fff;font-family:Helvetica,Arial,sans-serif}
    table{border-collapse:collapse;margin:14px}
    td,th{border:1px solid #333;padding:4px 6px;font-size:11px;vertical-align:middle;
      text-align:center;height:34px}
    td.d{background:#dae8fc;font-weight:bold;white-space:nowrap}
    td.c{background:#fff2cc;font-size:10px}
    td.g{background:#d5e8d4;font-size:10px}
    td.cfg{background:#dae8fc;font-size:10px}
    td.e{background:#f5f5f5;font-size:10px}
    td.f{font-size:10px}
    td.b{border:none;background:#fff}
    th{background:#eee;font-size:10px}
  </style>`;

  const band = (name, cols, cls) => `<tr><td class="b"></td>` +
    short.map((_, j) => cols.includes(j)
      ? `<td class="${cls}">${name}</td>` : `<td class="b"></td>`).join('') +
    `<td class="b"></td></tr>`;

  const inRow = (items) => `<tr><td class="b"></td>` +
    short.map((_, j) => {
      const hit = items.filter(([, c]) => c === j);
      return hit.length ? `<td class="e">${hit.map((h) => h[0]).join('<br>')}</td>`
                        : '<td class="b"></td>';
    }).join('') + `<td class="b"></td></tr>`;

  let n2 = `<table><tr><th></th>${short.map((s) => `<th>${s}</th>`).join('')}
    <th>External<br>outputs</th></tr>`;
  CTL.forEach(([nm, cols]) => {
    n2 += band(nm, cols, nm === 'Geography' ? 'g' : nm === 'System Configuration' ? 'cfg' : 'c');
  });
  n2 += inRow(EXT_IN);
  short.forEach((_, i) => {
    n2 += `<tr><th>${short[i]}</th>`;
    short.forEach((__, j) => {
      if (i === j) n2 += `<td class="d">${FN[i]}</td>`;
      else {
        const f = FLOW.find(([a, b]) => a === i && b === j);
        n2 += f ? `<td class="f">${f[2]}</td>` : '<td></td>';
      }
    });
    n2 += EXT_OUT[i] ? `<td class="e">${EXT_OUT[i].join('<br>')}</td>` : '<td class="b"></td>';
    n2 += '</tr>';
  });
  n2 += '</table>';

  let rtm = `<table><tr><th>Requirement</th>${short.map((s) => `<th>${s}</th>`).join('')}</tr>`;
  RTM.forEach(([id, cols]) => {
    rtm += `<tr><th>${id}</th>` +
      short.map((_, j) => cols.includes(j) ? '<td>&#10003;</td>' : '<td></td>').join('') + '</tr>';
  });
  rtm += '</table>';

  fs.writeFileSync(__dirname + '/m232_n2.html', css + n2);
  fs.writeFileSync(__dirname + '/m232_rtm.html', css + rtm);
  console.log('tables written —', FLOW.length, 'internal flows,', RTM.length, 'traced requirements');
}
