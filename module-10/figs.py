"""Module 10 presentation figures. Plain technical line art: black lines,
white fills, square corners, serif labels."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, Polygon, Arc, Wedge
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#000000"; RED = "#c0392b"; GREY = "#8a8a8a"; FILL = "#f2f2f2"
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 8})


def L(ax, xs, ys, lw=1.0, c=INK, ls="-", z=3):
    ax.plot(xs, ys, c=c, lw=lw, ls=ls, zorder=z, solid_capstyle="round")


def arw(ax, x0, y0, x1, y1, lw=1.1, c=INK, ls="-", z=6):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), zorder=z,
                arrowprops=dict(arrowstyle="-|>,head_width=0.16,head_length=0.38",
                                color=c, lw=lw, linestyle=ls, shrinkA=0, shrinkB=0))


def R(ax, x, y, w, h, fc="white", lw=1.0, ec=INK, hatch=None, ls="-"):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=lw, hatch=hatch,
                           linestyle=ls, zorder=3))


# ============================================================ fig 1: project
def fig1():
    fig, ax = plt.subplots(figsize=(8.0, 4.0))
    ax.set_xlim(0, 214); ax.set_ylim(0, 98); ax.set_aspect("equal"); ax.axis("off")

    gx0, gx1, gy = 20, 134, 12
    L(ax, [gx0, gx1], [gy, gy], lw=1.4)
    for x in np.arange(gx0 + 3, gx1, 7):
        L(ax, [x, x - 3.5], [gy, gy - 3.4], lw=0.6, c=GREY)

    # rear wheel with handrim, caster, frame
    ax.add_patch(Circle((62, 28), 16, fc="none", ec=INK, lw=1.3, zorder=4))
    for th in np.linspace(0, np.pi, 7)[:-1]:
        L(ax, [62 - 14 * np.cos(th), 62 + 14 * np.cos(th)],
             [28 - 14 * np.sin(th), 28 + 14 * np.sin(th)], lw=0.5, c=GREY, z=3)
    ax.add_patch(Arc((62, 28), 25, 25, theta1=105, theta2=255, ec=INK, lw=2.0, zorder=6))
    ax.add_patch(Circle((97, 18), 6, fc="none", ec=INK, lw=1.1, zorder=4))
    L(ax, [62, 97], [28, 24], lw=1.1); L(ax, [97, 97], [24, 18], lw=1.1)

    # seat, back, footplate, occupant
    L(ax, [52, 94], [44, 44], lw=1.6)
    L(ax, [52, 48], [44, 72], lw=1.6)
    L(ax, [94, 101], [44, 26], lw=1.1); L(ax, [101, 108], [26, 24], lw=1.4)
    L(ax, [55, 62], [46, 68], lw=1.5)
    ax.add_patch(Circle((64, 74), 6.2, fc="white", ec=INK, lw=1.2, zorder=5))
    L(ax, [62, 86], [68, 58], lw=1.3)

    # tool
    L(ax, [86, 118], [58, 22], lw=1.8)
    ax.add_patch(Circle((119, 20.5), 4.6, fc=FILL, ec=INK, lw=1.2, zorder=5))

    # 1  reaction force, and the tipping it drives about the caster contact
    arw(ax, 119, 20.5, 131, 33, lw=1.5, c=RED)
    ax.add_patch(Arc((97, 12), 54, 54, theta1=26, theta2=58, ec=RED, lw=1.0,
                     ls=(0, (3, 2)), zorder=5))
    arw(ax, 112.5, 32.5, 108, 36.5, lw=1.0, c=RED)
    ax.add_patch(Circle((97, 12), 1.8, fc=RED, ec="none", zorder=6))

    # 2  working envelope, swept about the shoulder
    ax.add_patch(Arc((62, 68), 104, 104, theta1=-62, theta2=20, ec=INK, lw=0.9,
                     ls=(0, (4, 3)), zorder=2))

    def tag(ty, n, t, px, py, elbow):
        ax.text(146, ty, t, ha="left", va="center", fontsize=8.6, color=INK, zorder=8)
        ax.add_patch(Circle((140, ty), 3.4, fc=INK, ec="none", zorder=8))
        ax.text(140, ty, n, ha="center", va="center", fontsize=7.4, color="white", zorder=9)
        L(ax, [136.6, elbow, elbow, px], [ty, ty, py, py], lw=0.6, c=GREY, z=1)

    tag(80, "1", "Reaction force routes into the chair,\nand tips it about the casters", 122, 36, 133)
    tag(52, "2", "Working envelope: ground level\nto hedge height, from a fixed seat", 112, 86, 127)
    tag(24, "3", "Hands occupied \u2014 the user cannot\npropel and work at the same time", 52, 24, 130)

    ax.text(77, 3.0, "Manual wheelchair user operating a handheld powered yard tool "
                     "on unimproved ground",
            ha="center", va="center", fontsize=8.0, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig1_project.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ======================================================= fig 2: task analysis
def fig2():
    fig, ax = plt.subplots(figsize=(7.8, 3.0))
    ax.set_xlim(0, 118); ax.set_ylim(0, 44); ax.set_aspect("equal"); ax.axis("off")
    TW, TH = 17.0, 6.2

    def task(x, y, t, hard=False, w=TW):
        R(ax, x - w / 2, y - TH / 2, w, TH, lw=1.5 if hard else 1.0,
          ec=RED if hard else INK)
        ax.text(x, y, t, ha="center", va="center", fontsize=6.3, zorder=4, linespacing=1.3)

    def dec(x, y, t):
        ax.add_patch(Polygon([(x - 10, y), (x, y + 5.0), (x + 10, y), (x, y - 5.0)],
                     closed=True, fc="white", ec=INK, lw=1.0, zorder=3))
        ax.text(x, y, t, ha="center", va="center", fontsize=6.1, zorder=4, linespacing=1.3)

    def oval(x, y, t):
        ax.add_patch(matplotlib.patches.Ellipse((x, y), 12, 6, fc="white", ec=INK, lw=1.0, zorder=3))
        ax.text(x, y, t, ha="center", va="center", fontsize=6.3, zorder=4)

    R1, R2 = 34.0, 13.0
    oval(8, R1, "Start")
    task(29, R1, "Propel over\nturf to the area", hard=True)
    dec(53, R1, "Ground\nfirm?")
    task(78, R1, "Set brakes and\nstabilise")
    task(102, R1, "Deploy tool\nfrom stow", hard=True)

    task(14, R2, "Position tool\nat work height")
    task(38, R2, "Operate against\nreaction force", hard=True)
    dec(62, R2, "Area\ndone?")
    task(86, R2, "Stow tool,\nfree the hands")
    oval(107, R2, "End")

    for a, b in ((14.2, 20.2), (37.6, 42.8), (63.2, 69.4), (86.6, 93.4)):
        arw(ax, a, R1, b, R1, lw=0.9)
    ax.text(66.5, R1 + 2.6, "Yes", fontsize=6.1, ha="center")
    L(ax, [53, 53], [R1 - 5.0, 25.0], lw=0.8); L(ax, [53, 29], [25.0, 25.0], lw=0.8)
    arw(ax, 29, 25.0, 29, R1 - TH / 2, lw=0.9)
    ax.text(49.5, 27.0, "No", fontsize=6.1, ha="center")

    L(ax, [102, 102], [R1 - TH / 2, 24.0], lw=0.8); L(ax, [102, 14], [24.0, 24.0], lw=0.8)
    arw(ax, 14, 24.0, 14, R2 + TH / 2, lw=0.9)

    for a, b in ((22.6, 29.2), (46.6, 51.8), (72.2, 77.2), (94.6, 100.8)):
        arw(ax, a, R2, b, R2, lw=0.9)
    ax.text(75.0, R2 + 2.6, "Yes", fontsize=6.1, ha="center")
    L(ax, [62, 62], [R2 - 5.0, 4.0], lw=0.8); L(ax, [62, 38], [4.0, 4.0], lw=0.8)
    arw(ax, 38, 4.0, 38, R2 - TH / 2, lw=0.9)
    ax.text(58.5, 6.2, "No", fontsize=6.1, ha="center")

    ax.text(117, 41, "red = difficult step", ha="right", fontsize=6.6, color=RED)
    fig.savefig(f"{OUT}/fig2_task_analysis.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ===================================================== fig 3: needs priority
def fig3():
    fig, ax = plt.subplots(figsize=(7.2, 3.3))
    ax.set_xlim(0, 100); ax.set_ylim(0, 54); ax.set_aspect("equal"); ax.axis("off")
    bands = [("ESSENTIAL", 37.0, 12.5, ["Safe unsupervised", "Durability", "Cleanability"], "#e4e4e4"),
             ("IMPORTANT", 22.5, 11.0, ["Setup speed", "Holds attention"], "#efefef"),
             ("LOWER", 10.0, 9.0, ["Cost"], "#f8f8f8")]
    for name, y, h, items, shade in bands:
        R(ax, 4, y - h / 2, 92, h, fc=shade, lw=1.0)
        ax.text(9, y, name, ha="left", va="center", fontsize=8.6, zorder=5)
        n = len(items); span = 54.0; x0 = 38.0
        for i, it in enumerate(items):
            cx = x0 + (i + 0.5) * span / n
            w = span / n - 2.5
            R(ax, cx - w / 2, y - 3.6, w, 7.2, fc="white", lw=0.9)
            ax.text(cx, y, it, ha="center", va="center", fontsize=6.3, zorder=5)
    ax.text(50, 50.5, "Needs priority as ranked in the care-provider interview",
            ha="center", fontsize=9.0)
    ax.text(50, 2.0, "Cost ranking lowest was the surprise \u2014 it drives the Kano "
                     "classification for the Preliminary Design Review",
            ha="center", fontsize=7.0, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig3_needs_priority.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================== fig 4: solution directions
def fig4():
    fig, axes = plt.subplots(1, 3, figsize=(8.2, 2.9))
    titles = ["A — Carry it on the chair",
              "B — Route force to the ground",
              "C — Reduce the force at source"]
    subs = ["reaction torque reacts through\nthe chair's stability envelope",
            "an outrigger or stake takes the\nload instead of the chair",
            "lighter head, lower torque,\nnothing added to the chair"]
    for k, ax in enumerate(axes):
        ax.set_xlim(0, 40); ax.set_ylim(0, 34); ax.set_aspect("equal"); ax.axis("off")
        ax.add_patch(Rectangle((0.6, 0.6), 38.8, 32.8, fc="none",
                     ec=RED if k == 2 else "#cccccc", lw=1.6 if k == 2 else 0.7, zorder=0))
        L(ax, [5, 35], [7, 7], lw=1.1)
        ax.add_patch(Circle((14, 12), 5, fc="none", ec=INK, lw=1.1, zorder=4))
        ax.add_patch(Circle((22, 9), 2, fc="none", ec=INK, lw=0.9, zorder=4))
        L(ax, [14, 22], [12, 11], lw=0.9); L(ax, [22, 22], [11, 9], lw=0.9)
        L(ax, [11, 24], [17, 17], lw=1.3); L(ax, [11, 10], [17, 24], lw=1.3)
        ax.add_patch(Circle((15, 26), 2.6, fc="white", ec=INK, lw=1.0, zorder=5))
        if k == 0:
            L(ax, [16, 30], [23, 12], lw=1.5)
            ax.add_patch(Circle((30.6, 11.4), 2.0, fc=FILL, ec=INK, lw=1.0, zorder=5))
            L(ax, [18, 24], [18, 20], lw=1.4)
            arw(ax, 30.6, 11.4, 35, 16, lw=1.1, c=RED)
            ax.add_patch(Arc((14, 12), 18, 18, theta1=20, theta2=62, ec=RED, lw=1.0,
                             ls=(0, (3, 2)), zorder=5))
        elif k == 1:
            L(ax, [16, 30], [23, 12], lw=1.5)
            ax.add_patch(Circle((30.6, 11.4), 2.0, fc=FILL, ec=INK, lw=1.0, zorder=5))
            L(ax, [26, 26], [15, 7], lw=1.6)
            L(ax, [23, 29], [7, 7], lw=1.8)
            arw(ax, 30.6, 11.4, 34, 15, lw=1.0, c=RED)
            arw(ax, 26, 13, 26, 8.4, lw=1.1, c=INK)
        else:
            L(ax, [16, 27], [23, 14], lw=1.2)
            ax.add_patch(Circle((27.5, 13.4), 1.3, fc=FILL, ec=INK, lw=0.9, zorder=5))
            arw(ax, 27.5, 13.4, 29.8, 15.8, lw=0.8, c=RED)
            ax.text(33, 24, "preferred\nin interview", ha="center", va="center",
                    fontsize=6.2, color=RED, zorder=6)
        ax.text(20, 31.2, titles[k], ha="center", fontsize=7.8, zorder=6)
        ax.text(20, 3.1, subs[k], ha="center", va="center", fontsize=6.3,
                color=GREY, zorder=6, linespacing=1.4)
    fig.subplots_adjust(wspace=0.04)
    fig.savefig(f"{OUT}/fig4_directions.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4(); print("figures built")
