"""Synthetic check for roi_volumes.py.

Builds Analyze pairs with known voxel counts per label and deliberately
non-isotropic voxels, then confirms the extracted volumes equal
N_voxels * (dx*dy*dz). Run: python3 tests/test_roi_volumes.py
"""
import sys, subprocess
from pathlib import Path
import numpy as np, nibabel as nib

root = Path("/tmp/roi_volumes_selftest")
COUNTS = {47: 300, 48: 310, 73: 1200, 74: 1250, 75: 3000, 76: 3100, 282: 100, 284: 110}
ZOOMS = (0.8, 0.8, 1.2)          # 0.768 mm^3 per voxel

for subj in ("sub-01", "sub-02"):
    for ses in ("ses-01", "ses-02", "ses-03"):
        d = root / subj / ses
        d.mkdir(parents=True, exist_ok=True)
        seg = np.zeros(64 * 64 * 64, dtype=np.int16)
        i = 0
        for label, n in COUNTS.items():
            seg[i:i + n] = label
            i += n
        seg = seg.reshape(64, 64, 64)
        img = nib.AnalyzeImage(seg, np.diag(list(ZOOMS) + [1.0]))
        img.header.set_zooms(ZOOMS)
        nib.save(img, d / f"{subj}_{ses}_286Labels.hdr")

        vv = ZOOMS[0] * ZOOMS[1] * ZOOMS[2]
        with open(d / f"{subj}_{ses}_286Labels_corrected_stats.txt", "w") as fh:
            fh.write("Name\tVolume_mm3\n")
            for label, name in [(73, "Amyg_L"), (74, "Amyg_R"), (47, "ENT_L"),
                                (48, "ENT_R"), (75, "Hippo_L"), (76, "Hippo_R")]:
                fh.write(f"{name}\t{COUNTS[label] * vv:.4f}\n")

out = root / "volumes.csv"
r = subprocess.run([sys.executable, str(Path(__file__).resolve().parent.parent / "roi_volumes.py"), str(root),
                    "-o", str(out), "--check"], capture_output=True, text=True)
print(r.stdout[-1500:]); print(r.stderr[-2000:], file=sys.stderr)
if r.returncode: sys.exit(r.returncode)

import csv
rows = list(csv.DictReader(open(out)))
vv = ZOOMS[0] * ZOOMS[1] * ZOOMS[2]
bad = []
for row in rows:
    exp_n = COUNTS[int(row["label"])]
    if int(row["n_voxels"]) != exp_n:
        bad.append(f"{row['label_name']}: n={row['n_voxels']} expected {exp_n}")
    if abs(float(row["volume_mm3"]) - exp_n * vv) > 1e-4 * max(1.0, exp_n * vv):
        bad.append(f"{row['label_name']}: vol={row['volume_mm3']} expected {exp_n*vv}")
    if abs(float(row["voxel_volume_mm3"]) - vv) > 1e-6:
        bad.append(f"voxel volume {row['voxel_volume_mm3']} != {vv}")
print(f"\n{len(rows)} rows checked; subjects={sorted({r['subject'] for r in rows})}; "
      f"scans={sorted({r['scan'] for r in rows})}")
print("FAILURES:\n  " + "\n  ".join(bad) if bad else "all voxel counts and volumes match")

r2 = subprocess.run([sys.executable, str(Path(__file__).resolve().parent.parent / "roi_volumes.py"), str(root),
                     "-o", str(root/"v2.csv"), "--with-fimbria"], capture_output=True, text=True)
rows2 = {(x["subject"], x["scan"], x["label_name"]): x for x in csv.DictReader(open(root/"v2.csv"))}
h = rows2[("sub-01", "ses-01", "Hippo_L")]
print(f"--with-fimbria Hippo_L n={h['n_voxels']} (expect {COUNTS[75]}+{COUNTS[282]}={COUNTS[75]+COUNTS[282]})")
