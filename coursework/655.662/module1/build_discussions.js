// Builds M1D1 and M1D2 discussion posts as separate print-ready HTML files.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// inline markup: **bold**, *italic*
const md = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>');

const CSS = `
  @page { size: letter portrait; margin: 0.62in 0.85in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Calibri, Carlito, "Segoe UI", sans-serif; font-size: 11pt;
         line-height: 1.13; margin: 0; color: #000; }
  .name { font-weight: 700; }
  .meta { font-size: 9.5pt; }
  .rule { border-bottom: 0.75pt solid #aaa; padding-bottom: 7pt; margin-bottom: 9pt; }
  h1 { font-size: 12.5pt; text-align: center; margin: 0 0 9pt; line-height: 1.25; }
  p { text-align: justify; margin: 0 0 6pt; }
  p.lead-in { margin-bottom: 5pt; }
  .refs { font-size: 8pt; color: #333; margin-top: 9pt; padding-top: 5pt;
          border-top: 0.5pt solid #ccc; text-align: left; }
`;

function page({ assignment, title, paras, refs }) {
  return `<!doctype html>
<meta charset="utf-8">
<style>${CSS}</style>
<div class="name">Vance Vanvolkenburgh</div>
<div class="meta">655.662 — Introduction to Healthcare Systems Engineering</div>
<div class="meta rule">Module 1 | ${esc(assignment)}</div>
<h1>${esc(title)}</h1>
${paras.map((t) => `<p>${md(t)}</p>`).join('\n')}
<div class="refs">${md(refs)}</div>
`;
}

/* ------------------------------- M1D1 ------------------------------------ */

const m1d1 = page({
  assignment: 'M1D1: Remote Care Use-Case Selection',
  title: 'Semester Use Case — Remote Patient Monitoring for Home Peritoneal Dialysis',
  paras: [
    'For the semester I am selecting **remote patient monitoring for home peritoneal dialysis (PD-RPM)** — a ' +
    'home-based capability that monitors adults with end-stage kidney disease performing peritoneal dialysis at ' +
    'home and escalates to the home dialysis care team when the data indicate the therapy is failing.',

    'Three reasons for this use case rather than a more common selection such as heart failure or hypertension ' +
    'monitoring.',

    '**The policy and the outcomes point in opposite directions.** The 2019 Advancing American Kidney Health ' +
    'initiative and CMS’s ESRD Treatment Choices model both push hard toward home dialysis. But home PD carries a ' +
    'persistent technique-failure problem, with peritonitis and inadequate ultrafiltration among the leading ' +
    'reasons patients transfer back to in-center hemodialysis. We are actively steering patients toward a modality ' +
    'whose retention problem we have not solved. That is a systems gap, not a clinical-knowledge gap.',

    '**The signal already exists and is being discarded.** A PD cycler generates a complete record every night — ' +
    'fill and drain volumes, dwell times, net ultrafiltration, alarm history. Add patient-reported weight, blood ' +
    'pressure, and exit-site condition, and the trajectory toward technique failure becomes visible days to weeks ' +
    'in advance. Much of that data is currently reviewed only at a monthly clinic visit. This is close to a ' +
    'textbook learning-horizon failure: the information exists, but the consequence lands outside the interval in ' +
    'which anyone is looking.',

    '**It has real boundary complexity.** The most interesting decision in building the context diagram was that ' +
    'the **PD cycler is outside the system boundary**. It is a separately regulated Class II device with its own ' +
    'manufacturer and control loop. PD-RPM consumes its telemetry and pushes prescription updates across a defined ' +
    'interface, but never delivers therapy. Home hemodialysis is also excluded, since water treatment and vascular ' +
    'access are whole subsystems that would make the scope unbounded. Stating those exclusions explicitly proved ' +
    'more clarifying than enumerating what sits inside.',

    'The system spans all three environment tiers introduced in this module: home-based care as the primary ' +
    'setting, a clinical monitoring node at the dialysis organization, and urgent in-center or emergency ' +
    'escalation at the limit.',
  ],
  refs:
    'Executive Order 13879, Advancing American Kidney Health (2019). · Centers for Medicare & Medicaid ' +
    'Services, ESRD Treatment Choices (ETC) Model. · Kossiakoff, A., Biemer, S. M., Seymour, S. J., & ' +
    'Flanigan, D. A. (2020). *Systems engineering principles and practice* (3rd ed.). Wiley. · Montoya, M. ' +
    'Module 1: Framework, context, and motivation [Course lecture]. Johns Hopkins University.',
});

