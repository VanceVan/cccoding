# Module 8 — Ethnography

EN.585.617.81.FA26 Rehabilitation Engineering

## Status
Context ingested. Assignment written; **four observational fields still blank.**

## Deliverable
`Module_08_Ethnography_Assignment.docx` / `.pdf` — 3 pages.

Video: *Inpatient Rehabilitation Unit | Kennedy Krieger Institute*
(https://www.youtube.com/watch?v=GABVP6ktGeY), segment **3:01–3:17**, the
aquatic therapy center. That segment was chosen because it is the only one
where the narration names an actual mechanism — pool floors on lifts giving
barrier-free entry for wheelchair users, plus built-in treadmills and
resistance jets — so a workflow can be grounded in what the video states
rather than guessed.

Build: `python3.13 figs.py` then `python3.13 doc.py`, then LibreOffice for the
PDF. The flowchart uses the lecture's shape key (oval delimiter, diamond
decision, plain task, red-outlined difficult task) and is parameterised in
`build()` — swapping the step list is a one-minute edit.

### Still to fill (⟨angle brackets⟩ in the document)
YouTube is unreachable from this session and video cannot be watched here, so
these four are left blank rather than invented:
1. which of the two red steps the patient actually struggled with
2. the patient's observable attitude toward it
3. number of attempts
4. elapsed time for the step, and for a neighbouring ordinary step

Everything else — context, hazards, tools, the mechanism of difficulty for both
candidate steps, remedies, and the design-requirement tie-in — is written from
the narration and from the module readings.

## Module scope

**Summary.** Explore using ethnography to assist in design solutions.

**Objective.** Observe and utilize ethnographic studies, and appreciate the
interface of good engineering and elegant design.

**Completion.** (1) Readings, (2) Lectures and content, (3) Assignments.

## Materials supplied
- `585_617_Mod_08_Design_meets_disability_ethnographyEX.pptx` — 4-slide course deck
- `Design_Meets_Disability_Slides.pdf` — 58 slides from the Pullin talk (image-only)
- `design_meets_disability_transcript.doc` — full talk transcript, ~10,200 words
- `Ethnographic-and-Ergonomics-considerations-in-design-of-Wheelchair.pdf` — IJSER paper

## Course deck

**Slide 2 — definition.** Ethnography is the process of investigation and
documentation of the behavior of a specific group of people under particular
conditions. It entails close observation, **even to the point of immersion**, in
the group being studied *while they are experiencing the conditions of
interest*. By this method the observer gets a comprehensive and integrated
understanding of the scenario under investigation.

**Slide 3 — worked task analysis (the one to copy).** The deck's only worked
example, and the likely template for the assignment. Scenario: *a person with
mobility impairment climbing steps of normal height; the impairment is leg
spasms with stiffness resulting in circumduction of the hip; observations
include difficulty bending both knees, which required manually lifting each leg
while maintaining balance by holding the handrail.*

The flowchart runs: Start → «Go up stairs?» → Reach for handrail → Grasp
handrail → **Lift foot** → Slide foot onto stair → **Straighten leg** → Lift
other foot → Slide the other foot onto stair → «More stairs?» → Move hand up
handrail (loop back) → Smile → End.

Its key defines four shapes: **Delimiter** (oval), **Decision** (diamond),
**Task** (plain box), **Difficult Task** (box outlined in red). Two steps are
marked difficult — *lift foot* and *straighten leg* — which is the whole point:
the flowchart's job is to locate where the impairment actually bites.

## Pullin, *Design Meets Disability* (Microsoft Research talk)

Graham Pullin, lecturer in interactive media design, University of Dundee. The
argument: design for disability is dominated by clinical and engineering teams
whose culture is **problem solving**, and it would be enriched by art-school
designers whose culture includes **open-ended, playful exploration**.

**The Eames leg splint** opens the talk — bent plywood developed in 1942 for the
U.S. Navy, whose technique only later reached the Eameses' mainstream furniture.
Pullin calls this **the opposite of trickle-down**: constraints of disability
can catalyse general design thinking. Ray Eames then cut into spare splints with
a jigsaw to make sculpture — problem solving and play side by side.

### The seven tensions (the book's spine)
1. **Fashion meets discretion**
2. **Exploring meets solving**
3. **Simple meets universal**
4. **Identity meets ability**
5. **Provocative meets sensitive**
6. **Feeling meets testing**
7. **Expression meets information**

Pullin covers 1–5 in the talk and skips 6 and 7's full treatment for time.

### Examples worth citing
- **Cutler and Gross eyewear** — drove glasses from medical necessity to fashion
  accessory by embracing the *culture* of fashion, not just its skills. Pullin:
  design for disability "needs a few more enfant terribles."
- **Hulger camouflage hearing aid** (Hearwear, V&A) — a provocation, not a
  solution; Pullin insists the two must not be confused, and both have a place.
