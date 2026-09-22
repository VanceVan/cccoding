// M2A3 — Beer Game scenario in a healthcare setting.
// Two pages, US Letter portrait, Arial 11pt, double-spaced.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const PARAS = [
  '**The scenario.** Consider the chain that keeps one home peritoneal dialysis patient in therapy. Each month ' +
  'that patient receives dialysate bags, transfer sets, and cycler cassettes. Four parties stand between the ' +
  'sterile-fluid plant and the closet in the patient’s house: the dialysis organization’s home program, which ' +
  'places patient-level orders; a regional distributor that fills them; the manufacturer’s distribution ' +
  'center; and the plant itself. Each party sees only the orders placed immediately downstream, each holds ' +
  'protective inventory, and each is measured on its own fill rate. That is the Beer Game’s structure exactly ' +
  '— a serial chain, local information, local incentives.',

  '**The disturbance.** A hurricane closes the plant for three weeks and the manufacturer moves to allocation. ' +
  'Home programs hear this before any shortage reaches them, and each does the locally sensible thing: it ' +
  'orders two to three months of supply per patient instead of one. The distributor’s order book triples ' +
  'while patient census has not moved at all. The distribution center reads that spike as demand growth and ' +
  'orders aggressively upstream. The plant schedules overtime against what now looks structural. By the time ' +
  'that production arrives the programs are sitting on months of inventory and stop ordering, so the plant ' +
  'reads a collapse and cuts the line — shortly before the buffer empties and real orders return.',

  '**Where the delays live.** Two delays drive the oscillation, and they compound. The information delay is the ' +
  'lag between a program changing its order quantity and anyone upstream reading that change as demand rather ' +
  'than noise, which takes weeks of order history. The material delay is physical: compounding, sterilization, ' +
  'quality release, and transit run six to ten weeks. Because the material delay exceeds the ordering interval, ' +
  'every party orders again before its previous order arrives. Each shortage is ordered against two or three ' +
  'times, and the chain over-corrects by construction.',

  '**The communication breakdown.** Nobody lies, and each party reports accurately within its own frame. The ' +
  'home program never tells the distributor that its census is flat and it is deliberately building buffer, ' +
  'because no channel exists for saying so. The distributor has no visibility into census at all; it sees order ' +
  'quantities and nothing else. True demand — patients performing a fixed number of exchanges a day, a figure ' +
  'that barely moves — is the one quantity no node in the chain observes. Orders stand in for consumption, and ' +
  'under stress that proxy stops tracking what it represents.',

  '**Why the consequences exceed the Beer Game’s.** In Senge’s version the penalty is carrying cost and ' +
  'backlog. Here it is clinical. Patients under allocation are short-shipped, and some stretch supply by ' +
  'shortening dwell times or skipping an exchange, degrading ultrafiltration and clearance. Others transfer to ' +
  'in-center hemodialysis, and a meaningful share never return home. A three-week plant outage converts into ' +
  'permanent modality change for real people. That outcome is invisible to every node: the plant sees tons ' +
  'shipped, the distributor sees fill rate, and the only party positioned to see technique failure is the ' +
  'clinic, which has no view of the supply dynamics that caused it.',

  '**The cause is structural.** Senge’s central claim is that the same structure produces the same behavior ' +
  'regardless of who fills the roles, and this chain demonstrates it. The reflexive explanations — the ' +
  'manufacturer failed, the programs hoarded — are both the enemy-is-out-there response, and both miss that ' +
  'every actor behaved rationally on the information available. Replace every person in the chain with a more ' +
  'careful one and the oscillation returns.',

  '**What would change it.** Because the cause is structural, exhortation and better forecasting will not help; ' +
  'only changes to information flow will. Share true consumption rather than order quantities, so upstream ' +
  'parties see census and exchange counts instead of a proxy. Allocate on census rather than order history, ' +
  'which removes the incentive to inflate. And shorten the information delay by making consumption visible ' +
  'continuously rather than monthly. That last remedy is nearly free for a remote monitoring system: the cycler ' +
  'already reports every exchange it runs, so consumption is measured nightly and simply is not routed to the ' +
  'people who need it. The data exists; the feedback loop does not.',
];

const words = PARAS.join(' ').replace(/\*\*/g, '').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 1in; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 9pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 9pt; }
  p { text-align: justify; margin: 0; line-height: 2.0; text-indent: 0.3in; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 2 | M2A3: Beer Game Scenario
</div>
<div class="rule"></div>

<h1>A Beer Game in Nephrology: The Peritoneal Dialysis Solution Supply Chain</h1>

${PARAS.map((t) => `<p>${md(t)}</p>`).join('\n')}
`;

fs.writeFileSync('m2a3.html', html);
console.log('html written —', words, 'words');