/* ------------------------------- M1D2 ------------------------------------ */

const m1d2 = page({
  assignment: 'M1D2: Healthcare Organizations',
  title: 'Which Organizational Learning Disability Does Healthcare Suffer From Most?',
  paras: [
    'The prompt makes a strong case for “I am my position,” and I do not think it is wrong — but I would argue it ' +
    'is a symptom rather than the root. The disability healthcare suffers from most is **the delusion of learning ' +
    'from experience**, and it is the one that generates most of the others.',

    'Senge’s point is that we learn best from experience, but we never directly experience the consequences of our ' +
    'most important decisions. Every organization has a **learning horizon** — a span in time and space within ' +
    'which we can actually observe the results of what we did. When consequences fall outside that horizon, the ' +
    'feedback loop that would let us learn never closes. We keep acting, we keep accumulating “experience,” and ' +
    'none of it teaches us anything.',

    'Healthcare’s learning horizons are unusually short relative to the timescale on which its decisions actually ' +
    'resolve. A hospitalist makes a discharge decision on Tuesday; the consequence surfaces as a readmission weeks ' +
    'later, in a different unit, attributed to a different clinician, and never travels back to the person who made ' +
    'the call. Pronovost notes that heart failure patients carry roughly a 40% readmission rate at 90 days — an ' +
    'enormous signal that is almost perfectly invisible to the individuals generating it. The same structure holds ' +
    'across the industry. A nephrologist adjusts a peritoneal dialysis prescription at a monthly visit, and the ' +
    'cycler writes the answer into its logs every night for four weeks, where no one reads it until the following ' +
    'visit. A device designer never watches sterile processing struggle with their geometry. In each case the actor ' +
    'behaves rationally on the information they can see, and that information is systematically incomplete.',

    'This is why I think it sits underneath the other disabilities rather than beside them. “I am my position” is ' +
    'what a short learning horizon feels like from the inside — if you can only observe your own slice, defining ' +
    'yourself by that slice is the reasonable adaptation. “Fixation on events” follows too: when you cannot see ' +
    'trends because the data never returns to you, discrete events are genuinely all you have. And the boiled frog ' +
    'is the terminal case — degradation slow enough to fall outside everyone’s horizon is degradation nobody is ' +
    'positioned to notice.',

    '**A pathway.** The intervention is not more training or better attitudes; it is engineering the feedback loop ' +
    'so that consequences return to the decision-maker while they can still learn from them. Pronovost’s work on ' +
    'catheter-related bloodstream infections is an existence proof: the checklist gets the attention, but the ' +
    'mechanism that mattered was feeding unit-level infection rates back to the specific clinicians producing them, ' +
    'on a cadence short enough to connect action to outcome. A problem the size of breast cancer was largely ' +
    'eliminated by closing a learning loop, not by generating new science.',

    'Systems engineering formalizes exactly this. Verification and validation are institutionalized feedback loops, ' +
    'and requirements traceability is a mechanism for carrying consequences backward to the decision that caused ' +
    'them. Even the context diagram is a learning-horizon tool — drawing the boundary and enumerating what crosses ' +
    'it is a structured admission that effects will land outside your view, and a way to name them before they ' +
    'surprise you.',

    'Three concrete moves follow. First, for any recurring decision, identify where its consequence materializes and ' +
    'build a route back. Second, measure trends rather than incidents, so boiled-frog cases become visible. Third, ' +
    'attach outcomes to decisions rather than departments — blame fragments learning, traceability preserves it.',

    '**Question for the group:** in your own setting, what is a decision you make routinely whose consequence you ' +
    'have genuinely never observed? I suspect naming those is harder than it sounds, which is rather the point.',
  ],
  refs:
    'Senge, P. M. (2006). *The fifth discipline* (ch. 2). Doubleday/Currency. · Kossiakoff, A., et al. (2020). ' +
    '*Systems engineering principles and practice* (3rd ed., ch. 1–3). Wiley. · INCOSE. (2023). *Systems ' +
    'engineering handbook* (5th ed.), §§1.1–1.5. · Pronovost, P. (2019). *New narratives for health care* ' +
    '[Address]. City Club of Cleveland. · Montoya, M. Module 1 [Course lecture]. Johns Hopkins University.',
});

fs.writeFileSync('m1d1.html', m1d1);
fs.writeFileSync('m1d2.html', m1d2);
console.log('m1d1.html + m1d2.html written');
