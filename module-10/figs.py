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


def chair(ax, lw=1.0, gy=7.0, gx=(4, 60)):
    """Side view manual wheelchair with occupant, facing right."""
    L(ax, [gx[0], gx[1]], [gy, gy], lw=lw * 1.3)
    ax.add_patch(Circle((18, 17), 9.5, fc="none", ec=INK, lw=lw * 1.2, zorder=4))
    for th in np.linspace(0, np.pi, 6)[:-1]:
        L(ax, [18 - 8.2 * np.cos(th), 18 + 8.2 * np.cos(th)],
             [17 - 8.2 * np.sin(th), 17 + 8.2 * np.sin(th)], lw=lw * 0.45, c=GREY, z=3)
    ax.add_patch(Arc((18, 17), 14, 14, theta1=105, theta2=255, ec=INK, lw=lw * 1.7, zorder=6))
    ax.add_patch(Circle((31, 11), 4, fc="none", ec=INK, lw=lw, zorder=4))
    L(ax, [18, 31], [17, 15], lw=lw); L(ax, [31, 31], [15, 11], lw=lw)
    L(ax, [12, 29], [26, 26], lw=lw * 1.4)
    L(ax, [12, 9.5], [26, 40], lw=lw * 1.4)
    L(ax, [29, 33], [26, 15], lw=lw); L(ax, [33, 37], [15, 14], lw=lw * 1.3)
    L(ax, [14, 18], [27.5, 38], lw=lw * 1.3)
    ax.add_patch(Circle((19.5, 41.5), 3.6, fc="white", ec=INK, lw=lw * 1.1, zorder=5))
    L(ax, [18, 26], [38, 33], lw=lw * 1.15)
    return (26, 33)


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
    fig, ax = plt.subplots(figsize=(7.4, 3.4))
    ax.set_xlim(0, 100); ax.set_ylim(0, 56); ax.set_aspect("equal"); ax.axis("off")
    X0, X1 = 29.0, 96.0
    bands = [("ESSENTIAL", 38.5, 13.0, ["Safe unsupervised", "Durability", "Cleanability"], "#e4e4e4"),
             ("IMPORTANT", 23.5, 11.5, ["Setup speed", "Holds attention"], "#efefef"),
             ("LOWER", 10.5, 9.5, ["Cost"], "#f8f8f8")]
    for name, y, h, items, shade in bands:
        R(ax, 4, y - h / 2, 92, h, fc=shade, lw=1.0)
        ax.text(7.5, y, name, ha="left", va="center", fontsize=8.4, zorder=5)
        n = len(items); span = X1 - X0
        for i, it in enumerate(items):
            cx = X0 + (i + 0.5) * span / n
            w = span / n - 2.0
            R(ax, cx - w / 2, y - 3.6, w, 7.2, fc="white", lw=0.9)
            ax.text(cx, y, it, ha="center", va="center", fontsize=6.6, zorder=5)
    ax.text(50, 52.5, "Needs priority as ranked in the care-provider interview",
            ha="center", fontsize=9.2)
    ax.text(50, 2.0, "Cost ranking lowest was the surprise \u2014 it drives the Kano "
                     "classification for the Preliminary Design Review",
            ha="center", fontsize=7.0, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig3_needs_priority.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================== fig 4: solution directions
def fig4():
    fig, axes = plt.subplots(1, 3, figsize=(9.0, 3.1))
    titles = ["A \u2014 Carry it on the chair",
              "B \u2014 Route the force to the ground",
              "C \u2014 Reduce the force at source"]
    subs = ["a mount carries the tool, so the\nreaction reacts through the chair",
            "a ground-bearing strut takes the\nload, leaving the chair unloaded",
            "lighter head, lower torque,\nnothing added to the chair"]
    for k, ax in enumerate(axes):
        ax.set_xlim(0, 64); ax.set_ylim(-11, 51); ax.set_aspect("equal"); ax.axis("off")
        ax.add_patch(Rectangle((1.0, -10.0), 62, 60, fc="none",
                     ec=RED if k == 2 else "#c8c8c8", lw=1.8 if k == 2 else 0.8, zorder=0))
        hand = chair(ax, lw=1.0, gy=7.0, gx=(4, 60))
        if k == 0:
            L(ax, [hand[0], 45], [hand[1], 16], lw=1.7)
            ax.add_patch(Circle((46, 15.2), 2.6, fc=FILL, ec=INK, lw=1.1, zorder=5))
            L(ax, [29, 37.5], [26.5, 23.0], lw=2.2)
            ax.add_patch(Circle((37.5, 23.0), 1.3, fc=INK, ec="none", zorder=6))
            arw(ax, 46, 15.2, 55, 24, lw=1.3, c=RED)
        elif k == 1:
            L(ax, [hand[0], 45], [hand[1], 16], lw=1.7)
            ax.add_patch(Circle((46, 15.2), 2.6, fc=FILL, ec=INK, lw=1.1, zorder=5))
            L(ax, [39.5, 39.5], [19.6, 8.2], lw=2.2)
            L(ax, [35.5, 43.5], [8.2, 8.2], lw=2.4)
            ax.add_patch(Circle((39.5, 19.6), 1.3, fc=INK, ec="none", zorder=6))
            arw(ax, 46, 15.2, 53, 22, lw=1.1, c=RED)
            arw(ax, 39.5, 17.5, 39.5, 10.2, lw=1.4, c=INK)
            ax.text(52, 10.0, "load to\nthe ground", ha="center", va="center", fontsize=6.4,
                    color=GREY, zorder=6)
        else:
            L(ax, [hand[0], 40], [hand[1], 25], lw=1.3)
            ax.add_patch(Circle((40.8, 24.4), 1.6, fc=FILL, ec=INK, lw=1.0, zorder=5))
            arw(ax, 40.8, 24.4, 45.5, 29.0, lw=0.9, c=RED)
            ax.text(50, 38, "preferred\nin interview", ha="center", va="center",
                    fontsize=7.0, color=RED, zorder=6)
        ax.text(32, 47.5, titles[k], ha="center", fontsize=8.4, zorder=6)
        ax.text(32, -6.3, subs[k], ha="center", va="center", fontsize=6.6,
                color=GREY, zorder=6, linespacing=1.45)
    fig.subplots_adjust(wspace=0.03)
    fig.savefig(f"{OUT}/fig4_directions.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4(); print("figures built")
