"""Module 7 figures - trans-radial prosthetic hand concept generation.

Plain technical line art: black lines, white fills, square corners, one hatch
pattern for machined solid, orthogonal connectors. No curves except where the
geometry is genuinely round.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, Polygon, Arc
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#000000"; GREY = "#888888"
LW = 0.9; LWT = 0.6
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 7.0})


def cell(ax):
    ax.set_xlim(-1.4, 22.4); ax.set_ylim(0.5, 9.6)
    ax.set_aspect("equal"); ax.axis("off")


def R(ax, x, y, w, h, fc="white", lw=LW, hatch=None, ec=INK, ls="-"):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=lw, hatch=hatch,
                           linestyle=ls, zorder=3))


def L(ax, xs, ys, lw=LW, c=INK, ls="-", z=3):
    ax.plot(xs, ys, c=c, lw=lw, ls=ls, zorder=z, solid_capstyle="butt")


def arw(ax, x0, y0, x1, y1, lw=LW, c=INK, ls="-", z=6):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), zorder=z,
                arrowprops=dict(arrowstyle="-|>,head_width=0.11,head_length=0.28",
                                color=c, lw=lw, linestyle=ls, shrinkA=0, shrinkB=0))


def ortho(ax, x0, y0, x1, y1, ymid, lw=LWT, c=INK, ls="-", arrow=True):
    L(ax, [x0, x0], [y0, ymid], lw, c, ls); L(ax, [x0, x1], [ymid, ymid], lw, c, ls)
    if arrow:
        arw(ax, x1, ymid, x1, y1, lw, c, ls)
    else:
        L(ax, [x1, x1], [ymid, y1], lw, c, ls)


def tbox(ax, x, y, w, h, t, fs=5.5):
    R(ax, x - w / 2, y - h / 2, w, h)
    ax.text(x, y, t, ha="center", va="center", fontsize=fs, color=INK, zorder=4,
            linespacing=1.3)


def lab(ax, t):
    ax.text(10.5, 1.05, t, ha="center", va="center", fontsize=6.0, color=INK)


def tag(ax, bio):
    ax.text(21.6, 9.1, "biomimetic" if bio else "non-biomimetic", ha="right",
            va="center", fontsize=5.2, color=GREY)


def finger(ax, cx, ybase, hs=(0.95, 0.78, 0.62), w=0.62, lw=LW):
    y = ybase
    for i, h in enumerate(hs):
        R(ax, cx - w / 2, y, w, h, lw=lw)
        if i < len(hs) - 1:
            L(ax, [cx - w / 2, cx + w / 2], [y + h, y + h], lw=LWT, z=4)
        y += h
    return y


def hand(ax, cx, cy, s=1.0, hatch=None):
    """Hand built from rectangles only: palm, four digits, thumb, wrist stub."""
    R(ax, cx - 2.6 * s, cy - 1.9 * s, 5.2 * s, 3.8 * s, hatch=hatch)
    for dx, h in ((-1.9, 2.3), (-0.65, 2.9), (0.65, 2.7), (1.9, 2.0)):
        R(ax, cx + dx * s - 0.45 * s, cy + 1.9 * s, 0.9 * s, h * s)
    R(ax, cx - 4.4 * s, cy - 1.2 * s, 1.8 * s, 0.9 * s)
    R(ax, cx - 1.2 * s, cy - 3.0 * s, 2.4 * s, 1.1 * s)


DIGITS = ((-1.9, 2.3), (-0.65, 2.9), (0.65, 2.7), (1.9, 2.0))


# ================================================================== Figure 1
def fig1():
    fig, ax = plt.subplots(figsize=(6.6, 3.5))
    ax.set_xlim(0, 100); ax.set_ylim(0, 53); ax.set_aspect("equal"); ax.axis("off")
    R(ax, 19, 45.5, 62, 5.5, lw=1.1)
    ax.text(50, 48.25, "TRANS-RADIAL PROSTHETIC HAND", ha="center", va="center",
            fontsize=7.6, zorder=4)
    subs = [("S1   Palm chassis\nand wrist", "palm frame\ndigit bosses\nwrist coupling\nrotation bearing"),
            ("S2   Digits\n(fingers, thumb)", "proximal phalanx\nmiddle phalanx\ndistal phalanx\njoints or flexures"),
            ("S3   Actuation and\ntransmission", "motor(s)\ngearing\ntendons, linkages\nback-drive lock"),
            ("S4   External\ncovering", "cover shell\ngrip surface\nnail detail\nwrist seam seal"),
            ("S5   Control and\nsensing", "EMG electrodes\nsignal conditioning\ncontroller\nforce sensors")]
    xs = np.linspace(11, 89, 5)
    L(ax, [50, 50], [45.5, 40.5]); L(ax, [xs[0], xs[-1]], [40.5, 40.5])
    for x, (name, comps) in zip(xs, subs):
        L(ax, [x, x], [40.5, 36.5])
        R(ax, x - 9.0, 29.5, 18.0, 7.0, lw=1.0)
        ax.text(x, 33.0, name, ha="center", va="center", fontsize=6.6, zorder=4, linespacing=1.4)
        L(ax, [x, x], [29.5, 26.0], lw=LWT, c=GREY)
        for j, line in enumerate(comps.split("\n")):
            ax.text(x, 24.0 - j * 3.3, line, ha="center", va="center", fontsize=6.0, zorder=3)
    ax.text(50, 5.6, "boundary excludes the socket, its suspension and the charger",
            ha="center", va="center", fontsize=6.1, color=GREY)
    fig.savefig(f"{OUT}/fig1_decomposition.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================================== Figure 2
def s1a(ax):
    ax.add_patch(Polygon([(7.0, 3.6), (14.0, 3.6), (14.8, 7.4), (6.2, 7.4)],
                 closed=True, fc="white", ec=INK, lw=LW, zorder=3))
    xs = np.linspace(6.8, 14.2, 5); ys = 7.5 + 0.55 * (1 - ((xs - 10.5) / 4.0) ** 2)
    L(ax, xs, ys, lw=LWT)
    for x, y in zip(xs, ys):
        R(ax, x - 0.22, y - 0.22, 0.44, 0.44, lw=LWT)
    L(ax, [7.6, 10.5, 13.4], [5.6, 4.9, 5.6], lw=LWT, ls=(0, (3, 2)))
    R(ax, 9.4, 2.2, 2.2, 1.4)
    lab(ax, "curved metacarpal arc, passive wrist"); tag(ax, True)


def s1b(ax):
    R(ax, 7.0, 4.4, 7.0, 3.4, hatch="///")
    for x in np.linspace(7.3, 13.7, 5):
        R(ax, x - 0.22, 7.58, 0.44, 0.44, lw=LWT)
    ax.add_patch(Circle((10.5, 3.1), 1.05, fc="white", ec=INK, lw=LW, zorder=3))
    ax.add_patch(Arc((10.5, 3.1), 1.5, 1.5, theta1=40, theta2=310, ec=INK, lw=LWT, zorder=4))
    arw(ax, 11.15, 2.65, 11.35, 3.5, lw=LWT)
    lab(ax, "machined billet, powered wrist roll"); tag(ax, False)


def s1c(ax):
    R(ax, 7.0, 3.8, 7.0, 3.6)
    for i in range(3):
        x0 = 7.0 + i * 2.333
        L(ax, [x0, x0 + 2.333], [3.8, 7.4], lw=LWT, c=GREY)
        L(ax, [x0, x0 + 2.333], [7.4, 3.8], lw=LWT, c=GREY)
    for x in np.linspace(7.3, 13.7, 5):
        R(ax, x - 0.26, 7.14, 0.52, 0.52, lw=LWT)
        L(ax, [x - 0.13, x + 0.13], [7.40, 7.40], lw=LWT)
    R(ax, 9.0, 2.2, 3.0, 1.4)
    lab(ax, "bolt-on modules, friction wrist"); tag(ax, False)


def s2a(ax):
    R(ax, 8.0, 2.6, 5.0, 1.0)
    p = (10.5, 3.6); J = [p]
    for ln, a in ((2.3, 10), (1.8, 34), (1.3, 60)):
        th = np.radians(90 - a); q = (p[0] + ln * np.cos(th), p[1] + ln * np.sin(th))
        L(ax, [p[0], q[0]], [p[1], q[1]], lw=1.6)
        ax.add_patch(Circle(p, 0.26, fc="white", ec=INK, lw=LW, zorder=5)); p = q; J.append(q)
    A = np.array(J)
    for i in (0, 1):
        v = A[i + 1] - A[i]; n = np.array([v[1], -v[0]]); n = 0.5 * n / np.linalg.norm(n)
        L(ax, [(A[i] + n)[0], (A[i + 2] + n)[0]], [(A[i] + n)[1], (A[i + 2] + n)[1]],
          lw=LWT, ls=(0, (3, 2)), z=6)
    lab(ax, "three phalanges, coupled four-bar"); tag(ax, True)


def s2b(ax):
    R(ax, 8.0, 2.6, 5.0, 1.0)
    pts = [(10.1, 3.6), (10.4, 5.1), (11.1, 6.4), (12.1, 7.4), (12.6, 8.3),
           (12.1, 8.5), (11.0, 7.6), (9.9, 6.5), (9.4, 5.1), (9.3, 3.6)]
    ax.add_patch(Polygon(pts, closed=True, fc="white", ec=INK, lw=LW, zorder=3))
    for (x, y) in ((9.4, 5.1), (9.9, 6.5), (11.0, 7.6)):
        L(ax, [x - 0.45, x], [y, y], lw=1.1, z=5)
    lab(ax, "one moulded part, notch flexures"); tag(ax, True)


def s2c(ax):
    R(ax, 7.6, 2.6, 5.8, 1.0)
    ax.add_patch(Polygon([(9.0, 3.6), (9.9, 3.6), (10.3, 8.2), (9.5, 8.2)],
                 closed=True, fc="white", ec=INK, lw=LW, zorder=3))
    ax.add_patch(Polygon([(11.1, 3.6), (12.0, 3.6), (11.5, 8.2), (10.7, 8.2)],
                 closed=True, fc="white", ec=INK, lw=LW, zorder=3))
    ax.add_patch(Circle((10.5, 7.3), 0.78, fc="white", ec=INK, lw=LW, zorder=4))
    arw(ax, 8.1, 5.4, 9.5, 5.4, lw=LWT); arw(ax, 12.9, 5.4, 11.5, 5.4, lw=LWT)
    lab(ax, "rigid opposed jaws, one grasp"); tag(ax, False)


def s3a(ax):
    R(ax, 1.4, 3.2, 4.6, 4.2)
    for y in (4.1, 5.3, 6.5):
        ax.add_patch(Circle((3.7, y), 0.42, fc="white", ec=INK, lw=LWT, zorder=4))
        ax.text(3.7, y, "M", fontsize=4.8, ha="center", va="center", zorder=5)
    L(ax, [7.1, 7.1], [2.9, 8.4], lw=LWT, c=GREY, ls=(0, (3, 2)), z=1)
    R(ax, 11.4, 3.2, 4.6, 2.0)
    for xd in (12.4, 13.7, 15.0):
        finger(ax, xd, 5.2, hs=(1.0, 0.8, 0.65), w=0.72)
    for ys, ye, xv in ((6.5, 4.7, 8.5), (5.3, 4.2, 9.3), (4.1, 3.7, 10.1)):
        L(ax, [6.0, xv, xv, 11.4], [ys, ys, ye, ye], lw=LWT, z=5)
    lab(ax, "forearm motors, tendons over wrist"); tag(ax, True)


def s3b(ax):
    R(ax, 6.6, 2.6, 7.8, 1.2)
    for dx in (-2.7, -0.9, 0.9, 2.7):
        x = 10.5 + dx
        R(ax, x - 0.62, 3.8, 1.24, 2.4)
        R(ax, x - 0.38, 4.1, 0.76, 1.3, lw=LWT)
        ax.text(x, 4.75, "M", fontsize=4.6, ha="center", va="center", zorder=5)
        for k in range(3):
            L(ax, [x - 0.3, x + 0.3], [5.65 + k * 0.17, 5.78 + k * 0.17], lw=LWT, z=5)
        R(ax, x - 0.52, 6.35, 1.04, 1.7)
    lab(ax, "sealed gearmotor in every digit"); tag(ax, False)


def s3c(ax):
    ax.add_patch(Circle((10.5, 2.9), 0.6, fc="white", ec=INK, lw=LW, zorder=4))
    ax.text(10.5, 2.9, "M", fontsize=5.0, ha="center", va="center", zorder=5)
    L(ax, [10.5, 10.5], [3.5, 4.3], lw=LWT)
    L(ax, [7.3, 13.7], [4.3, 4.3], lw=1.5)
    for xb in (7.3, 13.7):
        L(ax, [xb, xb], [4.3, 5.1], lw=LWT)
        L(ax, [xb - 1.3, xb + 1.3], [5.1, 5.1], lw=1.2)
        for xt in (xb - 1.3, xb + 1.3):
            L(ax, [xt, xt], [5.1, 5.6], lw=LWT)
            finger(ax, xt, 5.6, hs=(0.85, 0.7, 0.55), w=0.66)
    lab(ax, "one motor, load-balancing bars"); tag(ax, False)


def s4a(ax):
    hand(ax, 10.5, 5.4, s=0.82)
    for dx, h in DIGITS:
        x = 10.5 + dx * 0.82; top = 5.4 + (1.9 + h) * 0.82
        R(ax, x - 0.24, top - 0.62, 0.48, 0.42, lw=LWT)
    lab(ax, "pigment-matched silicone glove"); tag(ax, True)


def s4b(ax):
    hand(ax, 10.5, 5.4, s=0.82, hatch="....")
    L(ax, [9.6, 11.4], [2.95, 2.95], lw=LWT, ls=(0, (3, 2)), z=6)
    lab(ax, "textured cover, peels at the seam"); tag(ax, False)


def s4c(ax):
    hand(ax, 10.5, 5.4, s=0.82)
    for dx, h in DIGITS:
        x = 10.5 + dx * 0.82
        for f in (0.36, 0.70):
            y = 5.4 + (1.9 + h * f) * 0.82
            L(ax, [x - 0.37, x + 0.37], [y, y], lw=LWT, z=5)
    lab(ax, "exposed structure, no soft cover"); tag(ax, False)


def s5a(ax):
    ax.add_patch(Circle((3.3, 6.0), 1.4, fc="white", ec=INK, lw=LW, zorder=3))
    for th in np.linspace(0, 2 * np.pi, 9)[:-1]:
        x, y = 3.3 + 1.4 * np.cos(th), 6.0 + 1.4 * np.sin(th)
        R(ax, x - 0.17, y - 0.17, 0.34, 0.34, lw=LWT, fc=INK)
    tbox(ax, 10.3, 6.0, 5.0, 2.0, "classifier")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    for i in range(3):
        R(ax, 15.85 + i * 0.95, 6.55, 0.3, 0.3, lw=LWT, fc=INK)
    arw(ax, 4.7, 6.0, 7.8, 6.0); arw(ax, 12.8, 6.0, 15.5, 6.0)
    ortho(ax, 17.0, 6.0, 3.3, 4.6, 3.4, ls=(0, (3, 2)))
    lab(ax, "pattern recognition, force feedback"); tag(ax, True)


def s5b(ax):
    ax.add_patch(Circle((3.3, 6.0), 1.4, fc="white", ec=INK, lw=LW, zorder=3))
    for y in (7.4, 4.6):
        R(ax, 3.3 - 0.2, y - 0.2, 0.4, 0.4, lw=LWT, fc=INK)
    tbox(ax, 10.3, 6.0, 5.0, 2.0, "amplifier")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    arw(ax, 4.7, 6.0, 7.8, 6.0); arw(ax, 12.8, 6.0, 15.5, 6.0)
    ortho(ax, 10.3, 5.0, 3.3, 4.3, 3.4, ls=(0, (3, 2)))
    lab(ax, "two sites, co-contraction to switch"); tag(ax, False)


def s5c(ax):
    R(ax, 1.4, 4.6, 2.8, 2.8)
    R(ax, 1.8, 5.1, 2.0, 1.9, lw=LWT)
    tbox(ax, 10.3, 6.0, 5.2, 2.0, "gesture\ndecoder")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    R(ax, 16.05, 6.55, 0.3, 0.3, lw=LWT, fc=INK)
    arw(ax, 4.2, 6.0, 7.7, 6.0); arw(ax, 12.9, 6.0, 15.5, 6.0)
    lab(ax, "wrist flick or phone app selects"); tag(ax, False)


def fig2():
    rows = [("S1  palm chassis and wrist", (s1a, s1b, s1c)),
            ("S2  digits", (s2a, s2b, s2c)),
            ("S3  actuation and transmission", (s3a, s3b, s3c)),
            ("S4  external covering", (s4a, s4b, s4c)),
            ("S5  control and sensing", (s5a, s5b, s5c))]
    fig, axes = plt.subplots(5, 3, figsize=(6.6, 5.0))
    fig.subplots_adjust(left=0.135, right=0.995, top=0.945, bottom=0.005,
                        wspace=0.02, hspace=0.06)
    for j, h in enumerate(("A", "B", "C")):
        axes[0][j].set_title(h, fontsize=6.6, color=INK, pad=3)
    for i, (rname, fns) in enumerate(rows):
        for j, fn in enumerate(fns):
            ax = axes[i][j]; cell(ax); fn(ax)
            ax.add_patch(Rectangle((-1.2, 0.6), 23.4, 8.9, fc="none", ec="#c8c8c8",
                                   lw=0.5, zorder=0))
        bb = axes[i][0].get_position()
        code, name = rname.split("  ", 1)
        fig.text(0.125, (bb.y0 + bb.y1) / 2, code + "\n" + name.replace(" and ", "\nand "),
                 fontsize=6.3, color=INK, ha="right", va="center", linespacing=1.5)
    fig.savefig(f"{OUT}/fig2_concepts.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================================== Figure 3
def fig3():
    fig, ax = plt.subplots(figsize=(6.4, 3.4))
    ax.set_xlim(0, 100); ax.set_ylim(0, 54); ax.set_aspect("equal"); ax.axis("off")
    R(ax, 43, 2.5, 14, 8.5, lw=1.0)
    for x in np.linspace(44.3, 55.7, 6):
        R(ax, x - 0.75, 5.9, 1.5, 1.5, lw=LWT, fc=INK)
    ax.add_patch(Circle((50, 15.5), 3.9, fc="white", ec=INK, lw=1.1, zorder=4))
    ax.add_patch(Arc((50, 15.5), 5.6, 5.6, theta1=40, theta2=310, ec=INK, lw=LWT, zorder=5))
    arw(ax, 52.4, 13.9, 53.2, 17.2, lw=LWT)
    R(ax, 41, 20.5, 18, 13, hatch="///", lw=1.1)
    R(ax, 33.5, 23.5, 7.5, 4.0, lw=1.0)
    for cx, h in ((43.8, 12.5), (48.4, 15.0), (53.0, 14.0), (57.2, 10.5)):
        R(ax, cx - 1.8, 33.5, 3.6, h, lw=1.0)
        R(ax, cx - 1.1, 35.0, 2.2, 3.0, lw=LWT)
        R(ax, cx - 0.85, 33.5 + h - 2.3, 1.7, 1.7, lw=LWT, fc=INK)
    ax.add_patch(Rectangle((39.6, 19.6), 20.8, 30.5, fc="none", ec=INK, lw=LWT,
                 ls=(0, (3, 2)), zorder=6))
    left = [(50, 2.0, 39.0, 44.0, "replaceable cover  [S4-B]"),
            (38, 2.0, 43.8, 40.0, "four-bar digits  [S2-A]"),
            (25, 2.0, 41.0, 27.0, "monolithic chassis  [S1-B]"),
            (10, 2.0, 44.0, 6.6, "EMG ring and classifier  [S5-A]")]
    right = [(50, 98.0, 53.0, 46.0, "fingertip force sensors  [S5-A]"),
             (37, 98.0, 57.2, 36.5, "worm gearmotor per digit  [S3-B]"),
             (24, 98.0, 59.0, 27.0, "battery bay and driver board"),
             (10, 98.0, 60.5, 15.5, "powered wrist roll  [S1-B]")]
    for y, xt, xp, yp, t in left:
        ax.text(xt, y, t, ha="left", va="center", fontsize=6.2, color=INK)
        L(ax, [xt + 0.4, xp - 1.2, xp], [y - 2.2, y - 2.2, yp], lw=LWT, c=GREY, z=1)
    for y, xt, xp, yp, t in right:
        ax.text(xt, y, t, ha="right", va="center", fontsize=6.2, color=INK)
        L(ax, [xt - 0.4, xp + 1.2, xp], [y - 2.2, y - 2.2, yp], lw=LWT, c=GREY, z=1)
    L(ax, [60.5, 54.0], [15.5, 15.5], lw=LWT, c=GREY, z=1)
    fig.savefig(f"{OUT}/fig3_ideal.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================================== Figure 4
def fig4():
    fig, ax = plt.subplots(figsize=(6.6, 2.9))
    ax.set_xlim(0, 100); ax.set_ylim(0, 44); ax.set_aspect("equal"); ax.axis("off")
    R(ax, 22, 37, 56, 5.0, lw=1.1)
    ax.text(50, 39.5, "F0   Restore prehensile function to the trans-radial limb",
            ha="center", va="center", fontsize=6.8, zorder=4)
    l1 = ["F1  Acquire\nuser intent", "F2  Convert\ncommand to motion", "F3  Apply\ngrasp force",
          "F4  Orient the\nhand in space", "F5  Report\ncontact state"]
    l2 = [["F1.1 sense muscle\nactivity", "F1.2 classify the\nintended grasp"],
          ["F2.1 store energy", "F2.2 produce joint\ntorque", "F2.3 transmit torque\nto the joints"],
          ["F3.1 conform digits\nto the object", "F3.2 hold position\nwithout power"],
          ["F4.1 rotate the hand\nin roll", "F4.2 carry load into\nthe socket"],
          ["F5.1 measure contact\nforce", "F5.2 stimulate the\nresidual skin"]]
    xs = np.linspace(10, 90, 5)
    L(ax, [50, 50], [37, 33.5]); L(ax, [xs[0], xs[-1]], [33.5, 33.5])
    for x, top, subs in zip(xs, l1, l2):
        L(ax, [x, x], [33.5, 30.5])
        R(ax, x - 8.6, 25.0, 17.2, 5.5, lw=1.0)
        ax.text(x, 27.75, top, ha="center", va="center", fontsize=6.1, zorder=4, linespacing=1.35)
        for j, sub in enumerate(subs):
            y = 19.0 - j * 7.0
            L(ax, [x, x], [y + 5.4, y + 2.6], lw=LWT, c=GREY)
            R(ax, x - 8.6, y - 2.6, 17.2, 5.2, lw=LWT, ec=GREY)
            ax.text(x, y, sub, ha="center", va="center", fontsize=5.7, zorder=4, linespacing=1.35)
    fig.savefig(f"{OUT}/fig4_functional.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4(); print("figures built")
