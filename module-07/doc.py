# -*- coding: utf-8 -*-
"""Module 7 Assignment: Concept Generation - Finger Prosthetic."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.0)
doc.styles['Normal'].paragraph_format.space_after = Pt(4)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; ARR = "→"; DASH = "–"; MUL = "×"


def cap(t):
    return P(t, size=8.2, align=C, after=7, justify=False)


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Module 7 Assignment: Concept Generation " + DASH + " Finger Prosthetic")
r.bold = True; r.font.size = Pt(13.5)
P("585.617 Rehabilitation Engineering | [Your Name] | [Date]", size=9.5, align=C, after=10)

P("The brief is a state-of-the-art prosthetic limb for trans-radial amputees, and the first branch "
  "point is whether to build it biomimetically " + EM + " replicating the appearance and the "
  "functionality of the hand " + EM + " or non-biomimetically. Rather than settle that in the "
  "abstract, this report decomposes the hand physically, generates both kinds of concept inside every "
  "sub-assembly, and lets the answer fall out of the ranking.")

# ===================================================================== PART A
H("Part A " + EM + " Physical Decomposition and Concept Generation", 12, before=8)
P("The system boundary is drawn distal to the socket lamination ring, so the socket, its suspension "
  "and the residual limb are interfacing systems rather than parts of the hand [2]. Within that "
  "boundary the hand divides into the five sub-assemblies of Figure 1. The split is made so each "
  "sub-assembly owns one physical function and can be re-conceived without forcing a redesign of its "
  "neighbours [1].")
FIG(f"{D}/fig1_decomposition.png", 4.7,
    "Figure 1. Physical decomposition of the hand into five sub-assemblies.")
P("Each sub-assembly was brainstormed twice. The first pass asked the synectics question " + EM +
  " *how does the human hand solve this?* " + EM + " and produced the biomimetic candidates; the "
  "second ran the **SCAMPER** checklist against those results, substituting materials, combining "
  "units, eliminating parts and rearranging layouts, which is what produced the monolithic chassis, "
  "the whiffletree drive and the exposed shell [1], [8]. Working from two different prompts is "
  "deliberate: it guards against the *priming* block, in which an early example quietly fences in "
  "everything that follows [1]. The five paragraphs below describe what came out; Figure 2 "
  "collects the sketches.")
P("**S1, palm chassis and wrist.** *A* places the digit bosses on a curved arc with a compliant "
  "transverse member, so the palm cups as the digits close, and uses a passive indexed wrist. *B* is a "
  "flat chassis machined from one billet with a powered coaxial rotator driving the hand in roll. *C* "
  "is a printed lattice carrying bolt-on digit modules on a passive friction wrist.")
P("**S2, digits.** *A* gives three phalanges in anatomic length ratio with the joints coupled by "
  "linkages, so one input curls the digit and the distal joints keep closing after the proximal "
  "phalanx stalls on the object, and the thumb sits on a saddle joint. *B* is one moulded part in which "
  "notch flexures replace pin joints, reproducing the wrap without the anatomy [7]. *C* is a rigid "
  "opposed two-jaw gripper in the split-hook lineage.")
P("**S3, actuation and transmission.** *A* houses the motors in the forearm and pulls Bowden cables "
  "across the wrist in antagonist pairs, as the extrinsic flexors do. *B* puts a sealed gearmotor and "
  "non-back-drivable worm set inside each digit, giving five independent axes that hold grip unpowered "
  "[4], [5]. *C* drives every digit from one motor through load-balancing bars, so they distribute "
  "themselves around whatever shape they meet [7].")
P("**S4, external covering.** *A* is a custom silicone glove pigment-matched to the sound hand, with "
  "nails and fingerprints moulded in. *B* is a moulded elastomer cover chosen for grip friction and "
  "ingress protection rather than likeness, replaceable at the wrist seam. *C* has no soft cover at "
  "all and makes the anodised structure the exterior.")
P("**S5, control and sensing.** *A* reads an eight-channel electrode ring and classifies the "
  "activation pattern belonging to each intended grasp, so a grip is selected in one step, with "
  "fingertip force returned through a vibrotactile band [6]. *B* is the clinical standard: one flexor "
  "and one extensor site driving a single open-close axis, with co-contraction stepping through a "
  "stored grip list. *C* drops electrodes, selecting grips by wrist gesture or phone app while "
  "fingertip sensors regulate slip.")

FIG(f"{D}/fig2_concepts.png", 6.3,
    "Figure 2. Concept sheet " + EM + " three concepts per sub-assembly, at least one biomimetic and "
    "one non-biomimetic in each row.")

# ===================================================================== PART B
H("Part B " + EM + " Concept Assessment", 12, before=8)
P("Concepts were judged against five weighted criteria, the weights themselves set by a pairwise "
  "comparison of the criteria: **functional performance 0.33**, **durability 0.27**, **mass and bulk "
  "0.20**, **cost and complexity 0.13**, **cosmesis 0.07**. Function and weight lead because "
  "insufficient function and excess weight are first-order drivers of upper-limb prosthesis rejection, "
  "and durability sits above mass because a device in for repair delivers no function at all [3]. "
  "Ranking cosmesis last is the most contestable judgement here " + EM + " appearance genuinely "
  "matters to many users [3] " + EM + " and Part C states what changes if it is wrong.")

TABLE(["Concept", "Advantages", "Disadvantages"],
 [["**S1-A** carpal arch", "Conforms around irregular objects; natural silhouette; no wrist motor to power.",
   "Compliant member is a fatigue path; wrist set by the sound hand; costliest to tool."],
  ["**S1-B** monolithic", "Stiffest and most durable; powered roll restores a lost degree of freedom; simple load path.",
   "Heaviest; adds a motor, driver and current draw; not field-repairable."],
  ["**S1-C** open frame", "Lightest and cheapest; digit module swapped in the clinic in minutes.",
   "Least stiff; open structure admits dirt; many fasteners to loosen."],
  ["**S2-A** four-bar", "Several distinct grips; high fingertip force; wraps on contact; proportions suit tools built for hands.",
   "Most parts and pin joints; pins wear; tight packaging if a motor must fit inside."],
  ["**S2-B** flexure", "One moulded part, no bearings; inherently safe on impact; lightest and silent.",
   "Stiffness fixed at moulding; elastomer creeps; low pinch force; hard to instrument."],
  ["**S2-C** two-jaw", "Very high pinch force per watt; almost nothing to break; cheapest by a wide margin.",
   "One grasp only; cannot wrap or support large objects; least accepted appearance."],
  ["**S3-A** tendons", "Low distal mass, so it feels lighter than it weighs; large accessible motors; slim digits.",
   "Cable friction, stretch and fraying dominate servicing; needs forearm volume a short residuum may lack."],
  ["**S3-B** in-digit", "Five independent axes; sealed modules; worm holds grip without current; nothing crosses the wrist.",
   "Highest distal mass and inertia; five motors and drivers; a failed motor idles a digit."],
  ["**S3-C** whiffletree", "One actuator, fewest parts, lowest cost and power; self-adapts with no sensing.",
   "Digits move together, so grips cannot be selected; no independent thumb; force split set by the linkage."],
  ["**S4-A** silicone glove", "By far the best appearance; soft contact; some grip friction.",
   "Elastic resistance loads the actuators continuously; stains and tears; costliest consumable."],
  ["**S4-B** elastomer cover", "High grip friction; seals against dust and splash; peels off for replacement; cheap to mould.",
   "Obviously artificial; small mass and actuator penalty; slightly attenuates fingertip force."],
  ["**S4-C** exposed shell", "Lightest, cheapest, most serviceable; no actuator load; some users prefer the look.",
   "Mechanism open to dirt and liquid; poor grip on smooth surfaces; pinch points exposed."],
  ["**S5-A** pattern recognition", "Selects a grasp in one step; scales to many grips; returns a force channel; hands-free.",
   "Needs training and retraining; sensitive to electrode shift, sweat and limb position; costliest."],
  ["**S5-B** two-site EMG", "Simplest, cheapest, best proven; two electrodes to maintain; hands-free.",
   "One axis at a time; every added grip lengthens the co-contraction sequence; tiring and conspicuous."],
  ["**S5-C** gesture and app", "No electrodes or skin-impedance problems; menu easy to reconfigure; automatic slip control.",
   "Changing grip needs the sound hand or a phone; fails when both hands are busy; unusable bilaterally."]],
 [1.05, 2.6, 2.75], fs=7.4)
cap("Table 1. Advantages and disadvantages of all fifteen concepts.")

TABLE(["Pairwise ranking", "vs A", "vs B", "vs C", "Wins", "Rank"],
 [["**S1** A carpal arch", EM, "0", "0", "0", "3"],
  ["**S1** B monolithic", "1", EM, "1", "2", "**1**"],
  ["**S1** C open frame", "1", "0", EM, "1", "2"],
  ["**S2** A four-bar", EM, "1", "1", "2", "**1**"],
  ["**S2** B flexure", "0", EM, "1", "1", "2"],
  ["**S2** C two-jaw", "0", "0", EM, "0", "3"],
  ["**S3** A tendons", EM, "0", "1", "1", "2"],
  ["**S3** B in-digit", "1", EM, "1", "2", "**1**"],
  ["**S3** C whiffletree", "0", "0", EM, "0", "3"],
  ["**S4** A silicone glove", EM, "0", "0", "0", "3"],
  ["**S4** B elastomer cover", "1", EM, "1", "2", "**1**"],
  ["**S4** C exposed shell", "1", "0", EM, "1", "2"],
  ["**S5** A pattern recognition", EM, "1", "1", "2", "**1**"],
  ["**S5** B two-site EMG", "0", EM, "1", "1", "2"],
  ["**S5** C gesture and app", "0", "0", EM, "0", "3"]],
 [2.6, 0.68, 0.68, 0.68, 0.62, 0.62], fs=7.5)
cap("Table 2. Pairwise ranking within each sub-assembly. A 1 means the row concept is preferred to the "
    "column concept on the weighted criteria.")

P("**What decided each block.** In **S1**, powered roll returns a degree of freedom the trans-radial "
  "user has genuinely lost, which outweighs the arch's modest conformity gain, and the billet also "
  "wins durability. In **S2**, the function gap is at its widest: *C* offers one grasp, and creep in a "
  "moulded flexure degrades *B* over the service life. In **S3**, independent axes are what make a "
  "multi-grip hand possible, and sealed gearmotors avoid the cable wear that dominates tendon-hand "
  "servicing [4]. In **S4**, the glove taxes function continuously and is the costliest consumable, "
  "winning only the lightest-weighted criterion. **S5** is the closest call in "
  "the study and turns on function alone: two-site EMG cannot address a five-axis hand without "
  "co-contraction cycling whose cost grows with every grip added [6].")

P("Ranking in isolation is only half the assessment, because several concepts carry constraints that "
  "reach across the decomposition. Two of them are hard incompatibilities rather than preferences.")
TABLE(["Coupling", "Consequence"],
 [["**S1-B** " + MUL + " **S3-A** " + EM + " Bowden cables cannot cross a continuously rotating wrist without a slip arrangement.",
   "**Hard incompatibility.** Choosing the powered rotator rules out extrinsic tendons; actuation must be intrinsic."],
  ["**S2-B** " + MUL + " **S3-B** " + EM + " a monolithic flexure digit has no internal cavity for a gearmotor and worm set.",
   "**Hard incompatibility.** In-digit actuation forces a jointed digit."],
  ["**S3-C** " + MUL + " **S5-A** " + EM + " a single coupled actuator cannot execute distinct grasps, whatever the classifier outputs.",
   "The control concept has to be matched to the number of independent axes, not chosen separately."],
  ["**S4-A** " + MUL + " **S2-B**, **S3-C** " + EM + " glove elasticity adds a continuous restoring torque at every joint.",
   "The penalty falls hardest on low-torque underactuated drives, which are exactly the cheap options."],
  ["**S4-C** " + MUL + " **S3-B** " + EM + " an exposed structure leaves motors, drivers and sensors open to dust and liquid.",
   "The bare shell is admissible only if each digit module is independently sealed."]],
 [3.5, 2.9], fs=7.4)
cap("Table 3. Compatibility couplings between sub-assembly concepts.")
P("The first two rows would have invalidated a naive combination of top-ranked concepts had the "
  "rankings fallen differently; as it happens the winning set is self-consistent.")

# ===================================================================== PART C
H("Part C " + EM + " The Ideal Concept", 12, before=8)
P("Combining the first-ranked concept from each sub-assembly gives **S1-B + S2-A + S3-B + S4-B + "
  "S5-A**: a monolithic machined chassis with a powered coaxial wrist rotator; five underactuated "
  "four-bar digits in anatomic phalanx ratio with the thumb on a saddle joint; a sealed worm gearmotor "
  "inside each digit; a replaceable textured elastomer cover; and an eight-channel pattern-recognition "
  "EMG interface with fingertip force sensing returned through a vibrotactile band. In use the wearer "
  "produces the activation pattern for a grasp and the classifier selects it directly. The digits close "
  "under independent control until each stalls against the object, at which point the four-bar "
  "coupling keeps curling the distal joints so the hand wraps rather than pinches, and the worm sets "
  "hold that grip unpowered.")
FIG(f"{D}/fig3_ideal.png", 4.5,
    "Figure 3. The combined concept, with each element traced to its ranked source.")
P("Figure 4 restates the design in functional rather than physical terms. Each block is phrased so it "
  "can be described without an “and” or an “or”, the test that keeps a function pure and lets it be "
  "re-allocated to a different physical part later [1]. The mapping is deliberately not one-to-one: "
  "F2.2 and F2.3 both land inside one digit module, while F4.1 and F4.2 split between the rotator and "
  "the chassis. The functional view is solution-neutral and survives a change of concept; the "
  "physical one does not [1].")
FIG(f"{D}/fig4_functional.png", 5.4,
    "Figure 4. Functional decomposition of the combined concept.")

H("Is the design biomimetic or non-biomimetic?", 11.5, before=8)
P("By count it is non-biomimetic: three of the five winners came from the SCAMPER branch, and one of "
  "them, intrinsic in-digit actuation, is the direct opposite of how a hand is built, since the "
  "biological hand drives the digits from extrinsic forearm muscles and keeps its mass proximal. The "
  "design accepts a real penalty in distal inertia to buy independent digit control. But the count is "
  "the less interesting answer. What the ranking actually separated was **biomimicry that buys "
  "function from biomimicry that buys only appearance**. The two biomimetic concepts that survived "
  "earn their place functionally " + EM + " anthropomorphic kinematics, because the object world of "
  "handles, tools and keyboards was shaped around human hands, and an interface that decodes motor "
  "intent and returns tactile information, which mimics the biological control loop rather than the "
  "structure. The two ranked out, the carpal arch and the silicone glove, return likeness alone. The "
  "honest description is therefore **functionally biomimetic and structurally non-biomimetic**, which "
  "is where most current multi-articulating commercial devices have converged [4], [5].")
P("Two limits travel with that verdict. It is **sensitive to the weight vector**: cosmesis was ranked "
  "last, and a user who places appearance above mass and cost " + EM + " a legitimate preference, not "
  "an error " + EM + " would take S4-A and make S1-A competitive, turning the design biomimetic on the "
  "count as well. And pairwise ranking is **ordinal**, so it says that B beats C but not by how much; "
  "a weighted decision matrix, or a Pugh matrix against the two-site EMG hand as datum, is the natural "
  "next step [1].")

H("References", 12, before=8)
refs = [
 "[1] G. E. Dieter and L. C. Schmidt, *Engineering Design*, 5th ed. New York, NY, USA: McGraw-Hill, 2013.",
 "[2] R. A. Cooper, H. Ohnabe, and D. A. Hobson, Eds., *An Introduction to Rehabilitation Engineering*. Boca Raton, FL, USA: CRC Press, 2007.",
 "[3] E. A. Biddiss and T. T. Chau, “Upper limb prosthesis use and abandonment: A survey of the last 25 years,” *Prosthetics and Orthotics International*, vol. 31, no. 3, pp. 236" + DASH + "257, Sep. 2007.",
 "[4] J. T. Belter, J. L. Segil, A. M. Dollar, and R. F. Weir, “Mechanical design and performance specifications of anthropomorphic prosthetic hands: A review,” *Journal of Rehabilitation Research and Development*, vol. 50, no. 5, pp. 599" + DASH + "618, 2013.",
 "[5] C. Cipriani, M. Controzzi, and M. C. Carrozza, “The SmartHand transradial prosthesis,” *Journal of NeuroEngineering and Rehabilitation*, vol. 8, art. 29, 2011.",
 "[6] E. Scheme and K. Englehart, “Electromyogram pattern recognition for control of powered upper-limb prostheses: State of the art and challenges for clinical use,” *Journal of Rehabilitation Research and Development*, vol. 48, no. 6, pp. 643" + DASH + "659, 2011.",
 "[7] A. M. Dollar and R. D. Howe, “The highly adaptive SDM hand: Design and performance evaluation,” *The International Journal of Robotics Research*, vol. 29, no. 5, pp. 585" + DASH + "597, Apr. 2010.",
 "[8] G. Thompson and M. London, “A review of creativity principles applied to engineering design,” *Proceedings of the Institution of Mechanical Engineers, Part E*, vol. 213, no. 1, pp. 17" + DASH + "31, 1999.",
]
for x in refs:
    pp = P(x, size=8.0, after=1)
    pp.paragraph_format.left_indent = Pt(22); pp.paragraph_format.first_line_indent = Pt(-22)

out = f"{D}/Module_07_Assignment_Concept_Generation.docx"
doc.save(out); print("saved")
