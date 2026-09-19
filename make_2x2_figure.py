#!/usr/bin/env python3
"""HW2 Q2.5 - 2x2 panel figure of longitudinal MTL atrophy in MCI.

Panels 1-3: bilateral volume vs age per subject, with the fitted regression
            line drawn only across each subject's observed age range.
Panel 4:    mean annualized atrophy rate per region, error bars = SD.

    V(age) = b1 * age + b0                                        Eq. (2)
    Atrophy rate (%/yr) = -b1 / V_base * 100                      Eq. (3)

V_base is the measured baseline volume, not the fitted value.
"""

import csv
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from mtl_data import MTL_VOLUMES, REGIONS, SUBJECT_IDS

# Categorical hues validated for all-pairs CVD separation (dataviz palette,
# slots blue/yellow/magenta/green/violet: CVD dE 13.0, normal-vision dE 16.3).
# That clears the gate on colour alone, so one marker shape is enough.
SUBJECT_COLOR = {
    "1155": "#2a78d6",
    "4799": "#eda100",
    "4713": "#e87ba4",
    "4272": "#008300",
    "2389": "#4a3aa7",
}
MARKER = "o"
SUBJECT_ORDER = ["1155", "4799", "4713", "4272", "2389"]

BAR_HUE      = "#2a78d6"
INK_PRIMARY  = "#0b0b0b"
INK_SECOND   = "#52514e"
GRID_COLOR   = "#d9d8d4"
SURFACE      = "#fcfcfb"


def fit_subject_region(subject, region):
    """Return (b1, b0, ages, volumes, V_base, atrophy_rate_pct_per_yr)."""
    rec = MTL_VOLUMES[subject]
    ages = np.asarray(rec["ages"], dtype=float)
    vols = np.asarray(rec[region], dtype=float)
    b1, b0 = np.polyfit(ages, vols, 1)          # Eq. (2)
    v_base = vols[0]                            # measured baseline
    rate = -b1 / v_base * 100.0                 # Eq. (3)
    return b1, b0, ages, vols, v_base, rate


def style_axis(ax):
    ax.set_facecolor(SURFACE)
    ax.grid(True, color=GRID_COLOR, linewidth=0.6, alpha=0.9)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(GRID_COLOR)
    ax.tick_params(colors=INK_SECOND, labelsize=9)


def main():
    fits = {s: {r: fit_subject_region(s, r) for r in REGIONS} for s in SUBJECT_ORDER}

    fig, axes = plt.subplots(2, 2, figsize=(12.5, 9.5))
    fig.patch.set_facecolor(SURFACE)

    # ---- Panels 1-3: volume vs age, per subject -------------------------
    for ax, region in zip(axes.flat[:3], REGIONS):
        style_axis(ax)
        for subject in SUBJECT_ORDER:
            color = SUBJECT_COLOR[subject]
            b1, b0, ages, vols, _, _ = fits[subject][region]
            ax.scatter(ages, vols, s=70, color=color, marker=MARKER,
                       edgecolor="white", linewidth=1.2, zorder=3,
                       label=subject)
            # fitted line across the observed range only
            span = np.array([ages.min(), ages.max()])
            ax.plot(span, b1 * span + b0, color=color, linewidth=2.0,
                    alpha=0.85, zorder=2)
        ax.set_xlabel("Age (years)", fontsize=10, color=INK_PRIMARY)
        ax.set_ylabel(f"Bilateral {region.lower()} volume (mm$^3$)",
                      fontsize=10, color=INK_PRIMARY)
        ax.set_title(region, fontsize=12, color=INK_PRIMARY, pad=8, loc="left")

    # ---- Panel 4: mean atrophy rate per region --------------------------
    ax = axes.flat[3]
    style_axis(ax)
    means, sds = [], []
    for region in REGIONS:
        rates = [fits[s][region][5] for s in SUBJECT_ORDER]
        means.append(np.mean(rates))
        sds.append(np.std(rates, ddof=1))        # sample SD across 5 subjects

    xs = np.arange(len(REGIONS))
    ax.bar(xs, means, width=0.6, color=BAR_HUE, edgecolor=SURFACE, linewidth=2,
           zorder=2)
    ax.errorbar(xs, means, yerr=sds, fmt="none", ecolor=INK_SECOND,
                elinewidth=1.5, capsize=6, capthick=1.5, zorder=3)
    ax.axhline(0, color=INK_SECOND, linewidth=1.0, zorder=1)
    ax.set_xlim(-0.6, len(REGIONS) - 0.4)
    ax.set_xticks(xs)
    ax.set_xticklabels(["Amygdala", "Entorhinal\ncortex", "Hippocampus"])
    ax.set_ylabel("Mean annualized atrophy rate (%/year)\n(positive = shrinkage)",
                  fontsize=10, color=INK_PRIMARY)
    ax.set_title("Group summary (mean $\\pm$ SD, n = 5)", fontsize=12,
                 color=INK_PRIMARY, pad=8, loc="left")
    lo = min(m - sd for m, sd in zip(means, sds))
    hi = max(m + sd for m, sd in zip(means, sds))
    pad = 0.18 * (hi - lo)
    ax.set_ylim(lo - pad, hi + pad)

    # ---- Shared legend ---------------------------------------------------
    handles, labels = axes.flat[0].get_legend_handles_labels()
    fig.legend(handles, labels, loc="lower center", ncol=5, frameon=False,
               fontsize=10, bbox_to_anchor=(0.5, 0.005),
               labelcolor=INK_PRIMARY, title="Subject",
               title_fontproperties={"size": 10, "weight": "bold"})

    fig.suptitle("Longitudinal medial temporal lobe atrophy in MCI (ADNI, n = 5)",
                 fontsize=14, color=INK_PRIMARY, y=0.985)
    fig.tight_layout(rect=[0, 0.055, 1, 0.965])
    fig.savefig("mtl_2x2_figure.png", dpi=300, facecolor=SURFACE)
    print("wrote mtl_2x2_figure.png")

    # ---- Table view (relief rule) + reported numbers ---------------------
    with open("mtl_regression_table.csv", "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["subject", "region", "beta1_mm3_per_yr", "beta0_mm3",
                    "V_base_mm3", "atrophy_rate_pct_per_yr", "n_timepoints"])
        for s in SUBJECT_ORDER:
            for r in REGIONS:
                b1, b0, ages, vols, vb, rate = fits[s][r]
                w.writerow([SUBJECT_IDS[s], r, f"{b1:.1f}", f"{b0:.1f}",
                            f"{vb:.0f}", f"{rate:.2f}", len(ages)])
    print("wrote mtl_regression_table.csv")

    print("\nPanel 4 values:")
    for region, m, sd in zip(REGIONS, means, sds):
        print(f"  {region:20s} mean {m:+7.3f} %/yr   SD {sd:6.3f}")
    fastest = REGIONS[int(np.argmax(means))]
    print(f"\nQ2.2 fastest mean atrophy rate: {fastest}")

    print("\nQ2.3 support - hippocampus, slope vs rate:")
    for s in SUBJECT_ORDER:
        b1, _, _, _, vb, rate = fits[s]["Hippocampus"]
        print(f"  {SUBJECT_IDS[s]:12s} b1 {b1:8.1f}   V_base {vb:7.0f}   rate {rate:+6.2f} %/yr")


if __name__ == "__main__":
    main()
