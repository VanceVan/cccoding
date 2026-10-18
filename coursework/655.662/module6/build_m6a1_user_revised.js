// M6A1 — the user's own rewrite, with accuracy corrections and number styling only.
// Prose is the user's; edits are limited to factual/grammatical errors and numerals.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const P = [];

P.push(
  'Advanced development is the process of developing a product or technology beyond a conceptual stage, ' +
  'yet prior to establishing a final design. Advanced development’s purpose is not to develop the ' +
  'product itself; however, it does remove the uncertainty that could surface later, when correcting errors ' +
  'may result in significant expense.');

P.push(
  'Six separate areas of focus provide advanced development with its other name, risk reduction. As stated ' +
  'by the class materials, the goal of prototyping and competition is to lower technical, cost and schedule ' +
  'risks. Each area listed below has been associated with both a type of risk and an example of how each of ' +
  'those types of risk relates to the PD-RPM (peritoneal dialysis remote patient monitoring) system, ' +
  'developed throughout this course.');

P.push(
  '1. Identify and rank high-risk items. The first part of advanced development is determining where the ' +
  'risk truly is, so that instead of distributing the resources equally throughout the system, effort can be ' +
  'focused on those few aspects that require attention. By doing so, programmatic risk, the risk of using ' +
  'advanced development funds on the incorrect elements, is reduced. An example of this is the technology ' +
  'readiness survey that was conducted for PD-RPM’s 20 physical elements. While 19 of the physical ' +
  'elements had a technology readiness level (TRL) rating of 9 (commercial cuffs, scales, workstations, ' +
  'etc.), only one of the 20 had a TRL rating of 6. That element was the HG-1 home gateway, with its ' +
  'cellular store-and-forward firmware. In addition, the companion risk associated with this element, ' +
  '“silent loss” of home data delivery, had a rating of 4 × 4 = 16. Therefore, advanced ' +
  'development was essentially confined to the HG-1 home gateway, and the remaining commercial elements ' +
  'were allowed to proceed without additional development.');

P.push(
  '2. Requirements analysis and flow-down to a validated specification. System requirements are determined ' +
  'through analyzing operational requirements. These system requirements are then tested to ensure that ' +
  'they exist as intended and are tied directly to their respective sub-functions. Verification risk is ' +
  'reduced as ambiguities are identified on paper versus at the time of acceptance testing. An example of ' +
  'this is the PD-RPM operational requirement that requires each completed treatment record be transferred ' +
  'to the monitoring center within 30 minutes of completion. Flow down to this requirement resulted in four ' +
  'different timed functions including a pairing timeout of 10 seconds, a buffer write confirm period of 2 ' +
  'seconds, a 5-minute retry interval over 12 attempts for uploading treatment records, and an ingest delay ' +
  'until available of 90 seconds. However, none of the requirements made provisions for carrier ' +
  're-registration delays (4 minutes). That gap only became visible once the budget was written out.');

P.push(
  '3. Component trade studies. Engineering trade studies are the primary tool employed in advanced ' +
  'development. Alternatives to various component selections are analyzed and compared based upon weighted ' +
  'criteria that relate directly to functional requirements. Cost and schedule risks are lowered as ' +
  'alternatives that lose are removed prior to purchasing any goods or supplies. An example of this is the ' +
  'PD-RPM connectivity trade study that evaluated four alternative methods of connecting patient homes to ' +
  'the monitoring center using four different criteria. The method employing a tethered smartphone ' +
  'connection was less costly than all other options by a factor of four; however, it was eliminated from ' +
  'consideration due to its inability to achieve a required KPP (data completeness) of 95 percent (91 ' +
  'percent achieved). If the same shortfall had been discovered in the field after 150 gateways were ' +
  'deployed, eliminating the tethered option would have resulted in a recall. Eliminating it on paper ' +
  'required one week of analysis.');

