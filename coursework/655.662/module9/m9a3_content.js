// M9A3 shared content. PDF and DOCX builders both render from this.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TITLE = 'Becoming Bicultural — the Chapter 14 Topic PD-RPM Needs at Production Transition';

const SECS = [
  ['What Senge means by it',
   'Senge’s concern in Chapter 14 is that learning work tends to form an enclave. A group ' +
   'develops its own language, its own practices and its own sense of what matters, and then cannot ' +
   'explain itself to the organization that funds it. Becoming bicultural is the discipline of ' +
   'fluency in two languages at once: the language of the learning effort and the language of the ' +
   'mainstream organization, which speaks in schedules, budgets and results. Without that fluency the ' +
   'learning work is eventually read as overhead and cut. With it, the same work gets expressed in ' +
   'terms the organization already values and survives.'],

  ['Why this topic, for this system, right now',
   'Senge writes about the learning culture meeting the managerial culture. The same logic governs ' +
   'what happens to PD-RPM at production transition, where a third culture arrives that the program ' +
   'has no history with. The contract manufacturer speaks in yield, cycle time, first-pass test rate ' +
   'and tooling amortization. The engineering team speaks in requirements and interfaces. The ' +
   'clinical side speaks in patient burden and risk of harm. These are not three attitudes toward one ' +
   'language; they are three languages. If nobody can hold two of them at once, DR-2’s 30 dBA ' +
   'limit reads on the line as a preference rather than a bedroom a patient has to sleep in, and gets ' +
   'traded away for assembly cost by people acting entirely in good faith.'],

  ['The program has already proved this the hard way',
   'The Module 6 team-learning review traced a cluster of silent-device events to three groups each ' +
   'speaking truthfully in its own language. The carrier reported no outage. Firmware reported no ' +
   'faults. Nursing reported no complaints from patients. Every statement was correct, and the ' +
   'failure lived in the space between them, where no single language reached. What resolved it was ' +
   'not new technology but bicultural infrastructure: a shared timestamped evidence log that removed ' +
   'ownership of the facts, and patients seated in the review. The same failure mode is waiting at ' +
   'the contract manufacturer, with higher stakes, because by then the tool is cut.'],
];

const PRACTICES = [
  ['An engineer embedded at the contract manufacturer through the pilot build, and a CM process ' +
   'engineer seated in design reviews from CDR rather than from the Pilot Production Readiness Review.'],
  ['A shared glossary that binds every clinical term to a measurable requirement, so that \u201cno ' +
   'additional burden on the patient\u201d resolves to OR-2’s automatic transfer within 30 minutes and ' +
   'the 60-second daily interaction KPP, and cannot be reinterpreted on the line.'],
  ['Cross-functional training before the pilot build, not during it, so line operators know what the ' +
   'device does for a person on overnight dialysis and why a missing record matters.'],
  ['A standing rule that every requirement must be readable by two cultures at once: measurable to ' +
   'the manufacturer and recognizable to the nurse. A requirement that satisfies only one of them is ' +
   'not finished.'],
];

const WHY =
  'Concurrent engineering is where this pays. Putting Engineering, Clinical, Logistics, Production ' +
  'and Administration at one table produces five monologues unless some people in the room can speak ' +
  'two of the five languages. Biculturalism is the mechanism that makes cross-functional teaming work ' +
  'rather than merely co-located, and it is what the module’s own countermeasures — a common ' +
  'language and cross-functional training — are reaching for.';

const RISK =
  'It also lowers risk in a way that is specific rather than sentimental. Every risk the Module 5 ' +
  'register carries as a technical item has a translation failure sitting behind it: a silent gateway ' +
  'is an engineering fault to firmware, an absence of data to nursing, and nothing at all to the ' +
  'carrier. Finding those at CDR costs a conversation. Finding them at the Manufacturing Readiness ' +
  'Review costs a tool, a certification cycle, or a recall.';

const CLOSE =
  'Finally, biculturalism is what makes the documentation trail worth keeping. An artifact written in ' +
  'one dialect is unreadable to the function that needs it, and the producibility analysis, the test ' +
  'manual and the usability file are each read by someone who did not write them. A record that two ' +
  'cultures can both read outlives the individuals who made it, which is the practical meaning of ' +
  'sustained organizational learning. The transition that fails is rarely the one that missed a ' +
  'tolerance. It is the one where two groups were each right in their own terms and nobody in the ' +
  'room could hold both at the same time.';

module.exports = { esc, TITLE, SECS, PRACTICES, WHY, RISK, CLOSE };
