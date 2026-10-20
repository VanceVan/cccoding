"""Module 7 figures: concept generation for a trans-radial prosthetic hand.

Layout discipline for every 3-panel concept figure:
  title      y = 9.60    subtitle y = 9.00
  drawing    y = 2.60 .. 8.40      x = 1.00 .. 9.00
  caption    anchored va='top' at y = 2.25
Inline annotation is avoided; explanation lives in the caption block.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon, Arc
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#1a1a1a"; ACC = "#1f4e79"; RED = "#b23a3a"; SOFT = "#e8eef5"; GREY = "#8a8a8a"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 7.2})


def ax_blank(ax, xl=(0, 10), yl=(0, 10)):
    ax.set_xlim(*xl); ax.set_ylim(*yl); ax.set_aspect("equal"); ax.axis("off")


def box(ax, x, y, w, h, t, fs=6.4, fc=SOFT, ec=ACC, lw=1.0, bold=False):
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                 boxstyle="round,pad=0.02,rounding_size=0.12",
                 fc=fc, ec=ec, lw=lw, zorder=2))
    ax.text(x, y, t, ha="center", va="center", fontsize=fs, zorder=3, color=INK,
            weight="bold" if bold else "normal", linespacing=1.35)


def head(ax, t, sub):
    ax.text(5, 9.60, t, ha="center", va="center", fontsize=6.9, weight="bold", color=ACC)
    ax.text(5, 9.00, sub, ha="center", va="center", fontsize=6.3, color=GREY, style="italic")


def cap(ax, t):
    ax.text(5, 2.40, t, ha="center", va="top", fontsize=5.9, color=INK, linespacing=1.6)


def arrow(ax, x0, y0, x1, y1, c=ACC, lw=1.1, rad=0.0):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                arrowprops=dict(arrowstyle="-|>", color=c, lw=lw,
                                connectionstyle=f"arc3,rad={rad}"))


def digit(ax, cx, ybase, hs=(0.95, 0.78, 0.62), w=0.62, ec=INK, fc="white", lw=0.9):
    y = ybase
    for i, h in enumerate(hs):
        ax.add_patch(FancyBboxPatch((cx - w / 2, y), w, h,
                     boxstyle="round,pad=0.01,rounding_size=0.18",
                     fc=fc, ec=ec, lw=lw, zorder=3))
        if i < len(hs) - 1:
            ax.add_patch(Circle((cx, y + h), 0.15, fc="white", ec=ec, lw=lw, zorder=4))
        y += h + 0.09
    return y


# ---------------------------------------------------------------- Figure 1
def fig1():
    fig, ax = plt.subplots(figsize=(6.8, 4.0)); ax_blank(ax, (0, 100), (0, 57))
    box(ax, 50, 53.0, 58, 5.6, "TRANS-RADIAL PROSTHETIC HAND\n"
        "(system boundary: everything distal to the socket lamination ring)",
        fs=7.2, bold=True, fc="#d7e3ef")
    subs = [("S1  Palm chassis\n& wrist interface",
             "Palm frame\nDigit mounting bosses\nWrist coupling\nRotation bearing\nBattery bay"),
            ("S2  Digits\n(fingers & thumb)",
             "Proximal phalanx\nMiddle phalanx\nDistal phalanx\nJoint pins / flexures\nThumb CMC unit"),
            ("S3  Actuation &\ntransmission",
             "Motor(s)\nGearing / worm set\nTendons or linkages\nDifferential elements\nBack-drive lock"),
            ("S4  External\ncovering (skin)",
             "Outer cover shell\nGrip surface\nNail / detail features\nWrist seam seal\nAttachment lip"),
            ("S5  Control &\nsensing",
             "EMG electrodes\nSignal conditioning\nEmbedded controller\nFingertip force sensors\nFeedback actuator")]
    xs = np.linspace(11, 89, 5)
    for x, (name, comps) in zip(xs, subs):
        ymid = 45.0
        ax.plot([50, 50], [50.2, ymid], c=ACC, lw=0.9, zorder=1)
        ax.plot([xs[0], xs[-1]], [ymid, ymid], c=ACC, lw=0.9, zorder=1)
        ax.plot([x, x], [ymid, 41.0], c=ACC, lw=0.9, zorder=1)
        box(ax, x, 37.5, 18.2, 6.6, name, fs=6.7, bold=True)
        ax.plot([x, x], [34.2, 32.0], c=ACC, lw=0.9, zorder=1)
        ax.add_patch(FancyBboxPatch((x - 9.1, 15.2), 18.2, 16.8,
                     boxstyle="round,pad=0.02,rounding_size=0.4",
                     fc="white", ec=GREY, lw=0.7, zorder=2))
        for j, line in enumerate(comps.split("\n")):
            ax.text(x - 8.3, 30.2 - j * 3.3, "• " + line, ha="left", va="center",
                    fontsize=5.5, color=INK, zorder=3)
    ax.text(50, 10.5, "Interfaces outside the boundary: forearm socket and suspension, "
                     "battery charger, clinician fitting software.",
            ha="center", va="center", fontsize=6.3, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig1_decomposition.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 2
def fig2():
    fig, axes = plt.subplots(1, 3, figsize=(6.8, 3.2)); [ax_blank(a) for a in axes]

    a = axes[0]; head(a, "A — Carpal-arch chassis", "biomimetic")
    a.add_patch(Polygon([(3.1, 4.3), (6.9, 4.3), (7.2, 7.3), (2.8, 7.3)],
                closed=True, fc=SOFT, ec=INK, lw=1.1, zorder=2))
    xs = np.linspace(3.0, 7.0, 5)
    ys = 7.35 + 0.55 * (1 - ((xs - 5) / 2.1) ** 2)
    a.plot(xs, ys, c=ACC, lw=1.0, ls="--", zorder=3)
    for x, y in zip(xs, ys):
        a.add_patch(Circle((x, y), 0.2, fc="white", ec=INK, lw=0.9, zorder=4))
    a.add_patch(Arc((5, 5.35), 3.1, 1.4, theta1=200, theta2=340, ec=ACC, lw=1.3, ls="--", zorder=3))
    a.add_patch(Polygon([(4.2, 4.3), (5.8, 4.3), (5.5, 2.8), (4.5, 2.8)],
                closed=True, fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    a.add_patch(Circle((5, 3.5), 0.22, fc=ACC, ec=INK, lw=0.8, zorder=4))
    cap(a, "Digit mounts on a curved metacarpal\narc, so the palm cups an object.\nPassive quick-disconnect wrist.")

    b = axes[1]; head(b, "B — Monolithic chassis", "non-biomimetic")
    b.add_patch(Rectangle((3.0, 4.3), 4.0, 3.0, fc=SOFT, ec=INK, lw=1.1, hatch="////", zorder=2))
    for x in np.linspace(3.1, 6.9, 5):
        b.add_patch(Circle((x, 7.3), 0.2, fc="white", ec=INK, lw=0.9, zorder=4))
    b.add_patch(Circle((5, 3.5), 0.82, fc="white", ec=INK, lw=1.1, zorder=3))
    b.add_patch(Arc((5, 3.5), 1.18, 1.18, theta1=35, theta2=300, ec=ACC, lw=1.3, zorder=4))
    b.annotate("", xy=(5.62, 3.80), xytext=(5.52, 3.42),
               arrowprops=dict(arrowstyle="-|>", color=ACC, lw=1.2))
    b.add_patch(Rectangle((3.45, 3.15), 0.7, 0.7, fc="#d9d9d9", ec=INK, lw=0.8, zorder=4))
    cap(b, "One machined 7075 billet; mounts on\na straight line. Powered coaxial\nrotator restores forearm rotation.")

    c = axes[2]; head(c, "C — Modular open frame", "non-biomimetic")
    c.add_patch(Rectangle((3.0, 4.3), 4.0, 3.0, fc="white", ec=INK, lw=1.1, zorder=2))
    for i in range(3):
        x0 = 3.0 + i * 1.333
        c.plot([x0, x0 + 1.333], [4.3, 7.3], c=GREY, lw=0.7, zorder=3)
        c.plot([x0, x0 + 1.333], [7.3, 4.3], c=GREY, lw=0.7, zorder=3)
    for x in np.linspace(3.1, 6.9, 5):
        c.add_patch(Circle((x, 7.3), 0.24, fc="white", ec=INK, lw=0.9, zorder=4))
        c.add_patch(Circle((x, 7.3), 0.09, fc=INK, ec="none", zorder=5))
    c.add_patch(Rectangle((4.15, 3.0), 1.7, 0.85, fc="#f0f0f0", ec=INK, lw=1.0, zorder=3))
    c.add_patch(Rectangle((3.95, 3.12), 0.22, 0.6, fc=ACC, ec="none", zorder=4))
    c.add_patch(Rectangle((5.83, 3.12), 0.22, 0.6, fc=ACC, ec="none", zorder=4))
    cap(c, "Printed polymer lattice, bolt-on digit\nmodules, passive friction wrist.\nLightest and field-serviceable.")

    fig.subplots_adjust(wspace=0.02)
    fig.savefig(f"{OUT}/fig2_s1_chassis.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 3
def fig3():
    fig, axes = plt.subplots(1, 3, figsize=(6.8, 3.2)); [ax_blank(a) for a in axes]

    a = axes[0]; head(a, "A — Four-bar digit", "biomimetic")
    a.add_patch(Rectangle((3.4, 2.8), 3.2, 0.85, fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    p = (5.0, 3.65); joints = [p]
    for L, ang in ((1.75, 10), (1.35, 34), (1.0, 60)):
        th = np.radians(90 - ang)
        q = (p[0] + L * np.cos(th), p[1] + L * np.sin(th))
        a.plot([p[0], q[0]], [p[1], q[1]], c=INK, lw=5.0, solid_capstyle="round", zorder=3)
        a.plot([p[0], q[0]], [p[1], q[1]], c="white", lw=2.4, solid_capstyle="round", zorder=4)
        a.add_patch(Circle(p, 0.19, fc="white", ec=INK, lw=1.0, zorder=5))
        p = q; joints.append(q)
    a.add_patch(Circle(p, 0.13, fc=ACC, ec="none", zorder=5))
    J = np.array(joints)
    for i in (0, 1):
        seg = J[i + 1] - J[i]
        n = np.array([seg[1], -seg[0]]); n = 0.34 * n / np.linalg.norm(n)
        p0, p1 = J[i] + n, J[i + 2] + n
        a.plot([p0[0], p1[0]], [p0[1], p1[1]], c=ACC, lw=1.0, ls="--", zorder=6)
        a.add_patch(Circle(p0, 0.08, fc=ACC, ec="none", zorder=7))
        a.add_patch(Circle(p1, 0.08, fc=ACC, ec="none", zorder=7))
    cap(a, "Three phalanges in anatomic ratio.\nDashed coupler links curl the distal\njoints once the proximal joint stalls.")

    b = axes[1]; head(b, "B — Compliant flexure digit", "bio-inspired")
    b.add_patch(Rectangle((3.4, 2.8), 3.2, 0.85, fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    t = np.linspace(0, 1, 70)
    cx = 5.0 + 1.75 * t ** 1.9; cy = 3.65 + 4.35 * t - 0.5 * t ** 2
    w = 0.40 * (1 - 0.45 * t)
    b.fill_betweenx(cy, cx - w, cx + w, fc=SOFT, ec=INK, lw=1.0, zorder=3)
    for f in (0.30, 0.55, 0.80):
        i = int(f * 69)
        b.plot([cx[i] - w[i] - 0.02, cx[i] - w[i] + 0.26], [cy[i], cy[i]], c=ACC, lw=1.5, zorder=5)
    cap(b, "A single moulded part. Notch flexures\nreplace pin joints, so the digit wraps\npassively with no bearings to wear.")

    c = axes[2]; head(c, "C — Two-jaw gripper", "non-biomimetic")
    c.add_patch(Rectangle((3.3, 2.8), 3.4, 0.85, fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    c.add_patch(Polygon([(3.95, 3.65), (4.65, 3.65), (4.98, 7.5), (4.30, 7.6)],
                closed=True, fc="white", ec=INK, lw=1.1, zorder=3))
    c.add_patch(Polygon([(5.35, 3.65), (6.05, 3.65), (5.70, 7.6), (5.02, 7.5)],
                closed=True, fc="white", ec=INK, lw=1.1, zorder=3))
    c.add_patch(Circle((5.0, 6.75), 0.6, fc=SOFT, ec=ACC, lw=1.0, zorder=4))
    arrow(c, 3.60, 5.2, 4.52, 5.2); arrow(c, 6.40, 5.2, 5.48, 5.2)
    cap(c, "Rigid opposed jaws, split-hook lineage.\nVery high pinch force, almost nothing\nto break, but one grasp pattern only.")

    fig.subplots_adjust(wspace=0.02)
    fig.savefig(f"{OUT}/fig3_s2_digits.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 4
def fig4():
    fig, axes = plt.subplots(1, 3, figsize=(6.8, 3.2)); [ax_blank(a) for a in axes]

    a = axes[0]; head(a, "A — Extrinsic tendons", "biomimetic")
    a.add_patch(FancyBboxPatch((0.9, 3.3), 2.5, 3.3, boxstyle="round,pad=0.02,rounding_size=0.25",
                fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    for yy in (4.0, 4.95, 5.9):
        a.add_patch(Circle((2.15, yy), 0.33, fc="white", ec=INK, lw=0.9, zorder=3))
        a.text(2.15, yy, "M", fontsize=5.6, ha="center", va="center", zorder=4)
    a.plot([4.0, 4.0], [3.1, 6.9], c=GREY, lw=0.8, ls=(0, (3, 2)), zorder=1)
    a.add_patch(Rectangle((5.0, 3.5), 2.6, 1.7, fc=SOFT, ec=INK, lw=1.0, zorder=2))
    for i, xd in enumerate((5.5, 6.3, 7.1)):
        digit(a, xd, 5.2, hs=(0.75, 0.6, 0.5), w=0.5)
    for yy, xd in ((5.9, 5.5), (4.95, 6.3), (4.0, 7.1)):
        xs = np.linspace(3.4, xd, 40)
        ys = yy + (7.05 - yy) * (np.linspace(0, 1, 40) ** 2.2)
        a.plot(xs, ys, c=ACC, lw=1.0, zorder=5)
    cap(a, "Motors sit in the forearm shell.\nBowden cables cross the wrist in\nantagonist pairs, like extrinsic flexors.")

    b = axes[1]; head(b, "B — In-digit motors", "non-biomimetic")
    b.add_patch(Rectangle((2.9, 2.9), 4.2, 1.0, fc="#f0f0f0", ec=INK, lw=1.0, zorder=2))
    for dx in (-1.62, -0.54, 0.54, 1.62):
        x = 5 + dx
        b.add_patch(FancyBboxPatch((x - 0.42, 3.9), 0.84, 2.05,
                    boxstyle="round,pad=0.01,rounding_size=0.2", fc="white", ec=INK, lw=0.9, zorder=3))
        b.add_patch(Rectangle((x - 0.26, 4.15), 0.52, 0.95, fc="#d9d9d9", ec=INK, lw=0.7, zorder=4))
        b.text(x, 4.62, "M", fontsize=5.4, ha="center", va="center", zorder=5)
        zz = np.linspace(5.22, 5.78, 9)
        b.plot(x + 0.15 * (-1) ** np.arange(9), zz, c=ACC, lw=0.9, zorder=5)
        b.add_patch(FancyBboxPatch((x - 0.36, 6.05), 0.72, 1.45,
                    boxstyle="round,pad=0.01,rounding_size=0.2", fc="white", ec=INK, lw=0.9, zorder=3))
    cap(b, "One sealed gearmotor and worm set\nper digit: five independent axes. The\nworm holds grip without using power.")

    c = axes[2]; head(c, "C — Whiffletree drive", "non-biomimetic")
    c.add_patch(Circle((5.0, 3.25), 0.42, fc="white", ec=INK, lw=1.0, zorder=3))
    c.text(5.0, 3.25, "M", fontsize=6.0, ha="center", va="center", zorder=4)
    c.plot([5.0, 5.0], [3.67, 4.25], c=ACC, lw=1.2, zorder=3)
    c.plot([3.4, 6.6], [4.25, 4.25], c=INK, lw=2.0, solid_capstyle="round", zorder=3)
    c.add_patch(Circle((5.0, 4.25), 0.12, fc=ACC, ec="none", zorder=5))
    for xb in (3.4, 6.6):
        c.plot([xb, xb], [4.25, 4.95], c=ACC, lw=1.1, zorder=3)
        c.plot([xb - 0.78, xb + 0.78], [4.95, 4.95], c=INK, lw=1.8, solid_capstyle="round", zorder=3)
        c.add_patch(Circle((xb, 4.95), 0.11, fc=ACC, ec="none", zorder=5))
        for xt in (xb - 0.78, xb + 0.78):
            c.plot([xt, xt], [4.95, 5.45], c=ACC, lw=1.0, zorder=3)
            digit(c, xt, 5.45, hs=(0.68, 0.56, 0.46), w=0.44)
    cap(c, "A single actuator drives every digit\nthrough load-balancing bars, so the\nhand self-adapts. Digits move together.")

    fig.subplots_adjust(wspace=0.02)
    fig.savefig(f"{OUT}/fig4_s3_actuation.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 5
def hand(ax, cx=5.0, cy=5.0, fc="white", ec=INK, lw=1.0):
    ax.add_patch(Polygon([(cx - 1.5, cy - 1.3), (cx + 1.5, cy - 1.3),
                          (cx + 1.58, cy + 1.3), (cx - 1.58, cy + 1.3)],
                 closed=True, fc=fc, ec=ec, lw=lw, zorder=2))
    tips = []
    for dx, h in ((-1.08, 1.60), (-0.36, 1.95), (0.36, 1.80), (1.08, 1.35)):
        ax.add_patch(FancyBboxPatch((cx + dx - 0.30, cy + 1.3), 0.60, h,
                     boxstyle="round,pad=0.01,rounding_size=0.28",
                     fc=fc, ec=ec, lw=lw, zorder=2))
        tips.append((cx + dx, cy + 1.3 + h))
    ax.add_patch(FancyBboxPatch((cx - 2.62, cy - 0.95), 1.35, 0.56,
                 boxstyle="round,pad=0.01,rounding_size=0.22",
                 fc=fc, ec=ec, lw=lw, zorder=2))
    ax.add_patch(FancyBboxPatch((cx - 0.85, cy - 2.25), 1.7, 0.85,
                 boxstyle="round,pad=0.01,rounding_size=0.2",
                 fc="#f0f0f0", ec=ec, lw=lw, zorder=2))
    return tips


def fig5():
    fig, axes = plt.subplots(1, 3, figsize=(6.8, 3.2)); [ax_blank(a) for a in axes]

    a = axes[0]; head(a, "A — Silicone glove", "biomimetic")
    tips = hand(a, 5.0, 5.1, fc="#f3e3da", ec="#9c7b6b")
    for tx, ty in tips:
        a.add_patch(FancyBboxPatch((tx - 0.18, ty - 0.48), 0.36, 0.30,
                    boxstyle="round,pad=0.005,rounding_size=0.08",
                    fc="#f8f0ec", ec="#9c7b6b", lw=0.6, zorder=4))
    for r in (0.20, 0.34, 0.48):
        a.add_patch(Arc((5.75, 4.35), r * 2, r * 2.3, theta1=0, theta2=360, ec="#b89385", lw=0.5, zorder=4))
    cap(a, "Pigment-matched, with nails and\nfingerprints moulded in. Best cosmesis,\nhighest cost, loads the actuators.")

    b = axes[1]; head(b, "B — Elastomer cover", "non-biomimetic")
    hand(b, 5.0, 5.1, fc="#dfe4e8")
    rng = np.random.default_rng(7)
    for _ in range(110):
        b.plot(rng.uniform(3.55, 6.45), rng.uniform(3.95, 6.30), marker=".", ms=1.1,
               c="#7f8c99", zorder=5)
    for dx, h in ((-1.08, 1.60), (-0.36, 1.95), (0.36, 1.80), (1.08, 1.35)):
        for _ in range(13):
            b.plot(5 + dx + rng.uniform(-0.21, 0.21), 6.45 + rng.uniform(0, h - 0.30),
                   marker=".", ms=1.1, c="#7f8c99", zorder=5)
    b.plot([4.0, 6.0], [2.88, 2.88], c=ACC, lw=1.3, ls=(0, (3, 2)), zorder=6)
    cap(b, "Textured TPU: high grip friction and a\ndust and splash seal. Peels off at the\nwrist seam for replacement.")

    c = axes[2]; head(c, "C — Exposed shell", "non-biomimetic")
    hand(c, 5.0, 5.1, fc="white")
    for dx, h in ((-1.08, 1.60), (-0.36, 1.95), (0.36, 1.80), (1.08, 1.35)):
        for f in (0.36, 0.70):
            yy = 5.1 + 1.3 + h * f
            c.plot([5 + dx - 0.30, 5 + dx + 0.30], [yy, yy], c=INK, lw=0.8, zorder=5)
            c.add_patch(Circle((5 + dx, yy), 0.085, fc=ACC, ec="none", zorder=6))
    for yy in (4.4, 5.3):
        c.plot([3.5, 6.5], [yy, yy], c=GREY, lw=0.7, zorder=5)
    cap(c, "No soft cover. Lightest, cheapest and\nmost serviceable, but the mechanism\nis open to dirt and liquid.")

    fig.subplots_adjust(wspace=0.02)
    fig.savefig(f"{OUT}/fig5_s4_skin.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 6
def fig6():
    fig, axes = plt.subplots(1, 3, figsize=(6.8, 3.2)); [ax_blank(a) for a in axes]

    def hand_box(ax, x, y, fsr=0):
        ax.add_patch(FancyBboxPatch((x - 0.85, y - 0.95), 1.7, 1.9,
                    boxstyle="round,pad=0.02,rounding_size=0.2", fc="white", ec=INK, lw=1.0, zorder=3))
        ax.text(x, y - 0.55, "hand", fontsize=5.9, ha="center", va="center", zorder=4)
        for i in range(fsr):
            ax.add_patch(Circle((x - 0.42 + i * 0.42, y + 0.55), 0.13, fc=RED, ec="none", zorder=5))

    a = axes[0]; head(a, "A — Pattern recognition", "biomimetic")
    a.add_patch(Circle((2.1, 6.3), 0.95, fc="#f3e3da", ec=INK, lw=1.0, zorder=2))
    for th in np.linspace(0, 2 * np.pi, 9)[:-1]:
        a.add_patch(Circle((2.1 + 0.95 * np.cos(th), 6.3 + 0.95 * np.sin(th)), 0.15,
                    fc=ACC, ec="none", zorder=4))
    box(a, 5.1, 6.3, 2.9, 1.3, "classifier\n(grasp intent)", fs=5.6)
    hand_box(a, 8.3, 6.3, fsr=3)
    arrow(a, 3.15, 6.3, 3.55, 6.3); arrow(a, 6.65, 6.3, 7.35, 6.3)
    arrow(a, 8.3, 5.2, 2.1, 5.2, c=RED, rad=-0.18)
    cap(a, "Eight electrodes decode the intended\ngrasp in one step. Fingertip force\nreturns to the skin (red path).")

    b = axes[1]; head(b, "B — Two-site EMG", "non-biomimetic")
    b.add_patch(Circle((2.1, 6.3), 0.95, fc="#f3e3da", ec=INK, lw=1.0, zorder=2))
    b.add_patch(Circle((2.1, 7.25), 0.18, fc=ACC, ec="none", zorder=4))
    b.add_patch(Circle((2.1, 5.35), 0.18, fc=ACC, ec="none", zorder=4))
    box(b, 5.1, 6.3, 2.9, 1.3, "proportional\namplifier", fs=5.6)
    hand_box(b, 8.3, 6.3)
    arrow(b, 3.15, 6.3, 3.55, 6.3); arrow(b, 6.65, 6.3, 7.35, 6.3)
    b.add_patch(Arc((5.15, 4.9), 6.1, 2.0, theta1=190, theta2=350, ec=RED, lw=1.1, zorder=4))
    b.annotate("", xy=(2.20, 5.05), xytext=(2.35, 4.85),
               arrowprops=dict(arrowstyle="-|>", color=RED, lw=1.1))
    cap(b, "One flexor/extensor pair drives one\nopen-close axis. Co-contraction steps\nto the next grip (red loop).")

    c = axes[2]; head(c, "C — Gesture + app", "non-biomimetic")
    c.add_patch(FancyBboxPatch((1.3, 5.25), 1.5, 2.3, boxstyle="round,pad=0.02,rounding_size=0.25",
                fc="white", ec=INK, lw=1.0, zorder=3))
    c.add_patch(Rectangle((1.5, 5.6), 1.1, 1.6, fc=SOFT, ec=GREY, lw=0.6, zorder=4))
    c.text(2.05, 6.4, "grip\nmenu", fontsize=5.7, ha="center", va="center", zorder=5)
    box(c, 5.1, 6.3, 2.9, 1.2, "IMU gesture\ndecoder", fs=5.6)
    hand_box(c, 8.3, 6.3, fsr=1)
    arrow(c, 2.9, 6.3, 3.55, 6.3); arrow(c, 6.65, 6.3, 7.35, 6.3)
    cap(c, "Grip chosen by wrist flick or phone\napp, with fingertip slip control. No\nelectrodes, but needs the sound hand.")

    fig.subplots_adjust(wspace=0.02)
    fig.savefig(f"{OUT}/fig6_s5_control.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 7
def fig7():
    fig, ax = plt.subplots(figsize=(6.8, 4.4)); ax_blank(ax, (0, 100), (0, 66))

    # residual-limb cuff with the electrode ring
    ax.add_patch(FancyBboxPatch((42, 2.5), 16, 10.5,
                 boxstyle="round,pad=0.3,rounding_size=1.2", fc="#f3e3da", ec=INK, lw=1.1, zorder=2))
    for x in np.linspace(43.6, 56.4, 6):
        ax.add_patch(Circle((x, 7.8), 1.0, fc=ACC, ec="none", zorder=4))

    # powered wrist rotator
    ax.add_patch(Circle((50, 18.5), 4.6, fc="white", ec=INK, lw=1.2, zorder=3))
    ax.add_patch(Arc((50, 18.5), 6.6, 6.6, theta1=35, theta2=300, ec=ACC, lw=1.4, zorder=4))
    ax.annotate("", xy=(53.6, 20.2), xytext=(53.1, 18.1),
                arrowprops=dict(arrowstyle="-|>", color=ACC, lw=1.3))

    # monolithic palm chassis
    ax.add_patch(Rectangle((41, 24), 18, 15, fc=SOFT, ec=INK, lw=1.2, hatch="////", zorder=3))
    # thumb
    ax.add_patch(FancyBboxPatch((32.5, 27.5), 8.5, 4.6,
                 boxstyle="round,pad=0.2,rounding_size=1.6", fc="white", ec=INK, lw=1.1, zorder=3))
    ax.add_patch(Rectangle((34.0, 28.6), 3.0, 2.4, fc="#d9d9d9", ec=INK, lw=0.7,
                 ls=(0, (2, 1.5)), zorder=4))

    # four digits, each with an in-digit gearmotor and a fingertip sensor
    tips = []
    for cx, h in ((43.5, 14.5), (48.5, 17.5), (53.5, 16.5), (58.0, 12.5)):
        ax.add_patch(FancyBboxPatch((cx - 2.0, 39), 4.0, h,
                     boxstyle="round,pad=0.2,rounding_size=1.4", fc="white", ec=INK, lw=1.1, zorder=3))
        ax.add_patch(Rectangle((cx - 1.2, 40.5), 2.4, 3.4, fc="#d9d9d9", ec=INK, lw=0.7,
                     ls=(0, (2, 1.5)), zorder=4))
        ax.add_patch(Circle((cx, 39 + h - 1.6), 0.95, fc=RED, ec="none", zorder=5))
        tips.append((cx, 39 + h))
    # replaceable cover, shown as a dashed offset outline
    ax.add_patch(FancyBboxPatch((39.4, 22.6), 21.2, 34.8,
                 boxstyle="round,pad=0.4,rounding_size=1.6", fc="none", ec=ACC, lw=1.0,
                 ls=(0, (3, 2)), zorder=6))

    L = [(56, 2.5, 39.0, 50.0, "Replaceable elastomer cover  [S4-B]"),
         (42, 2.5, 43.5, 45.0, "Five underactuated four-bar digits in\nanatomic phalanx ratio  [S2-A]"),
         (26, 2.5, 41.0, 31.5, "Monolithic 7075 palm chassis  [S1-B]"),
         (10, 2.5, 44.0, 7.8,  "Multi-channel EMG electrode ring feeding a\npattern-recognition classifier  [S5-A]")]
    R = [(58, 97.5, 53.5, 54.0, "Fingertip force sensors drive a\nvibrotactile band  [S5-A]"),
         (43, 97.5, 58.0, 42.2, "Sealed worm gearmotor inside each\ndigit, five independent axes  [S3-B]"),
         (29, 97.5, 59.0, 31.5, "Battery bay and driver board\ninside the chassis"),
         (12, 97.5, 54.4, 18.5, "Powered coaxial wrist rotator\nrestores forearm rotation  [S1-B]")]
    for y, xt, xp, yp, t in L:
        ax.text(xt, y, t, ha="left", va="center", fontsize=6.0, color=INK, linespacing=1.5)
        ax.plot([xt + 0.5, xp - 1.0, xp], [y - 2.6, y - 2.6, yp], c=GREY, lw=0.7, zorder=1)
        ax.add_patch(Circle((xp, yp), 0.55, fc=GREY, ec="none", zorder=7))
    for y, xt, xp, yp, t in R:
        ax.text(xt, y, t, ha="right", va="center", fontsize=6.0, color=INK, linespacing=1.5)
        ax.plot([xt - 0.5, xp + 1.0, xp], [y - 2.6, y - 2.6, yp], c=GREY, lw=0.7, zorder=1)
        ax.add_patch(Circle((xp, yp), 0.55, fc=GREY, ec="none", zorder=7))

    fig.savefig(f"{OUT}/fig7_ideal_concept.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ---------------------------------------------------------------- Figure 8
def fig8():
    fig, ax = plt.subplots(figsize=(6.8, 3.9)); ax_blank(ax, (0, 100), (0, 58))
    box(ax, 50, 53.5, 70, 5.5, "F0   Restore prehensile function to the trans-radial limb",
        fs=7.0, bold=True, fc="#d7e3ef")
    lvl1 = ["F1\nAcquire user\nintent", "F2\nConvert command\ninto motion",
            "F3\nApply grasp\nforce", "F4\nOrient the hand\nin space",
            "F5\nReport contact\nstate"]
    lvl2 = [["F1.1  Sense muscle\nactivity", "F1.2  Classify the\nintended grasp"],
            ["F2.1  Store electrical\nenergy", "F2.2  Produce joint\ntorque", "F2.3  Transmit torque\nto the joints"],
            ["F3.1  Conform digits\nto the object", "F3.2  Hold position\nwithout power"],
            ["F4.1  Rotate the hand\nin roll", "F4.2  Carry load into\nthe socket"],
            ["F5.1  Measure contact\nforce", "F5.2  Stimulate the\nresidual skin"]]
    xs = np.linspace(10, 90, 5)
    ax.plot([50, 50], [50.7, 46.5], c=ACC, lw=0.9, zorder=1)
    ax.plot([xs[0], xs[-1]], [46.5, 46.5], c=ACC, lw=0.9, zorder=1)
    for x, top, subs in zip(xs, lvl1, lvl2):
        ax.plot([x, x], [46.5, 42.5], c=ACC, lw=0.9, zorder=1)
        box(ax, x, 38.5, 17.5, 7.0, top, fs=6.2, bold=True)
        for j, sub in enumerate(subs):
            y = 28.5 - j * 9.0
            ax.plot([x, x], [y + 7.5, y + 3.3], c=GREY, lw=0.8, zorder=1)
            box(ax, x, y, 17.5, 6.6, sub, fs=5.5, fc="white", ec=GREY, lw=0.8)
    ax.text(50, 2.0, "Every block is phrased without an \u201cand\u201d or an \u201cor\u201d, so each one carries a single "
                     "pure function and can be re-allocated to a different physical part [1].",
            ha="center", va="center", fontsize=6.2, color=GREY, style="italic")
    fig.savefig(f"{OUT}/fig8_functional.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4(); fig5(); fig6(); fig7(); fig8()
    print("figs 1-8 built")