- **Jacques Monestier's prosthetic hand** — "nothing like those dead, pink,
  plastic hands that pretend to imitate human flesh." Gets the moment of
  realisation out of the way immediately.
- **Alexander McQueen's carved legs for Aimee Mullins** — medically unnecessary;
  fantasy as a legitimate requirement.
- **Chairs vs. wheelchairs** — chairs proliferate and diversify (a chair is a
  medium for expressing design principles); wheelchairs have *converged* on
  optimum solutions, designed out of cycle engineering rather than furniture
  design. "What if wheelchairs became a design standard like chairs themselves
  and were subverted by the most radical of our designers, not just improved by
  the most technically brilliant."
- **Braille as afterthought** — applied as an accessibility fix rather than
  designed in. Shelley Fox's braille dress, Bodo Sperlein's tactile plates,
  Graphic Thought Facility's tiles. "How refreshing to be thinking about braille
  first and then trying to retrofit the visible text onto it for a change."
- **Tango communication aid** (Rich Ellenson) — run like an ad campaign, pulling
  in industrial designers, interaction designers and Nickelodeon alongside
  speech professionals. Thomas can speak, **yell, whisper or whine**.
- **Somiya's badge** — she spent an entire head switch on "Somiya says SOD OFF."
  Expression, not information.
- **Leckey support furniture** and the **"flying submarine"** — a concept so
  overburdened with features it is condemned to mediocrity in each of them.
  Complexity can itself stigmatise and become a social barrier.
- **BIME dementia radio** and **Fukasawa's MUJI CD player** — simplicity bought
  at the cost of features, repaid by the whole experience. "Good design often
  requires the courage to value simplicity over being all things to all people."
- **Deaf with a capital D** — Antony's deafness is cultural identity; Jamie's is
  social isolation. Same audiogram, opposite design briefs. Markets for disabled
  people get defined by *ability*; mainstream markets get defined by *attitude
  and taste*. Pullin wants the second layered onto the first.
- **Resonant design** — not universal design. Find the overlap between some
  people with a disability and some people without, in particular circumstances.
  The induction-loop bar table, the Tissot tactile watch, the discretion watch.
- **Tomoko Azumi's step stool** — the two qualities she put on the brief:
  **"a little cough"** (unfolding should claim just enough space without the
  whole bar staring) and **"a little lift"** (if it is a nuisance to carry, it
  should give something back emotionally each time it is deployed).

**Closing position.** Pullin is challenging the traditional priorities, not
dismissing them: fashion *and* discretion, exploring *and* solving, identity
*and* ability are all needed, "like opposing muscles." His one complaint is that
art-school designers are conspicuously absent. "Keep the design in inclusive
design" — accessible but mediocre becomes design for special needs by default,
because only the people who must use it will.

On **OXO Good Grips**, asked why it is not in the book: it is well known, and its
emphasis is ergonomics, which he thinks is already understood; he wanted the
less-represented qualities to get airtime.

## Kulkarni, Dandavate & Chamnalli, wheelchair ethnography (IJSER 2017)

A worked ethnographic + ergonomic study, useful as a method template.

- **Ethnography** = qualitative research into shared, learned patterns of values,
  behavior, beliefs and language of a culture-sharing group; conducted through
  **participant observation, interviewing and archival research**. Few cases,
  often one, studied in depth.
- **Procedure given**: decide ethnography is the right plan → identify a
  culture-sharing group → select the social topics or theories → pick the type
  of ethnography → gather data *in the setting where the group works or lives* →
  analyse for description, emergent themes and general understanding → forge a
  working set of rules about how the group functions.
- **Three stakeholder groups surveyed**: doctors/hospital owners, attendants who
  propel the chair, patients who use it. Findings diverge by group — patients
  cite weight and seating position; attendants cite push force, turning radius
  and maintenance; doctors cite weight, automation, maintenance, an >80 kg
  capacity, and aesthetics. **The same product, three different problem
  statements** — the core argument for talking to more than one group.
- **Ergonomics** is framed around four criteria: **force, repetition, duration,
  posture**. Wheelchair users are forced to hold one position for long periods;
  the consequences named are pain, deformities and decubitus ulcers.
- Includes occupied length/width/height tables for manual and powered chairs,
  pressure-sensitive area diagrams, a 3D model and an FEA run (steel tube, 60 kg
  load, max von Mises 57.938 MPa, below the ultimate stress of steel).

## Gaps
- **No Readings page and no Lectures page were supplied** for this module, so
  the assigned reading list is unconfirmed; the wheelchair paper is assumed to
  be one of them.
- `Design_Meets_Disability_Slides.pdf` is **image-only** — no extractable text.
  Coverage above comes from the transcript, which is workable because Pullin
  audio-describes almost every slide as he goes.
- The overview says **"Assignments"**, plural. Only one has been mentioned so
  far and none has been supplied.
- No Module 8 discussion prompt yet.
