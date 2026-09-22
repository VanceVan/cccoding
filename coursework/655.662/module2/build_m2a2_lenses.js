// M2A2 — PD-RPM described through all three system-type lenses.
// Two pages, US Letter portrait, Arial 11pt, double-spaced.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const PARAS = [
  '**Three lenses, not three options.** The three system types are not competing labels to choose among; they ' +
  'are nested levels of resolution. The peritoneal dialysis remote patient monitoring system (PD-RPM) is built ' +
  'out of complex systems, behaves as a system of systems, and must be managed as an enterprise system. Which ' +
  'lens applies depends on the question being asked, and using the wrong one is a reliable way to mismanage ' +
  'the program.',

  '**As a complex system.** Kossiakoff defines a system as a set of interrelated components working together ' +
  'toward a common objective, with the distinguishing attributes of a single integrated system, a single ' +
  'acquisition authority, and a specific set of problems solved. The test is decomposition: take it apart and ' +
  'the pieces do nothing on their own. The home gateway qualifies. Its enclosure, radio, local storage, ' +
  'firmware, and power supply are useless individually, one organization procures and integrates them, and ' +
  'together they solve exactly one problem — collect readings and forward them reliably. The cycler, the ' +
  'blood-pressure cuff, and the dashboard each qualify on the same terms. What does not qualify is PD-RPM as a ' +
  'whole: it has no single acquisition authority, which is exactly where this lens runs out.',

  '**As a system of systems.** Maier defines a system of systems as an arrangement of systems related or ' +
  'connected to provide a given capability, where the loss of any part degrades the whole. PD-RPM satisfies all ' +
  'five attributes. Operational independence: the cycler dialyzes the patient whether or not PD-RPM exists, and ' +
  'the EHR runs the clinic regardless. Managerial independence: the cycler belongs to its manufacturer, the EHR ' +
  'to its vendor, the network to a carrier, each with separate funding and release cycles. Geographic ' +
  'distribution: patient homes, a regional monitoring center, and a data center. Emergent behavior: a firmware ' +
  'update that renumbers alarm codes can silently break a threshold rule nobody thought to retest. Evolutionary ' +
  'development: there is no version one, only a baseline of whatever the constituents happen to be. The loss ' +
  'test holds as well — remove the vitals peripherals and monitoring continues, degraded.',

  '**Which kind of system of systems.** Of Maier’s four governance types, PD-RPM is an acknowledged system of ' +
  'systems. It has recognized objectives and a designated manager in the dialysis organization, but the ' +
  'constituent systems keep independent ownership, funding, and sustainment, so change happens by collaboration ' +
  'rather than direction. It is not directed, since no one can subordinate the cycler manufacturer’s roadmap, ' +
  'and not merely collaborative or virtual, since someone is accountable for the whole.',

  '**As an enterprise system.** Rebovich and White define an enterprise as a purposeful combination of people ' +
  'who make decisions, their workflow process, and the technical systems supporting that decision-making. All ' +
  'five attributes are present: a common mission of keeping patients on home therapy; people, processes, and ' +
  'technology together, since the nurse’s triage workflow and the nephrologist’s prescription decision are ' +
  'inside the system rather than outside it; a network of multiple organizations spanning the dialysis ' +
  'provider, manufacturer, EHR vendor, carrier, supplier, and CMS; dispersed locations; and dependence on ' +
  'external resources. The decisive point is that PD-RPM’s output is not data but a decision someone acts on.',

  '**Why the lens changes the engineering.** Each lens names a different failure mode, and all three are live. ' +
  'Treating PD-RPM as a complex system implies authority the program does not have, and produces plans that ' +
  'assume the cycler manufacturer will accommodate a schedule. The system-of-systems lens corrects that: ' +
  'leverage lies in agreements and interfaces, not directives, which is why interface management is a ' +
  'first-class work package rather than a design detail. The enterprise lens corrects both: a perfectly ' +
  'specified interface still fails if the nurse’s workflow cannot absorb the alert volume it generates.',

  '**Where this lands for the project.** For the remainder of the semester I will treat PD-RPM as an ' +
  'acknowledged system of systems, operating inside an enterprise, assembled from complex systems most of which ' +
  'this project does not own. That classification explains earlier decisions — why the work breakdown structure ' +
  'excludes the cycler while defining an interface to it, and why the context diagram places it outside the ' +
  'boundary. It also constrains later architectures, which must be built around negotiated interfaces rather ' +
  'than assumed control.',
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
  Module 2 | M2A2: Systems Lenses
</div>
<div class="rule"></div>

<h1>PD-RPM Viewed Through Three Systems Lenses</h1>

${PARAS.map((t) => `<p>${md(t)}</p>`).join('\n')}
`;

fs.writeFileSync('m2a2.html', html);
console.log('html written —', words, 'words');
