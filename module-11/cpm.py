"""Critical Path Method solver and network diagram for the knee CPM project."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrowPatch
import os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#000000"; RED = "#c0392b"; GREY = "#8a8a8a"
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 8})

# activity: (description, duration, predecessors)
ACT = {
 "A": ("Define customer needs", 4, []),
 "B": ("Evaluate competitor's product", 3, []),
 "C": ("Define market", 3, []),
 "D": ("Determine product specs", 2, ["B"]),
 "E": ("Produce sales forecast", 2, ["B"]),
 "F": ("Survey competitor's marketing methods", 1, ["B"]),
 "G": ("Evaluate product vs. customer needs", 3, ["A", "D"]),
 "H": ("Design and test the product", 5, ["A", "B", "D"]),
 "I": ("Plan marketing activity", 4, ["C", "F"]),
 "J": ("Gather information on competitor's pricing", 2, ["B", "E", "G"]),
 "K": ("Conduct advertising campaign", 2, ["I"]),
 "L": ("Send sales literature to distributor", 4, ["E", "G"]),
 "M": ("Establish product pricing", 3, ["H", "J"]),
 "N": ("Specify knee ROM and torque safety limits", 2, ["A"]),
 "O": ("Hazard analysis and risk management file", 3, ["D", "N"]),
 "P": ("Fabricate and bench-test engineering prototype", 4, ["H", "O"]),
 "Q": ("Verification: electrical safety and usability", 4, ["P"]),
 "R": ("Prepare and submit 510(k) premarket notification", 5, ["Q"]),
}


def solve(act):
    succ = {k: [] for k in act}
    for k, (_, _, preds) in act.items():
        for p in preds:
            succ[p].append(k)
    order = []
    seen = set()

    def visit(k):
        if k in seen:
            return
        for p in act[k][2]:
            visit(p)
        seen.add(k); order.append(k)
    for k in act:
        visit(k)

    ES, EF = {}, {}
    for k in order:
        ES[k] = max([EF[p] for p in act[k][2]], default=0)
        EF[k] = ES[k] + act[k][1]
    T = max(EF.values())

    LS, LF = {}, {}
    for k in reversed(order):
        LF[k] = min([LS[s] for s in succ[k]], default=T)
        LS[k] = LF[k] - act[k][1]
    TF = {k: LS[k] - ES[k] for k in act}
    return ES, EF, LS, LF, TF, T, succ


ES, EF, LS, LF, TF, T, SUCC = solve(ACT)
CRIT = [k for k in ACT if TF[k] == 0]

POS = {
 "A": (0, 58), "B": (0, 30), "C": (0, 2),
 "N": (20, 58), "D": (20, 30), "E": (20, 16), "F": (20, 2),
 "O": (40, 58), "G": (40, 44), "H": (40, 30), "I": (40, 2),
 "J": (60, 44), "P": (60, 30), "L": (60, 16), "K": (60, 2),
 "M": (80, 44), "Q": (80, 30),
 "R": (100, 30),
}
# transitively redundant precedences, drawn dashed so they do not clutter the path
REDUNDANT = {("B", "H"), ("B", "J")}
RAD = {("B", "H"): -0.5, ("B", "J"): 0.4, ("E", "J"): -0.3, ("C", "I"): 0.38}

W, H = 15.0, 11.0


def diagram():
    fig, ax = plt.subplots(figsize=(9.0, 5.6))
    ax.set_xlim(-10, 112); ax.set_ylim(-9, 72); ax.set_aspect("equal"); ax.axis("off")

    for k, (_, dur, preds) in ACT.items():
        x, y = POS[k]
        for p in preds:
            px, py = POS[p]
            red = (p, k) in REDUNDANT
            crit = (TF[k] == 0 and TF[p] == 0) and not red
            ax.add_patch(FancyArrowPatch(
                (px + W / 2, py), (x - W / 2, y),
                connectionstyle=f"arc3,rad={RAD.get((p, k), 0.0)}",
                arrowstyle="-|>,head_width=2.2,head_length=4.4",
                color=RED if crit else GREY, lw=2.2 if crit else 0.8,
                linestyle=(0, (4, 3)) if red else "-",
                shrinkA=0, shrinkB=0, zorder=2 if crit else 1))

    for k, (_, dur, _) in ACT.items():
        x, y = POS[k]
        crit = TF[k] == 0
        col = RED if crit else INK
        ax.add_patch(Rectangle((x - W / 2, y - H / 2), W, H, fc="white",
                     ec=col, lw=2.0 if crit else 0.9, zorder=4))
        ax.plot([x - W / 2, x + W / 2], [y + 2.0, y + 2.0], c=col, lw=0.8, zorder=5)
        ax.text(x, y + 3.6, k, ha="center", va="center", fontsize=10.5,
                weight="bold", color=col, zorder=6)
        ax.text(x - W / 2 + 1.6, y - 0.6, f"ES {ES[k]}", ha="left", va="center",
                fontsize=6.4, color=INK, zorder=6)
        ax.text(x + W / 2 - 1.6, y - 0.6, f"LS {LS[k]}", ha="right", va="center",
                fontsize=6.4, color=INK, zorder=6)
        ax.text(x, y - 3.6, f"dur {dur}   float {TF[k]}", ha="center", va="center",
                fontsize=6.2, color=GREY, zorder=6)

    path = " \u2192 ".join(k for k in sorted(CRIT, key=lambda z: ES[z]))
    ax.text(51, 69, "Critical path  " + path + f"      Project duration  {T} weeks",
            ha="center", va="center", fontsize=10.5, color=RED)
    ax.text(51, -6.5, "Each node shows the activity letter, early start, late start, duration "
                      "and total float.  Red = critical (zero float).  "
                      "Dashed arrows are precedences already implied by a longer chain.",
            ha="center", va="center", fontsize=6.8, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig1_cpm_network.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    diagram()
    print("duration:", T, "weeks")
    print("critical:", sorted(CRIT, key=lambda z: ES[z]))
    for k in sorted(ACT, key=lambda z: (ES[z], z)):
        print(f"  {k}  dur {ACT[k][1]}  ES {ES[k]:2d}  EF {EF[k]:2d}  "
              f"LS {LS[k]:2d}  LF {LF[k]:2d}  TF {TF[k]:2d}")
