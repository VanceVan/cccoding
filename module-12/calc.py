# -*- coding: utf-8 -*-
"""Module 12 - decision data and all arithmetic in one place.

Criteria, the pairwise importance ranking, the 1-5 ratings, the Pugh signs
and the weighted totals are all derived here so the document cannot drift
from the numbers.
"""

# ---------------------------------------------------------------- criteria
# key: (short name, kind, what it measures / how it is judged)
CRIT = {
 "C1": ("Activation force", "User",
        "Peak force the hand must apply to turn the tool on, measured at the "
        "control surface. Post-stroke grip strength is commonly less than half "
        "of the unaffected side, so a switch sized for a typical adult grip is "
        "a hard barrier, not an inconvenience."),
 "C2": ("Gross-motion operability", "User",
        "Whether the control can be worked with whole-hand flexion rather than "
        "isolated finger extension or a fine pinch. Voluntary finger extension "
        "is the motion most severely lost after stroke [3], so any control that "
        "needs an individuated digit excludes much of the population."),
 "C3": ("Sustained-hold demand", "User",
        "Whether the user must keep squeezing to keep the tool running. "
        "Sustained submaximal grip is where weakness and fatigue show up, and "
        "it sets how long a task can actually be carried out."),
 "C4": ("State discriminability and feedback", "User",
        "How readily the user can tell forward from off from reverse, by sight "
        "and by touch, before and during use. Sensory loss on the affected side "
        "means tactile coding cannot be assumed to work alone."),
 "C5": ("Inadvertent activation and shut-off", "Safety",
        "Resistance to starting the tool unintentionally, and how quickly and "
        "reliably it stops. Spasticity and involuntary co-contraction make an "
        "unintended squeeze a realistic event rather than a remote one."),
 "C6": ("Either-hand and posture tolerance", "User",
        "Whether the control works with the affected or the unaffected hand and "
        "tolerates a non-neutral wrist. Hemiparesis means the side that is "
        "impaired is not a design choice."),
 "C7": ("Manufacturability and integration", "Engineering",
        "Part count, assembly steps, and how much of the existing drill housing "
        "and tooling has to change."),
 "C8": ("Unit cost", "Engineering",
        "Delta over the existing switch, including any accessory the user must "
        "buy separately. Cost is one of the reported drivers of assistive "
        "device abandonment [2]."),
 "C9": ("Durability and ingress resistance", "Engineering",
        "Service life of the mechanism and its tolerance of the dust and chips "
        "a drill generates."),
}
ORDER = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"]

# importance ranking, most important first (used for the pairwise weights)
RANK = ["C5", "C2", "C3", "C1", "C8", "C4", "C7", "C6", "C9"]

CONCEPTS = {
 "A": "Enlarged existing switch (datum)",
 "B": "Three separate buttons",
 "C": "Track and slider switch",
 "D": "Accessory add-on to existing switch",
 "E": "Palm bar with latch and mode wheel",
}

# ------------------------------------------------------ ratings, 1 (poor) - 5
#            C1 C2 C3 C4 C5 C6 C7 C8 C9
S = {"A": [3, 3, 2, 3, 5, 3, 4, 4, 4],
     "B": [4, 2, 5, 4, 2, 3, 2, 3, 3],
     "C": [3, 2, 5, 4, 2, 4, 2, 3, 2],
     "D": [4, 4, 2, 3, 5, 2, 5, 4, 4],
     "E": [5, 5, 5, 4, 4, 5, 1, 2, 4]}

# ------------------------------------------------------------------ weights
# pairwise comparison: a criterion scores a point each time it is judged the
# more important of a pair. A strict ranking makes the 36 comparisons
# transitive by construction, so wins = (number of criteria below it).
WINS = {c: len(RANK) - 1 - RANK.index(c) for c in ORDER}
RAW = {c: WINS[c] + 1 for c in ORDER}          # +1 so nothing carries zero weight
TOT = sum(RAW.values())
W = {c: RAW[c] / TOT for c in ORDER}


def pugh(datum="A", concepts=("B", "C", "D", "E")):
    """Sign of each concept against the datum, plus the tallies."""
    out = {}
    for k in concepts:
        sg = [(1 if S[k][i] > S[datum][i] else -1 if S[k][i] < S[datum][i] else 0)
              for i in range(len(ORDER))]
        out[k] = (sg, sg.count(1), sg.count(0), sg.count(-1), sum(sg))
    return out


def weighted(keys=("A", "B", "C", "D", "E"), skip=None):
    """Weighted total for each concept, optionally dropping one criterion."""
    idx = [i for i, c in enumerate(ORDER) if c != skip]
    tot = sum(RAW[ORDER[i]] for i in idx)
    return {k: sum(RAW[ORDER[i]] * S[k][i] for i in idx) / tot for k in keys}


P1 = pugh("A")
P2 = pugh("E", ("A", "B", "C", "D"))
WT = weighted()
WT_NO_C3 = weighted(skip="C3")
RANKED = sorted(WT, key=lambda k: -WT[k])

if __name__ == "__main__":
    print("weights  ", {c: round(W[c], 3) for c in ORDER})
    print("sum      ", round(sum(W.values()), 6))
    print("user wt  ", round(sum(W[c] for c in ORDER if CRIT[c][1] != "Engineering"), 3))
    for k, v in P1.items():
        print("pugh A  ", k, v)
    for k, v in P2.items():
        print("pugh E  ", k, v)
    print("weighted ", {k: round(v, 3) for k, v in WT.items()})
    print("ranked   ", RANKED)
    print("no C3    ", {k: round(v, 3) for k, v in WT_NO_C3.items()})
