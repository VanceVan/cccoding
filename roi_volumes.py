#!/usr/bin/env python3
"""Longitudinal ROI volumes from MRICloud *_286Labels.hdr segmentations.

For every subject/scan, count the voxels carrying each ROI label and convert
to mm^3 using the voxel dimensions stored in the image header:

    V_ROI = N_voxels * (dx * dy * dz)                                 -- Eq. (1)

Usage
-----
    python roi_volumes.py /path/to/data -o volumes.csv
    python roi_volumes.py /path/to/data -o volumes.csv --check

The data root is searched recursively for files matching *_286Labels.hdr.
"""

import argparse
import csv
import re
import sys
from pathlib import Path

import numpy as np
import nibabel as nib

# ---------------------------------------------------------------------------
# Label numbers, from the multilevel lookup table (column 1 = label index).
# ---------------------------------------------------------------------------
ROIS = [
    # (region,                  hemisphere, label, lookup-table name)
    ("Amygdala",                "L",  73, "Amyg_L"),
    ("Amygdala",                "R",  74, "Amyg_R"),
    ("Entorhinal cortex",       "L",  47, "ENT_L"),
    ("Entorhinal cortex",       "R",  48, "ENT_R"),
    ("Hippocampus",             "L",  75, "Hippo_L"),
    ("Hippocampus",             "R",  76, "Hippo_R"),
]

# The fimbria is a separate label that the atlas hierarchy folds into the
# hippocampus at Type1-L4. Enable with --with-fimbria to match that rollup.
FIMBRIA = {"L": 282, "R": 284}


# ---------------------------------------------------------------------------
# Core computation
# ---------------------------------------------------------------------------
def load_label_map(hdr_path):
    """Return (integer label array, (dx, dy, dz) in mm) for an Analyze/NIfTI pair."""
    img = nib.load(str(hdr_path))
    # Read the stored integers directly: a label map must never be rescaled by
    # scl_slope/scl_inter, and get_fdata() would hand back floats.
    proxy = img.dataobj
    raw = proxy.get_unscaled() if hasattr(proxy, "get_unscaled") else np.asanyarray(proxy)
    seg = np.rint(raw).astype(np.int32)
    dx, dy, dz = (float(z) for z in img.header.get_zooms()[:3])
    return seg, (dx, dy, dz)


def roi_volumes(hdr_path, labels):
    """Volume (mm^3) of each label in `labels`, per Eq. (1)."""
    seg, (dx, dy, dz) = load_label_map(hdr_path)
    voxel_volume = dx * dy * dz                      # mm^3 in a single voxel

    out = {}
    for label in labels:
        n_voxels = int(np.count_nonzero(seg == label))
        out[label] = (n_voxels, n_voxels * voxel_volume)
    return out, (dx, dy, dz), voxel_volume
# ---------------------------------------------------------------------------


def parse_ids(hdr_path, root, subject_re=None, session_re=None):
    """Infer (subject, scan) ids from the path.

    Default heuristic, overridable with --subject-regex / --session-regex:
    walk the path components between `root` and the file; the first is the
    subject, the last directory (or the filename stem) is the scan.
    """
    rel = hdr_path.relative_to(root)
    parts = list(rel.parts[:-1])
    stem = hdr_path.name.replace("_286Labels.hdr", "")

    if subject_re:
        m = re.search(subject_re, str(rel))
        subject = m.group(1) if m else "?"
    else:
        subject = parts[0] if parts else stem

    if session_re:
        m = re.search(session_re, str(rel))
        scan = m.group(1) if m else "?"
    else:
        scan = parts[-1] if len(parts) > 1 else stem

    return subject, scan


def read_stats_file(stats_path, names):
    """Pull reference volumes for `names` out of a *_corrected_stats.txt file.

    Tolerant of the exact column layout: for any whitespace/tab-delimited row
    whose first field is one of the ROI names, take the first numeric field.
    """
    found = {}
    wanted = set(names)
    with open(stats_path, errors="replace") as fh:
        for line in fh:
            fields = line.replace("\t", " ").split()
            if not fields or fields[0] not in wanted:
                continue
            for f in fields[1:]:
                try:
                    found.setdefault(fields[0], float(f))
                except ValueError:
                    continue
                else:
                    break
    return found


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("root", type=Path, help="directory searched recursively for *_286Labels.hdr")
    ap.add_argument("-o", "--out", type=Path, default=Path("roi_volumes.csv"))
    ap.add_argument("--pattern", default="*_286Labels.hdr")
    ap.add_argument("--subject-regex", default=None,
                    help=r"regex with one capture group, e.g. '(sub-\d+)'")
    ap.add_argument("--session-regex", default=None,
                    help=r"regex with one capture group, e.g. '(ses-\d+)'")
    ap.add_argument("--with-fimbria", action="store_true",
                    help="add labels 282/284 into the hippocampus, per the Type1-L4 rollup")
    ap.add_argument("--check", action="store_true",
                    help="cross-check against the sibling *_286Labels_corrected_stats.txt")
    args = ap.parse_args(argv)

    files = sorted(args.root.rglob(args.pattern))
    if not files:
        sys.exit(f"no files matching {args.pattern} under {args.root}")

    labels = [label for _, _, label, _ in ROIS]
    if args.with_fimbria:
        labels += list(FIMBRIA.values())

    rows = []
    for hdr in files:
        subject, scan = parse_ids(hdr, args.root, args.subject_regex, args.session_regex)
        vols, (dx, dy, dz), voxel_volume = roi_volumes(hdr, labels)

        ref = {}
        if args.check:
            stats = hdr.with_name(hdr.name.replace(".hdr", "_corrected_stats.txt"))
            if stats.exists():
                ref = read_stats_file(stats, [name for _, _, _, name in ROIS])

        for region, hemi, label, name in ROIS:
            n_voxels, volume = vols[label]
            if args.with_fimbria and region == "Hippocampus":
                fn, fv = vols[FIMBRIA[hemi]]
                n_voxels, volume = n_voxels + fn, volume + fv

            rows.append({
                "subject": subject,
                "scan": scan,
                "file": str(hdr.relative_to(args.root)),
                "region": region,
                "hemisphere": hemi,
                "label": label,
                "label_name": name,
                "n_voxels": n_voxels,
                "dx_mm": dx, "dy_mm": dy, "dz_mm": dz,
                "voxel_volume_mm3": round(voxel_volume, 8),
                "volume_mm3": round(volume, 4),
                "stats_volume_mm3": ref.get(name, ""),
            })

        print(f"{hdr.relative_to(args.root)}  "
              f"[{subject}/{scan}]  voxel {dx:g}x{dy:g}x{dz:g} mm "
              f"= {voxel_volume:g} mm^3")

    with open(args.out, "w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    print(f"\nwrote {len(rows)} rows ({len(files)} scans x {len(ROIS)} ROIs) -> {args.out}")

    if args.check:
        diffs = [(r, abs(r["volume_mm3"] - r["stats_volume_mm3"]))
                 for r in rows if r["stats_volume_mm3"] != ""]
        if not diffs:
            print("cross-check: no *_corrected_stats.txt matches found")
        else:
            worst = max(diffs, key=lambda d: d[1])
            print(f"cross-check: {len(diffs)} ROI values compared, "
                  f"largest absolute difference {worst[1]:.4f} mm^3 "
                  f"({worst[0]['label_name']} in {worst[0]['file']})")

    return 0


if __name__ == "__main__":
    sys.exit(main())
