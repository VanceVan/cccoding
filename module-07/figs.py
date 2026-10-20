"""Module 7 figures - trans-radial prosthetic hand concept generation.

Drawn as monochrome drafting sketches: black ink, square corners, light
section hatching, serif annotation, and a small sketch wobble applied to the
geometry (not to the lettering) so the linework reads as drawn rather than
plotted.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, Polygon, Arc, FancyBboxPatch
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#161616"; GREY = "#8e8e8e"; FILL = "#f2f2f2"
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 7.0})


def sk(ax, scale=0.9, length=140, rand=2):
    """Hand-drawn wobble on geometry only; text stays crisp."""
    for a in list(ax.patches) + list(ax.lines):
        a.set_sketch_params(scale, length, rand)


def cell(ax):
    ax.set_xlim(-1.4, 22.4); ax.set_ylim(0.5, 9.6); ax.set_aspect("equal"); ax.axis("off")


def arw(ax, x0, y0, x1, y1, lw=0.8, c=INK, rad=0.0, ls="-"):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                arrowprops=dict(arrowstyle="-|>,head_width=0.12,head_length=0.3",
                                color=c, lw=lw, linestyle=ls,
                                connectionstyle=f"arc3,rad={rad}",
                                shrinkA=0, shrinkB=0))


def lab(ax, t, y=0.75):
    ax.text(10.5, y, t, ha="center", va="center", fontsize=6.0, color=INK)


def tag(ax, bio):
    ax.text(20.3, 9.35, "biomimetic" if bio else "non-biomimetic", ha="right",
            va="center", fontsize=5.2, color=GREY, style="italic")


def rect(ax, x, y, w, h, fc="white", lw=0.9, hatch=None, ec=INK, ls="-"):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=lw, hatch=hatch,
                           linestyle=ls, zorder=3))


def tbox(ax, x, y, w, h, t, fs=5.5, fc="white"):
    ax.add_patch(Rectangle((x - w / 2, y - h / 2), w, h, fc=fc, ec=INK, lw=0.9, zorder=3))
    ax.text(x, y, t, ha="center", va="center", fontsize=fs, color=INK, zorder=4,
            linespacing=1.3)


def finger(ax, cx, ybase, hs=(1.5, 1.2, 1.0), w=1.0, lw=0.9):
    y = ybase
    for i, h in enumerate(hs):
        ax.add_patch(Rectangle((cx - w / 2, y), w, h, fc="white", ec=INK, lw=lw, zorder=3))
        if i < len(hs) - 1:
            ax.add_patch(Circle((cx, y + h), 0.22, fc="white", ec=INK, lw=lw, zorder=4))
        y += h + 0.12
    return y


def palm_hand(ax, cx, cy, s=1.0, fc="white"):
    """Small hand silhouette: palm, four digits, thumb, wrist stub."""
    rect(ax, cx - 2.6 * s, cy - 1.9 * s, 5.2 * s, 3.8 * s, fc=fc)
    for dx, h in ((-1.9, 2.3), (-0.65, 2.9), (0.65, 2.7), (1.9, 2.0)):
        rect(ax, cx + dx * s - 0.45 * s, cy + 1.9 * s, 0.9 * s, h * s, fc=fc)
    rect(ax, cx - 4.4 * s, cy - 1.2 * s, 1.8 * s, 0.9 * s, fc=fc)
    rect(ax, cx - 1.2 * s, cy - 3.0 * s, 2.4 * s, 1.1 * s, fc=FILL)


# ================================================================== Figure 1
def fig1():
    fig, ax = plt.subplots(figsize=(6.6, 3.5))
    ax.set_xlim(0, 100); ax.set_ylim(0, 53); ax.set_aspect("equal"); ax.axis("off")
    ax.add_patch(Rectangle((19, 45.5), 62, 5.5, fc="white", ec=INK, lw=1.1, zorder=3))
    ax.text(50, 48.25, "TRANS-RADIAL PROSTHETIC HAND", ha="center", va="center",
            fontsize=7.6, zorder=4)
    subs = [("S1   Palm chassis\nand wrist", "palm frame\ndigit bosses\nwrist coupling\nrotation bearing"),
            ("S2   Digits\n(fingers, thumb)", "proximal phalanx\nmiddle phalanx\ndistal phalanx\njoints or flexures"),
            ("S3   Actuation and\ntransmission", "motor(s)\ngearing\ntendons, linkages\nback-drive lock"),
            ("S4   External\ncovering", "cover shell\ngrip surface\nnail detail\nwrist seam seal"),
            ("S5   Control and\nsensing", "EMG electrodes\nsignal conditioning\ncontroller\nforce sensors")]
    xs = np.linspace(11, 89, 5)
    ax.plot([50, 50], [45.5, 40.5], c=INK, lw=0.9, zorder=1)
    ax.plot([xs[0], xs[-1]], [40.5, 40.5], c=INK, lw=0.9, zorder=1)
    for x, (name, comps) in zip(xs, subs):
        ax.plot([x, x], [40.5, 36.5], c=INK, lw=0.9, zorder=1)
        ax.add_patch(Rectangle((x - 9.0, 29.5), 18.0, 7.0, fc="white", ec=INK, lw=1.0, zorder=3))
        ax.text(x, 33.0, name, ha="center", va="center", fontsize=6.6, zorder=4, linespacing=1.4)
        ax.plot([x, x], [29.5, 26.0], c=GREY, lw=0.8, zorder=1)
        for j, line in enumerate(comps.split("\n")):
            ax.text(x, 24.0 - j * 3.3, line, ha="center", va="center", fontsize=6.0,
                    color=INK, zorder=3)
    ax.text(50, 5.6, "boundary excludes the socket, its suspension and the charger",
            ha="center", va="center", fontsize=6.1, color=GREY, style="italic")
    sk(ax)
    fig.savefig(f"{OUT}/fig1_decomposition.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================================== Figure 2
# --- S1 -------------------------------------------------------------------
def s1a(ax):
    ax.add_patch(Polygon([(7.0, 3.6), (14.0, 3.6), (14.8, 7.4), (6.2, 7.4)],
                 closed=True, fc=FILL, ec=INK, lw=1.0, zorder=3))
    xs = np.linspace(6.8, 14.2, 5); ys = 7.5 + 0.55 * (1 - ((xs - 10.5) / 4.0) ** 2)
    ax.plot(xs, ys, c=INK, lw=0.7, ls=(0, (2, 1.5)), zorder=4)
    for x, y in zip(xs, ys):
        ax.add_patch(Circle((x, y), 0.26, fc="white", ec=INK, lw=0.8, zorder=5))
    ax.add_patch(Arc((10.5, 5.1), 5.4, 2.0, theta1=200, theta2=340, ec=INK, lw=0.8,
                 ls=(0, (2, 1.5)), zorder=4))
    ax.add_patch(Polygon([(9.3, 3.6), (11.7, 3.6), (11.3, 2.1), (9.7, 2.1)],
                 closed=True, fc="white", ec=INK, lw=0.9, zorder=3))
    lab(ax, "curved metacarpal arc, passive wrist")
    tag(ax, True)


def s1b(ax):
    rect(ax, 7.0, 3.8, 7.0, 3.6, hatch="///")
    for x in np.linspace(7.3, 13.7, 5):
        ax.add_patch(Circle((x, 7.4), 0.26, fc="white", ec=INK, lw=0.8, zorder=5))
    ax.add_patch(Circle((10.5, 2.6), 1.15, fc="white", ec=INK, lw=1.0, zorder=3))
    ax.add_patch(Arc((10.5, 2.6), 1.6, 1.6, theta1=35, theta2=300, ec=INK, lw=0.9, zorder=4))
    ax.annotate("", xy=(11.42, 3.08), xytext=(11.3, 2.52),
                arrowprops=dict(arrowstyle="-|>,head_width=0.1,head_length=0.26", color=INK, lw=0.9))
    lab(ax, "machined billet, powered wrist roll")
    tag(ax, False)


def s1c(ax):
    rect(ax, 7.0, 3.8, 7.0, 3.6)
    for i in range(3):
        x0 = 7.0 + i * 2.333
        ax.plot([x0, x0 + 2.333], [3.8, 7.4], c=GREY, lw=0.7, zorder=4)
        ax.plot([x0, x0 + 2.333], [7.4, 3.8], c=GREY, lw=0.7, zorder=4)
    for x in np.linspace(7.3, 13.7, 5):
        ax.add_patch(Circle((x, 7.4), 0.3, fc="white", ec=INK, lw=0.8, zorder=5))
        ax.add_patch(Circle((x, 7.4), 0.1, fc=INK, ec="none", zorder=6))
    rect(ax, 9.0, 2.0, 3.0, 1.4, fc=FILL)
    lab(ax, "bolt-on modules, friction wrist")
    tag(ax, False)


# --- S2 -------------------------------------------------------------------
def s2a(ax):
    rect(ax, 8.0, 2.6, 5.0, 1.0, fc=FILL)
    p = (10.5, 3.6); J = [p]
    for L, a in ((2.3, 10), (1.8, 34), (1.3, 60)):
        th = np.radians(90 - a); q = (p[0] + L * np.cos(th), p[1] + L * np.sin(th))
        ax.plot([p[0], q[0]], [p[1], q[1]], c=INK, lw=3.4, solid_capstyle="round", zorder=3)
        ax.plot([p[0], q[0]], [p[1], q[1]], c="white", lw=1.8, solid_capstyle="round", zorder=4)
        ax.add_patch(Circle(p, 0.24, fc="white", ec=INK, lw=0.9, zorder=5)); p = q; J.append(q)
    A = np.array(J)
    for i in (0, 1):
        s = A[i + 1] - A[i]; n = np.array([s[1], -s[0]]); n = 0.45 * n / np.linalg.norm(n)
        ax.plot([(A[i] + n)[0], (A[i + 2] + n)[0]], [(A[i] + n)[1], (A[i + 2] + n)[1]],
                c=INK, lw=0.7, ls=(0, (2, 1.5)), zorder=6)
    lab(ax, "three phalanges, coupled four-bar")
    tag(ax, True)


def s2b(ax):
    rect(ax, 8.0, 2.6, 5.0, 1.0, fc=FILL)
    t = np.linspace(0, 1, 60)
    cx = 10.5 + 2.3 * t ** 1.9; cy = 3.6 + 5.0 * t - 0.6 * t ** 2; w = 0.52 * (1 - 0.45 * t)
    ax.fill_betweenx(cy, cx - w, cx + w, fc=FILL, ec=INK, lw=0.9, zorder=3)
    for f in (0.30, 0.55, 0.80):
        i = int(f * 59)
        ax.plot([cx[i] - w[i] - 0.05, cx[i] - w[i] + 0.34], [cy[i], cy[i]], c=INK, lw=1.1, zorder=5)
    lab(ax, "one moulded part, notch flexures")
    tag(ax, True)


def s2c(ax):
    rect(ax, 7.6, 2.6, 5.8, 1.0, fc=FILL)
    ax.add_patch(Polygon([(9.0, 3.6), (9.9, 3.6), (10.35, 8.2), (9.45, 8.3)],
                 closed=True, fc="white", ec=INK, lw=1.0, zorder=3))
    ax.add_patch(Polygon([(11.1, 3.6), (12.0, 3.6), (11.55, 8.3), (10.65, 8.2)],
                 closed=True, fc="white", ec=INK, lw=1.0, zorder=3))
    ax.add_patch(Circle((10.5, 7.3), 0.78, fc=FILL, ec=INK, lw=0.9, zorder=4))
    arw(ax, 8.1, 5.4, 9.4, 5.4); arw(ax, 12.9, 5.4, 11.6, 5.4)
    lab(ax, "rigid opposed jaws, one grasp")
    tag(ax, False)


# --- S3 -------------------------------------------------------------------
def s3a(ax):
    rect(ax, 1.4, 3.2, 4.6, 4.2, fc=FILL)
    for y in (4.1, 5.3, 6.5):
        ax.add_patch(Circle((3.7, y), 0.42, fc="white", ec=INK, lw=0.8, zorder=4))
    ax.plot([7.1, 7.1], [2.9, 8.2], c=GREY, lw=0.7, ls=(0, (2, 2)), zorder=1)
    rect(ax, 11.4, 3.4, 4.6, 2.2, fc=FILL)
    for i, xd in enumerate((12.4, 13.7, 15.0)):
        finger(ax, xd, 5.6, hs=(1.0, 0.8, 0.65), w=0.72, lw=0.8)
    for ys, xd in ((6.5, 12.4), (5.3, 13.7), (4.1, 15.0)):
        xx = np.linspace(6.0, xd, 40); yy = ys + (8.1 - ys) * (np.linspace(0, 1, 40) ** 2.2)
        ax.plot(xx, yy, c=INK, lw=0.8, zorder=5)
    lab(ax, "forearm motors, tendons over wrist")
    tag(ax, True)


def s3b(ax):
    rect(ax, 6.6, 2.6, 7.8, 1.2, fc=FILL)
    for dx in (-2.7, -0.9, 0.9, 2.7):
        x = 10.5 + dx
        rect(ax, x - 0.62, 3.8, 1.24, 2.4)
        rect(ax, x - 0.38, 4.1, 0.76, 1.3, fc="#dcdcdc", lw=0.7)
        zz = np.linspace(5.6, 6.1, 9)
        ax.plot(x + 0.2 * (-1) ** np.arange(9), zz, c=INK, lw=0.7, zorder=5)
        rect(ax, x - 0.52, 6.35, 1.04, 1.7)
    lab(ax, "sealed gearmotor in every digit")
    tag(ax, False)


def s3c(ax):
    ax.add_patch(Circle((10.5, 2.9), 0.6, fc="white", ec=INK, lw=0.9, zorder=4))
    ax.plot([10.5, 10.5], [3.5, 4.3], c=INK, lw=0.8, zorder=3)
    ax.plot([7.3, 13.7], [4.3, 4.3], c=INK, lw=1.5, solid_capstyle="round", zorder=3)
    for xb in (7.3, 13.7):
        ax.plot([xb, xb], [4.3, 5.1], c=INK, lw=0.8, zorder=3)
        ax.plot([xb - 1.3, xb + 1.3], [5.1, 5.1], c=INK, lw=1.3, solid_capstyle="round", zorder=3)
        for xt in (xb - 1.3, xb + 1.3):
            ax.plot([xt, xt], [5.1, 5.6], c=INK, lw=0.7, zorder=3)
            finger(ax, xt, 5.6, hs=(0.85, 0.7, 0.55), w=0.66, lw=0.8)
    lab(ax, "one motor, load-balancing bars")
    tag(ax, False)


# --- S4 -------------------------------------------------------------------
def s4a(ax):
    palm_hand(ax, 10.5, 5.4, s=0.82, fc="#ededed")
    for dx, h in ((-1.9, 2.3), (-0.65, 2.9), (0.65, 2.7), (1.9, 2.0)):
        rect(ax, 10.5 + dx * 0.82 - 0.26, 5.4 + (1.9 + h) * 0.82 - 0.62, 0.52, 0.42, lw=0.6)
    for r in (0.3, 0.52, 0.74):
        ax.add_patch(Arc((12.3, 4.6), r * 2, r * 2.3, theta1=0, theta2=360, ec=GREY, lw=0.5, zorder=5))
    lab(ax, "pigment-matched silicone glove")
    tag(ax, True)


def s4b(ax):
    palm_hand(ax, 10.5, 5.4, s=0.82, fc="#e4e4e4")
    rng = np.random.default_rng(5)
    for _ in range(95):
        ax.plot(rng.uniform(8.6, 12.4), rng.uniform(4.0, 7.4), marker=".", ms=0.9,
                c="#6e6e6e", zorder=6)
    ax.plot([9.6, 11.4], [2.9, 2.9], c=INK, lw=0.9, ls=(0, (2, 1.5)), zorder=7)
    lab(ax, "textured cover, peels at the seam")
    tag(ax, False)


def s4c(ax):
    palm_hand(ax, 10.5, 5.4, s=0.82, fc="white")
    for dx, h in ((-1.9, 2.3), (-0.65, 2.9), (0.65, 2.7), (1.9, 2.0)):
        for f in (0.36, 0.70):
            y = 5.4 + (1.9 + h * f) * 0.82
            ax.plot([10.5 + dx * 0.82 - 0.37, 10.5 + dx * 0.82 + 0.37], [y, y], c=INK, lw=0.7, zorder=5)
    ax.plot([8.5, 12.5], [5.0, 5.0], c=GREY, lw=0.6, zorder=5)
    lab(ax, "exposed structure, no soft cover")
    tag(ax, False)


# --- S5 -------------------------------------------------------------------
def s5a(ax):
    ax.add_patch(Circle((3.3, 6.0), 1.4, fc=FILL, ec=INK, lw=0.9, zorder=3))
    for th in np.linspace(0, 2 * np.pi, 9)[:-1]:
        ax.add_patch(Circle((3.3 + 1.4 * np.cos(th), 6.0 + 1.4 * np.sin(th)), 0.2,
                     fc=INK, ec="none", zorder=5))
    tbox(ax, 10.3, 6.0, 5.0, 2.0, "classifier")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    for i in range(3):
        ax.add_patch(Circle((16.0 + i * 1.0, 6.7), 0.17, fc=INK, ec="none", zorder=5))
    arw(ax, 4.8, 6.0, 7.7, 6.0); arw(ax, 12.9, 6.0, 15.4, 6.0)
    arw(ax, 17.0, 4.8, 3.3, 4.4, rad=-0.16, ls=(0, (3, 2)))
    lab(ax, "pattern recognition, force feedback")
    tag(ax, True)


def s5b(ax):
    ax.add_patch(Circle((3.3, 6.0), 1.4, fc=FILL, ec=INK, lw=0.9, zorder=3))
    ax.add_patch(Circle((3.3, 7.4), 0.24, fc=INK, ec="none", zorder=5))
    ax.add_patch(Circle((3.3, 4.6), 0.24, fc=INK, ec="none", zorder=5))
    tbox(ax, 10.3, 6.0, 5.0, 2.0, "amplifier")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    arw(ax, 4.8, 6.0, 7.7, 6.0); arw(ax, 12.9, 6.0, 15.4, 6.0)
    ax.add_patch(Arc((10.3, 4.3), 13.4, 2.6, theta1=190, theta2=350, ec=INK, lw=0.8,
                 ls=(0, (3, 2)), zorder=4))
    ax.annotate("", xy=(3.55, 4.55), xytext=(3.8, 4.25),
                arrowprops=dict(arrowstyle="-|>,head_width=0.1,head_length=0.26", color=INK, lw=0.8))
    lab(ax, "two sites, co-contraction to switch")
    tag(ax, False)


def s5c(ax):
    rect(ax, 1.9, 4.6, 2.8, 3.0)
    rect(ax, 2.3, 5.1, 2.0, 2.0, fc=FILL, lw=0.7)
    tbox(ax, 10.3, 6.0, 5.2, 2.0, "gesture\ndecoder")
    tbox(ax, 17.0, 6.0, 3.0, 2.0, "hand")
    ax.add_patch(Circle((16.2, 6.7), 0.17, fc=INK, ec="none", zorder=5))
    arw(ax, 5.0, 6.0, 7.6, 6.0); arw(ax, 12.9, 6.0, 15.4, 6.0)
    lab(ax, "wrist flick or phone app selects")
    tag(ax, False)


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
            ax = axes[i][j]; cell(ax); fn(ax); sk(ax)
            ax.add_patch(Rectangle((-1.2, 0.6), 23.4, 8.9, fc="none", ec="#cfcfcf",
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
    rect(ax, 43, 2.5, 14, 8.5, fc="#ededed", lw=1.0)
    for x in np.linspace(44.4, 55.6, 6):
        ax.add_patch(Circle((x, 6.6), 0.85, fc=INK, ec="none", zorder=5))
    ax.add_patch(Circle((50, 15.5), 3.9, fc="white", ec=INK, lw=1.1, zorder=4))
    ax.add_patch(Arc((50, 15.5), 5.6, 5.6, theta1=35, theta2=300, ec=INK, lw=1.0, zorder=5))
    ax.annotate("", xy=(53.1, 17.0), xytext=(52.7, 15.2),
                arrowprops=dict(arrowstyle="-|>,head_width=0.12,head_length=0.3", color=INK, lw=1.0))
    rect(ax, 41, 20.5, 18, 13, hatch="///", lw=1.1)
    rect(ax, 33.5, 23.5, 7.5, 4.0, lw=1.0)
    for cx, h in ((43.8, 12.5), (48.4, 15.0), (53.0, 14.0), (57.2, 10.5)):
        rect(ax, cx - 1.8, 33.5, 3.6, h, lw=1.0)
        rect(ax, cx - 1.1, 35.0, 2.2, 3.0, fc="#dcdcdc", lw=0.7)
        ax.add_patch(Circle((cx, 33.5 + h - 1.5), 0.85, fc=INK, ec="none", zorder=5))
    ax.add_patch(Rectangle((39.6, 19.6), 20.8, 30.5, fc="none", ec=INK, lw=0.8,
                 ls=(0, (3, 2)), zorder=6))
    L = [(50, 2.0, 39.0, 44.0, "replaceable cover  [S4-B]"),
         (38, 2.0, 43.8, 40.0, "four-bar digits  [S2-A]"),
         (25, 2.0, 41.0, 27.0, "monolithic chassis  [S1-B]"),
         (10, 2.0, 44.0, 6.6, "EMG ring and classifier  [S5-A]")]
    R = [(50, 98.0, 53.0, 46.0, "fingertip force sensors  [S5-A]"),
         (37, 98.0, 57.2, 36.5, "worm gearmotor per digit  [S3-B]"),
         (24, 98.0, 59.0, 27.0, "battery bay and driver board"),
         (10, 98.0, 53.6, 15.5, "powered wrist roll  [S1-B]")]
    for y, xt, xp, yp, t in L:
        ax.text(xt, y, t, ha="left", va="center", fontsize=6.2, color=INK)
        ax.plot([xt + 0.4, xp - 1.2, xp], [y - 2.2, y - 2.2, yp], c=GREY, lw=0.6, zorder=1)
    for y, xt, xp, yp, t in R:
        ax.text(xt, y, t, ha="right", va="center", fontsize=6.2, color=INK)
        ax.plot([xt - 0.4, xp + 1.2, xp], [y - 2.2, y - 2.2, yp], c=GREY, lw=0.6, zorder=1)
    sk(ax)
    fig.savefig(f"{OUT}/fig3_ideal.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ================================================================== Figure 4
def fig4():
    fig, ax = plt.subplots(figsize=(6.6, 2.9))
    ax.set_xlim(0, 100); ax.set_ylim(0, 44); ax.set_aspect("equal"); ax.axis("off")
    ax.add_patch(Rectangle((22, 37), 56, 5.0, fc="white", ec=INK, lw=1.1, zorder=3))
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
    ax.plot([50, 50], [37, 33.5], c=INK, lw=0.9, zorder=1)
    ax.plot([xs[0], xs[-1]], [33.5, 33.5], c=INK, lw=0.9, zorder=1)
    for x, top, subs in zip(xs, l1, l2):
        ax.plot([x, x], [33.5, 30.5], c=INK, lw=0.9, zorder=1)
        ax.add_patch(Rectangle((x - 8.6, 25.0), 17.2, 5.5, fc="white", ec=INK, lw=1.0, zorder=3))
        ax.text(x, 27.75, top, ha="center", va="center", fontsize=6.1, zorder=4, linespacing=1.35)
        for j, sub in enumerate(subs):
            y = 19.0 - j * 7.0
            ax.plot([x, x], [y + 5.4, y + 2.6], c=GREY, lw=0.7, zorder=1)
            ax.add_patch(Rectangle((x - 8.6, y - 2.6), 17.2, 5.2, fc="white", ec=GREY, lw=0.8, zorder=3))
            ax.text(x, y, sub, ha="center", va="center", fontsize=5.7, zorder=4, linespacing=1.35)
    sk(ax)
    fig.savefig(f"{OUT}/fig4_functional.png", dpi=320, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4(); print("figures built")