P.push(
  '4. Modeling and simulation. Measures related to feasibility and performance are quantified before actual ' +
  'hardware exists. Technical risk is thereby decreased at minimal cost and what was previously considered ' +
  'a design argument becomes a numeric value. An example of this is a discrete event simulation model used ' +
  'to quantify the buffer sizing necessary for a PD-RPM fleet of 150 patients. The model utilized data ' +
  'collected from previous sessions and data collected from measuring actual carrier outages. The results ' +
  'indicated that if a 72-hour buffer existed in the original concept, data loss would occur in ' +
  'approximately 8 percent of simulated months; whereas, if a 14-day buffer existed in the concept, no ' +
  'losses would occur. Prior to building any enclosures, the buffer size requirement was modified.');

P.push(
  '5. Prototype development for critical components. Explorative prototypes are built in order to allow ' +
  'users to explore requirements for products, while experimental prototypes are built to determine whether ' +
  'products will operate as planned. Both types of prototypes decrease technical risk and the experimental ' +
  'prototype can serve as a substitute for a formal requirements document. An example of this is an ' +
  'experimental HG-1 that represented a single board gateway operating with production firmware and no ' +
  'housing enclosure. The experimental HG-1 operated against 20 simulated cyclers on a carrier test network ' +
  'for 6 weeks under controlled conditions involving intentional SIM deactivation and intentional firmware ' +
  'failure. Results indicated that store-and-forward operations continued even though a 9-day outage ' +
  'occurred, and liveness heartbeat detected a dead link in less than 35 minutes.');

P.push(
  '6. Test planning for development tests and integration build-up planning. A test and evaluation plan ' +
  'along with an integration build up plan reduces integration risk, the risk that the first time that ' +
  'elements meet is also the first time someone discovers they don’t fit together properly. An example ' +
  'of this is the PD-RPM integration build up plan. The plan builds up from HG-1 alone on the bench; HG-1 ' +
  'with the cycler data port; HG-1 with the Bluetooth peripherals; HG-1 end-to-end to ingest service over a ' +
  'live carrier; monitoring center services against simulated feeds; full chain with simulated patients; ' +
  'full chain with clinicians in loop; and finally limited clinical evaluations with real patients last. ' +
  'With each build up step adding one new element, defects discovered can be attributed to the item ' +
  'recently added.');

const TBL = [
  ['1', 'Identify and rank high-risk elements', 'Programmatic',
   'HG-1 isolated at TRL 6 as the one element needing the phase'],
  ['2', 'Requirements flow-down', 'Verification',
   '30-minute transfer budget shown to omit carrier re-registration'],
  ['3', 'Trade studies', 'Cost and schedule',
   'Cheapest alternative disqualified on a KPP before procurement'],
  ['4', 'Modeling and simulation', 'Technical',
   'Buffer resized from 72 hours to 14 days before tooling'],
  ['5', 'Prototype development', 'Technical',
   'Store-and-forward verified across a nine-day outage'],
  ['6', 'Development test planning', 'Integration',
   'Eight-step build-up isolating each defect to one element'],
];

const CLOSE =
  'The common thread is that each activity replaces a belief with a measurement while the cost of being ' +
  'wrong is still small. The phase is called risk reduction precisely because nothing in it is meant to ' +
  'ship: the prototype has no enclosure, the simulation has no patients, the build-up stops short of ' +
  'production. What it delivers is a design the program can commit to and a record of the uncertainties ' +
  'that no longer have to be carried forward.';

const words = P.concat([CLOSE]).join(' ').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.7in 0.9in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  p { text-align: left; margin: 0 0 5pt; line-height: 1.3; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8.4pt; margin: 5pt 0 5pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.4pt 4pt;
       vertical-align: top; line-height: 1.26; }
  table.t th { background: #e8e8e8; text-align: left; }
  table.t td.n { text-align: center; width: 16pt; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A1: Problem Set — Kossiakoff Problem 13.2
</div>
<div class="rule"></div>

${P.map((t) => `<p>${esc(t)}</p>`).join('\n')}

<table class="t">
<tr><th></th><th>Activity</th><th>Risk class retired</th><th>What it produced for PD-RPM</th></tr>
${TBL.map(([n, a, r, w]) =>
  `<tr><td class="n">${n}</td><td>${esc(a)}</td><td>${esc(r)}</td><td>${esc(w)}</td></tr>`).join('')}
</table>

<p>${esc(CLOSE)}</p>
`;

fs.writeFileSync('m6a1_revised.html', html);
console.log('html written —', words, 'words');
