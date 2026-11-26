# -*- coding: utf-8 -*-
"""Module 12 assignment document. All numbers come from calc.py."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk
from calc import (CRIT, ORDER, RANK, CONCEPTS, S, W, WINS, RAW, TOT,
                  P1, P2, WT, WT_NO_C3, RANKED)

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.5)
doc.styles['Normal'].paragraph_format.space_after = Pt(6)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; PM = {1: "+", 0: "0", -1: "−"}


def num(v):
    return str(v).replace("-", "−")


def f2(x):
    return f"{x:.2f}"


def bullet(t, after=4):
    p = P("•  " + t, after=after)
    p.paragraph_format.left_indent = Pt(24); p.paragraph_format.first_line_indent = Pt(-12)
    return p


def ref(n, t):
    p = P("[" + str(n) + "] " + t, size=8.8, after=1.5, justify=False)
    p.paragraph_format.left_indent = Pt(22); p.paragraph_format.first_line_indent = Pt(-22)
    return p


# ------------------------------------------------------------------- title
t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Assignment 12: Decision Making and Concept Selection")
r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | Vance Van Volkenburgh", size=10, align=C, after=10)

P("The problem is the on/off control of a right-angle drill for users with limited hand "
  "range of motion following stroke. Four concepts are given: **A**, an enlarged version of "
  "the existing switch with a separate reverse toggle on the side; **B**, three discrete "
  "buttons for on, off and reverse; **C**, a track and slider carrying reverse/off/on; and "
  "**D**, an accessory that clips over the existing switch. A fifth concept, **E**, is "
  "offered below. Concept A is the datum throughout.")

# ------------------------------------------------------------------ part A
H("Part A — Selection Criteria")
P("Nine criteria were set, six describing what the user must be able to do and three "
  "describing what the firm must be able to build. Each was written so that it can be "
  "judged from a drawing or a mock-up, and so that it does not restate another: activation "
  "force (how hard), gross-motion operability (what motion), and sustained-hold demand (for "
  "how long) are three separate ways a switch can defeat an impaired hand, and a concept "
  "can pass any one of them while failing the others.")
TABLE(["", "Criterion", "Type", "What it measures, and why it matters for this population"],
      [[k, "**" + CRIT[k][0] + "**", CRIT[k][1], CRIT[k][2]] for k in ORDER],
      [0.3, 1.45, 0.62, 4.3], fs=8.4)
P("Table 1. Selection criteria. Six are user criteria, three are engineering criteria.",
  size=9, align=C, after=9, justify=False)

# -------------------------------------------------------------- concept E
H("Extra Credit — Concept E")
P("Concept E removes the trigger entirely. A **compliant bar runs the full length of the "
  "grip face**, so the tool is switched on by closing the hand anywhere along it rather "
  "than by placing a finger on a target: no individuated finger motion, no pinch, and the "
  "same action with either hand. An over-centre leaf spring gives a crisp detent at about "
  "three newtons, and **pressing past a second detent latches the tool on**, so running the "
  "drill does not require a sustained squeeze.")
P("Latching a power tool is the obvious objection, so the latch is not held by the "
  "mechanism alone: a **presence pad on the back of the grip** drops it out as soon as the "
  "palm leaves the handle. The dead-man function is preserved, but it is tied to holding "
  "the tool rather than to squeezing it, which is the distinction that matters for a hand "
  "that can grasp but cannot sustain force. Direction is set by a **detented thumb wheel** "
  "at the top of the grip with OFF at the centre detent, so the tool passes through off "
  "between forward and reverse, and the three positions are coded by raised icons as well "
  "as by wheel position.")
FIG(f"{D}/fig1_concept_e.png", 5.8,
    "Figure 1. Concept E. A full-length compliant palm bar replaces the trigger, a "
    "second detent latches the tool on, and a presence pad releases the latch when the "
    "hand leaves the grip.")
P("The cost of all this is in the last three criteria: the bar needs a linkage and a new "
  "housing, and the presence pad needs a sensor and a small control board. Concept E is "
  "scored on that basis below, not on the basis of its intent.")

# ------------------------------------------------------------------ part B
H("Part B — Pugh Chart")
rows = [[k, CRIT[k][0], "**DATUM**"] + [PM[P1[c][0][i]] for c in "BCDE"]
        for i, k in enumerate(ORDER)]
for lab, j in (("Sum of +", 1), ("Sum of 0", 2), ("Sum of −", 3), ("Net score", 4)):
    rows.append(["", "**" + lab + "**", ""] +
                ["**" + num(P1[c][j]) + "**" if lab == "Net score" else str(P1[c][j])
                 for c in "BCDE"])
TABLE(["", "Criterion", "A", "B", "C", "D", "E"], rows,
      [0.3, 2.25, 0.62, 0.52, 0.52, 0.52, 0.52], fs=8.4, keep=True)
P("Table 2. Pugh chart, Concept A as the datum. + better than the datum, "
  "0 no different, − worse.", size=9, align=C, after=9, justify=False)

P("**B and C are screened out at −2 each.** Both solve the holding problem, and both "
  "pay for it twice: they give up the inherent dead-man behaviour of a trigger, since the "
  "tool keeps running after the hand fails, and they still demand a targeted finger press "
  "or a directed slide from a hand that has lost exactly that motion. C is additionally the "
  "worst concept for an open track in a tool that produces chips.")
P("**D and E tie at +2, and the chart cannot separate them.** They tie for different "
  "reasons. Concept E earns five pluses on the user criteria and gives back three on safety, "
  "manufacturability and cost. Concept D earns three pluses and takes five zeros, and those "
  "zeros are doing the work: a zero means only that D is no worse than the datum, and the "
  "datum is itself poor at sustained holding, because the accessory lowers the force on the "
  "existing trigger without removing the need to keep holding it.")
P("Dieter and Schmidt's second step is to run the chart again with the leading concept as "
  "the new datum [1]. Doing that resolves the tie:")
TABLE(["Concept vs. datum E", "Sum of +", "Sum of 0", "Sum of −", "Net"],
      [[k + " — " + CONCEPTS[k].replace(" (datum)", "")] +
       [num(P2[k][j]) for j in (1, 2, 3, 4)] for k in "ABCD"],
      [3.0, 0.8, 0.8, 0.8, 0.7], fs=8.4)
P("Table 3. Second Pugh round, Concept E as the datum.", size=9, align=C, after=9,
  justify=False)
P("No concept beats E, and D now sits at " + num(P2["D"][4]) + ". **Concept E is the "
  "selection from the Pugh analysis**, with the qualification that the margin over D came "
  "only from the second round and not from the first.")

# ------------------------------------------------------------------ part C
H("Part C — Weighted Decision Matrix")
P("Weights were set by pairwise comparison. Each criterion was compared with every other "
  "and given a point whenever it was judged the more important of the pair; the " +
  str(len(ORDER) * (len(ORDER) - 1) // 2) + " comparisons were made from a single strict "
  "ranking, so the result is transitive by construction and needs no consistency check. "
  "Each win count was increased by one so that no criterion carries zero weight, and the "
  "totals were normalised.")
P("Safety ranks first: a rotating tool that cannot be stopped by a hand with impaired grip "
  "and reduced sensation is the one failure that is not recoverable. Gross-motion "
  "operability and sustained-hold demand follow, as the two criteria on which this "
  "population differs most from the general user, then activation force. Unit cost was "
  "placed above the two remaining user criteria because cost is a reported driver of "
  "assistive device abandonment [2]. The weighting leaves the user criteria carrying " +
  f"{sum(W[c] for c in ORDER if CRIT[c][1] != 'Engineering'):.0%}" +
  " of the total, which is deliberate for a redesign whose entire purpose is accessibility.")
cells = []
for i, k in enumerate(ORDER):
    cells.append([k, CRIT[k][0], str(WINS[k]), f"{W[k]:.3f}"] +
                 [str(S[c][i]) + "  (" + f"{W[k] * S[c][i]:.2f}" + ")" for c in "ABCDE"])
cells.append(["", "**Weighted total**", "", "**1.000**"] +
             ["**" + f2(WT[c]) + "**" for c in "ABCDE"])
cells.append(["", "**Rank**", "", ""] + ["**" + str(RANKED.index(c) + 1) + "**" for c in "ABCDE"])
TABLE(["", "Criterion", "Wins", "Wt.", "A", "B", "C", "D", "E"], cells,
      [0.27, 1.6, 0.36, 0.38, 0.82, 0.82, 0.82, 0.82, 0.82], fs=7.9, keep=True)
P("Table 4. Weighted decision matrix. **Wins** is the number of criteria the row was "
  "judged more important than in the pairwise comparison; adding one and normalising "
  "gives **Wt.** Each concept cell gives the 1–5 rating (5 = fully meets the "
  "criterion) and, in parentheses, the rating times the weight. The ratings are the "
  "same judgements used in Table 2.", size=9, align=C, after=9, justify=False)

P("The matrix ranks the concepts **E (" + f2(WT["E"]) + "), D (" + f2(WT["D"]) + "), "
  "A (" + f2(WT["A"]) + "), B (" + f2(WT["B"]) + "), C (" + f2(WT["C"]) + ")**. "
  "Concept E wins on the strength of the three heavily weighted user criteria "
  "— gross-motion operability, sustained-hold demand and activation force — and "
  "absorbs its losses on manufacturability and cost because those two together carry only " +
  f"{W['C7'] + W['C8']:.0%}" + " of the weight.")

# ------------------------------------------------------------- comparison
H("Comparing the Two Results")
P("The two methods agree on the screening and disagree on the selection.")
bullet("**They agree that B and C are out.** Both are negative in the Pugh chart and both "
       "finish below the datum in the matrix.")
bullet("**They disagree about D.** The Pugh chart ties D with E; the matrix separates them "
       "by " + f2(WT["E"] - WT["D"]) + " on a five-point scale. The Pugh chart counts "
       "criteria, it does not weigh them, so D's three wins — activation force, gross-motion "
       "operability and manufacturability — count for as much as E's wins on the "
       "criteria that define the problem. More importantly, five of D's nine entries are zeros, and a zero only says "
       "*no worse than the datum*. Where the datum is already weak — it rates 2 of 5 on "
       "sustained-hold demand — D inherits that weakness and the chart records no "
       "penalty for it. The matrix, which scores against an absolute scale rather than "
       "against A, charges D for it.")
bullet("**The matrix ranks the datum; the Pugh chart cannot.** A is fixed at zero by "
       "definition, so the chart cannot say whether B and C are improvements in absolute "
       "terms. The matrix places A third, ahead of both: two of the four given concepts are "
       "worse overall than the switch they were drawn to replace.")
bullet("**One difference should not be read as a difference.** B and C tie at −2 in the "
       "Pugh chart, and the matrix splits them by only " + f2(WT["B"] - WT["C"]) + ", about "
       f"{(WT['B'] - WT['C']) / WT['C']:.0%}" + ". That is inside the noise of a subjective "
       "1–5 rating: the matrix agrees with the chart that B and C are indistinguishable.")
P("A sensitivity check confirms where the result actually comes from. Sustained-hold demand "
  "contributes more to the gap between D and E than every other criterion combined; drop "
  "that one criterion and renormalise, and the ranking inverts to D " + f2(WT_NO_C3["D"]) +
  " against E " + f2(WT_NO_C3["E"]) + ". **The entire recommendation rests on whether the "
  "user must keep squeezing to keep the tool running.** That is defensible here — "
  "sustained grip is precisely what is lost — but it is the assumption to challenge "
  "first.")

# --------------------------------------------------------- recommendation
H("Recommendation and Limitations")
P("**Concept E is recommended**, selected by both methods and by a clear margin once the "
  "criteria are weighted. The matrix also says where it is weak: 1 on manufacturability "
  "and 2 on cost, the difference between a latched, sensed bar and a moulded clip. The next concept generation round should therefore test whether E's one "
  "decisive advantage can be had at D's cost — an accessory that adds a purely "
  "mechanical latch with a positive release to the existing trigger would capture most of "
  "the sustained-hold gain without the sensor or the new housing. That hybrid is the "
  "combination step Pugh's method calls for after the first round [1]; it is "
  "offered as the next iteration, not as a result.")
bullet("The ratings are one rater's judgement from the sketches — a screening instrument, "
       "not evidence. The force, hold and reach criteria need mock-up testing with users from "
       "the target population before tooling is committed.")
bullet("Concept D was rated as a one-orientation accessory, which is what the sketch shows. "
       "A symmetric version would gain a point on either-hand tolerance and close part of "
       "the gap.")
bullet("Any lock-on provision in a hand-held power tool is constrained by the safety "
       "requirements for motor-operated hand-held tools [4] and the switch requirements "
       "written for them [5]. Concept E's presence-release would have to be qualified "
       "against those, a cost the manufacturability rating only partly reflects.")

H("References")
ref(1, "G. E. Dieter and L. C. Schmidt, *Engineering Design*, 5th ed. New York, NY, USA: "
       "McGraw-Hill, 2013, ch. 7.")
ref(2, "E. Biddiss and T. Chau, “Upper limb prosthesis use and abandonment: A survey of "
       "the last 25 years,” *Prosthetics and Orthotics International*, vol. 31, no. 3, "
       "pp. 236–257, 2007.")
ref(3, "D. G. Kamper and W. Z. Rymer, “Impairment of voluntary control of finger motion "
       "following stroke: Role of inappropriate muscle coactivation,” *Muscle & Nerve*, "
       "vol. 24, no. 5, pp. 673–681, 2001.")
ref(4, "*IEC 62841-1: Electric motor-operated hand-held tools, transportable tools and lawn "
       "and garden machinery — Safety — Part 1: General requirements*. Geneva, "
       "Switzerland: International Electrotechnical Commission, 2014.")
ref(5, "*IEC 61058-2-6: Switches for appliances — Part 2-6: Particular requirements for "
       "switches used in electric motor-operated hand-held tools, transportable tools and "
       "lawn and garden machinery*. Geneva, Switzerland: International Electrotechnical "
       "Commission, 2018.")

doc.save(f"{D}/Module_12_Assignment_Decision_Making.docx")
print("doc saved")
