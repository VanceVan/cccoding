"""Module 8 task-analysis flowchart.

Shape language copied from the Module 08 lecture slide: oval delimiter,
diamond decision, plain box task, red-outlined box for a difficult task.
Edit the calls in build() to match the observed segment, then re-run.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon, Ellipse
import os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#000000"; RED = "#c0392b"; GREY = "#8a8a8a"
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 6.2})

TW, TH = 15.0, 5.4          # task box
DW, DH = 8.0, 4.2           # decision half-extents


def task(ax, x, y, t, hard=False, w=TW, h=TH):
    ax.add_patch(Rectangle((x - w / 2, y - h / 2), w, h, fc="white",
                 ec=RED if hard else INK, lw=1.3 if hard else 0.9, zorder=3))
    ax.text(x, y, t, ha="center", va="center", fontsize=5.4, zorder=4, linespacing=1.3)


def decision(ax, x, y, t):
    ax.add_patch(Polygon([(x - DW, y), (x, y + DH), (x + DW, y), (x, y - DH)],
                 closed=True, fc="white", ec=INK, lw=0.9, zorder=3))
    ax.text(x, y, t, ha="center", va="center", fontsize=5.2, zorder=4, linespacing=1.3)


def oval(ax, x, y, t):
    ax.add_patch(Ellipse((x, y), 11.0, 5.2, fc="white", ec=INK, lw=0.9, zorder=3))
    ax.text(x, y, t, ha="center", va="center", fontsize=5.6, zorder=4)


def arrow(ax, x0, y0, x1, y1, lw=0.8):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), zorder=5,
                arrowprops=dict(arrowstyle="-|>,head_width=0.13,head_length=0.32",
                                color=INK, lw=lw, shrinkA=0, shrinkB=0))


def path(ax, pts, lw=0.8):
    for i in range(len(pts) - 2):
        ax.plot([pts[i][0], pts[i + 1][0]], [pts[i][1], pts[i + 1][1]],
                c=INK, lw=lw, zorder=3, solid_capstyle="butt")
    arrow(ax, pts[-2][0], pts[-2][1], pts[-1][0], pts[-1][1], lw=lw)


def label(ax, x, y, t):
    ax.text(x, y, t, ha="center", va="center", fontsize=5.4, color=INK, zorder=6,
            bbox=dict(fc="white", ec="none", pad=0.6))


def build():
    fig, ax = plt.subplots(figsize=(6.6, 3.2))
    ax.set_xlim(0, 106); ax.set_ylim(0, 50); ax.set_aspect("equal"); ax.axis("off")

    R1, R2 = 42.0, 20.0
    oval(ax, 7, R1, "Start")
    decision(ax, 23, R1, "Brakes\nlocked?")
    task(ax, 42, R1, "Swing footplates\naside")
    task(ax, 60, R1, "Scoot hips to\nseat edge", hard=True)
    task(ax, 78, R1, "Place feet\nunder knees")
    task(ax, 96, R1, "Lean trunk\nover feet")

    task(ax, 10, R2, "Push up from\narmrest and mat", hard=True)
    task(ax, 29, R2, "Pivot on\nstance leg")
    task(ax, 48, R2, "Lower hips\nonto mat")
    decision(ax, 66, R2, "Seated\nsafely?")
    task(ax, 84, R2, "Release\ngait belt")
    oval(ax, 99, R2, "End")

    for a, b in ((12.5, 14.8), (31.2, 34.2), (49.6, 52.4), (67.6, 70.4), (85.6, 88.4)):
        arrow(ax, a, R1, b, R1)
    label(ax, 28.0, R1 + 1.8, "Yes")

    arrow(ax, 23, R1 - DH, 23, 35.3)
    task(ax, 23, 33.0, "Lock wheel brakes", w=18.0, h=4.2)
    path(ax, [(32.0, 33.0), (42.0, 33.0), (42.0, R1 - TH / 2)])
    label(ax, 20.0, 36.6, "No")

    path(ax, [(96, R1 - TH / 2), (96, 28.0), (10, 28.0), (10, R2 + TH / 2)])

    for a, b in ((17.6, 21.2), (36.6, 40.2), (55.6, 57.6), (74.2, 76.3), (91.6, 93.3)):
        arrow(ax, a, R2, b, R2)
    label(ax, 71.0, R2 + 1.8, "Yes")

    path(ax, [(66, R2 - DH), (66, 12.0), (29, 12.0), (29, R2 - TH / 2)])
    label(ax, 63.0, 15.0, "No")

    ax.add_patch(Rectangle((4, 1.2), 73, 7.8, fc="#f4f4f4", ec=GREY, lw=0.7, zorder=1))
    ax.text(8.0, 5.1, "Key:", ha="left", va="center", fontsize=5.8, zorder=4)
    oval(ax, 22, 5.1, "Delimiter")
    ax.add_patch(Polygon([(38 - 6.6, 5.1), (38, 5.1 + 3.1), (38 + 6.6, 5.1), (38, 5.1 - 3.1)],
                 closed=True, fc="white", ec=INK, lw=0.9, zorder=3))
    ax.text(38, 5.1, "Decision", ha="center", va="center", fontsize=5.4, zorder=4)
    task(ax, 55, 5.1, "Task", w=11.5, h=4.6)
    task(ax, 70, 5.1, "Difficult task", hard=True, w=11.5, h=4.6)

    fig.savefig(f"{OUT}/fig1_task_analysis.png", dpi=320, bbox_inches="tight",
                facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    build(); print("figure built")
