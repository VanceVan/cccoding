"""Module 12 figure. Plain technical line art: black lines, white fills,
square corners, serif labels."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Polygon
import numpy as np, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#000000"; GREY = "#8a8a8a"
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 7})


def L(ax, xs, ys, lw=1.0, c=INK, ls="-", z=3):
    ax.plot(xs, ys, c=c, lw=lw, ls=ls, zorder=z, solid_capstyle="round")


def arw(ax, x0, y0, x1, y1, lw=0.9, c=INK, z=6, hw=0.14, hl=0.34):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), zorder=z,
                arrowprops=dict(arrowstyle=f"-|>,head_width={hw},head_length={hl}",
                                color=c, lw=lw, shrinkA=0, shrinkB=0))


def call(ax, tx, ty, px, py, text, ha="left"):
    """Leader line from (px,py) to a text block anchored at (tx,ty)."""
    ex = tx - 3 if ha == "left" else tx + 3
    L(ax, [ex, px], [ty, py], lw=0.6, c=GREY, z=2)
    ax.plot([px], [py], "o", ms=2.2, mfc=INK, mec=INK, zorder=7)
    ax.text(tx, ty, text, ha=ha, va="center", fontsize=6.8, zorder=8)


def fig1():
    fig, ax = plt.subplots(figsize=(7.2, 3.2))
    ax.set_xlim(16, 184); ax.set_ylim(6, 98); ax.set_aspect("equal"); ax.axis("off")

    cx = 97.0                                   # handle centreline

    # ---------------------------------------------------------- handle body
    body = [(cx - 8, 74), (cx - 10.5, 40), (cx - 12, 34),
            (cx - 14, 28), (cx - 12, 21), (cx - 7, 16.5), (cx, 15),
            (cx + 7, 16.5), (cx + 12, 21), (cx + 14, 28), (cx + 13, 34),
            (cx + 11.5, 40), (cx + 9, 74)]
    ax.add_patch(Polygon(body, closed=True, fc="white", ec=INK, lw=1.2, zorder=3))

    # ------------------------------------------------- right-angle gear head
    ax.add_patch(Circle((cx, 82), 13, fc="white", ec=INK, lw=1.2, zorder=4))
    ax.add_patch(Circle((cx, 82), 5.8, fc="white", ec=INK, lw=1.0, zorder=5))
    for th in np.linspace(0, 2 * np.pi, 13)[:-1]:
        L(ax, [cx + 5.8 * np.cos(th), cx + 12.4 * np.cos(th)],
             [82 + 5.8 * np.sin(th), 82 + 12.4 * np.sin(th)], lw=0.5, c=GREY, z=5)
    ax.add_patch(Circle((cx, 82), 1.5, fc=INK, ec=INK, lw=0.6, zorder=6))

    # ------------------------------------------------------- compliant bar
    bar = [(cx - 8.2, 71), (cx - 10.6, 38), (cx - 15.0, 38.3), (cx - 12.6, 71.3)]
    ax.add_patch(Polygon(bar, closed=True, fc="white", ec=INK, lw=1.1, zorder=6))
    for y in (64, 55, 46):
        arw(ax, cx - 25, y, cx - 16.2, y - 0.3, lw=0.8)
    L(ax, [cx - 8.9, cx - 13.3], [54.5, 54.5], lw=0.5, c=GREY, z=7)

    # ------------------------------------------------------ mode thumbwheel
    wx, wy, wr = cx + 9.0, 66.0, 6.0
    ax.add_patch(Circle((wx, wy), wr, fc="white", ec=INK, lw=1.1, zorder=6))
    for th in np.linspace(0, 2 * np.pi, 17)[:-1]:
        L(ax, [wx + 4.3 * np.cos(th), wx + wr * np.cos(th)],
             [wy + 4.3 * np.sin(th), wy + wr * np.sin(th)], lw=0.45, c=GREY, z=7)
    for th, lab in ((0.85, "R"), (0.0, "0"), (-0.85, "F")):
        L(ax, [wx + wr * np.cos(th), wx + (wr + 1.8) * np.cos(th)],
             [wy + wr * np.sin(th), wy + (wr + 1.8) * np.sin(th)], lw=0.7, z=7)
        ax.text(wx + (wr + 3.6) * np.cos(th), wy + (wr + 3.6) * np.sin(th), lab,
                ha="center", va="center", fontsize=5.8, zorder=8)

    # --------------------------------------------------------- presence pad
    pad = [(cx + 10.3, 54), (cx + 13.6, 54), (cx + 15.4, 34.5), (cx + 12.1, 34.5)]
    ax.add_patch(Polygon(pad, closed=True, fc="white", ec=INK, lw=1.0,
                         hatch="....", zorder=6))

    # ---------------------------------------------------------- annotations
    call(ax, 70, 72, cx - 14.5, 64,
         "Compliant palm bar, full grip length —\nactuates at any point along it, ≈ 3 N", ha="right")
    call(ax, 70, 42, cx - 13.0, 46,
         "Over-centre second detent latches ON —\nno sustained squeeze to keep running", ha="right")
    call(ax, 126, 84, wx + 4.4, wy + 4.2,
         "Detented mode wheel: REV | OFF | FWD,\nOFF at the centre detent, raised icons", ha="left")
    call(ax, 126, 52, cx + 14.8, 44,
         "Presence pad on the back of the grip —\nthe latch drops out when the palm leaves", ha="left")
    call(ax, 126, 22, cx + 9, 19,
         "Bulb end seats in the web of the hand\nfor a gross, non-pinch grasp", ha="left")

    fig.savefig(f"{OUT}/fig1_concept_e.png", dpi=300, facecolor="white",
                bbox_inches="tight", pad_inches=0.02)
    plt.close(fig)


if __name__ == "__main__":
    fig1(); print("fig saved")
