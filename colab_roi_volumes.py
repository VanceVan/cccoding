# =============================== CELL 1 ===============================
# Setup: install, locate and unpack the archive.
# !pip install -q nibabel

import os, re, glob, zipfile
from pathlib import Path

import numpy as np
import pandas as pd
import nibabel as nib

ARCHIVE_PATH = None          # e.g. "/content/mricloud_results.zip"; None = autodetect
UNPACK_ROOT  = Path("/content/mricloud_data")

if ARCHIVE_PATH is None:
    candidates = sorted(glob.glob("/content/**/*.zip", recursive=True))
    if not candidates:
        raise SystemExit("No .zip found under /content — upload it or set ARCHIVE_PATH.")
    ARCHIVE_PATH = candidates[0]
    if len(candidates) > 1:
        print(f"Multiple archives found, using the first:\n  " + "\n  ".join(candidates))

UNPACK_ROOT.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(ARCHIVE_PATH) as archive:
    archive.extractall(UNPACK_ROOT)
print(f"Unpacked {ARCHIVE_PATH} -> {UNPACK_ROOT}")

label_maps = sorted(Path(UNPACK_ROOT).rglob("*_286Labels.hdr"))
print(f"\nFound {len(label_maps)} segmentation(s):")
for path in label_maps:
    print("   ", path.relative_to(UNPACK_ROOT))


# =============================== CELL 2 ===============================
# ROI label codes, straight from the multilevel lookup table (column 1).

ROI_CODES = {
    "Amygdala":          {"left": 73, "right": 74},
    "EntorhinalCortex":  {"left": 47, "right": 48},
    "Hippocampus":       {"left": 75, "right": 76},
}

FIMBRIA_CODES  = {"left": 282, "right": 284}   # folded into hippocampus at Type1-L4
INCLUDE_FIMBRIA = False


def read_label_map(map_path):
    """Return (integer label volume, (sx, sy, sz) voxel sizes in mm)."""
    hdr_img = nib.load(str(map_path))
    store = hdr_img.dataobj
    # Read stored integers: a label map must not be rescaled by scl_slope/scl_inter.
    stored = store.get_unscaled() if hasattr(store, "get_unscaled") else np.asanyarray(store)
    label_vol = np.rint(stored).astype(np.int32)
    sx, sy, sz = (float(v) for v in hdr_img.header.get_zooms()[:3])
    return label_vol, (sx, sy, sz)


def roi_voxel_count(label_vol, code):
    """Number of voxels carrying a single ROI label code."""
    return int(np.count_nonzero(label_vol == code))


def scan_roi_volumes(map_path):
    """Per-hemisphere volumes (mm^3) for every ROI in one segmentation.

        V_ROI = N_voxels * (sx * sy * sz)                          -- Eq. (1)
    """
    label_vol, (sx, sy, sz) = read_label_map(map_path)
    mm3_per_voxel = sx * sy * sz

    measurements = []
    for roi_name, side_codes in ROI_CODES.items():
        for side, code in side_codes.items():
            n_vox = roi_voxel_count(label_vol, code)
            if INCLUDE_FIMBRIA and roi_name == "Hippocampus":
                n_vox += roi_voxel_count(label_vol, FIMBRIA_CODES[side])
            measurements.append({
                "roi": roi_name,
                "side": side,
                "label_code": code,
                "n_voxels": n_vox,
                "volume_mm3": n_vox * mm3_per_voxel,
            })
    return measurements, (sx, sy, sz), mm3_per_voxel


# =============================== CELL 3 ===============================
# Identify which subject and which timepoint each segmentation belongs to.

SUBJECT_PATTERN = None    # e.g. r"(sub-\d+)" ; None = use directory layout
SCAN_PATTERN    = None    # e.g. r"(ses-\d+)" ; None = use directory layout


def parse_subject_scan(map_path, root):
    """Infer (subject_id, scan_id) from a segmentation's path."""
    rel = Path(map_path).relative_to(root)
    folders = list(rel.parts[:-1])
    stem = rel.name.replace("_286Labels.hdr", "")

    if SUBJECT_PATTERN:
        hit = re.search(SUBJECT_PATTERN, str(rel))
        subject_id = hit.group(1) if hit else "UNKNOWN"
    else:
        subject_id = folders[0] if folders else stem

    if SCAN_PATTERN:
        hit = re.search(SCAN_PATTERN, str(rel))
        scan_id = hit.group(1) if hit else "UNKNOWN"
    else:
        scan_id = folders[-1] if len(folders) > 1 else stem

    return subject_id, scan_id


def build_volume_table(root=UNPACK_ROOT):
    """Tidy table: one row per subject x scan x ROI x hemisphere."""
    root = Path(root)
    found = sorted(root.rglob("*_286Labels.hdr"))
    if not found:
        raise SystemExit(f"No *_286Labels.hdr under {root!r}.")

    rows = []
    for map_path in found:
        subject_id, scan_id = parse_subject_scan(map_path, root)
        measurements, (sx, sy, sz), mm3_per_voxel = scan_roi_volumes(map_path)
        print(f"  {subject_id:12s} {scan_id:12s} "
              f"voxel {sx:g}x{sy:g}x{sz:g} mm = {mm3_per_voxel:.6g} mm^3")
        for entry in measurements:
            rows.append({
                "subject": subject_id,
                "scan": scan_id,
                "source": str(map_path.relative_to(root)),
                "voxel_mm3": mm3_per_voxel,
                **entry,
            })
    return pd.DataFrame(rows)


volume_table = build_volume_table()

# Bilateral totals, for when left+right are analysed together.
bilateral_table = (volume_table
                   .groupby(["subject", "scan", "roi"], as_index=False)
                   .agg(n_voxels=("n_voxels", "sum"),
                        volume_mm3=("volume_mm3", "sum")))

print(f"\n{len(volume_table)} rows "
      f"({volume_table['subject'].nunique()} subjects, "
      f"{volume_table.groupby('subject')['scan'].nunique().to_dict()} scans each)")
volume_table.head(12)


# =============================== CELL 4 ===============================
# Optional: attach ages, then save.

SCAN_AGES = {}    # {"subject_id": {"scan_id": age_years}} — fill in if you have it

if SCAN_AGES:
    volume_table["age"] = [SCAN_AGES.get(s, {}).get(t) for s, t in
                           zip(volume_table["subject"], volume_table["scan"])]
    missing = volume_table[volume_table["age"].isna()][["subject", "scan"]].drop_duplicates()
    if len(missing):
        print("No age for these scans:")
        print(missing.to_string(index=False))
    volume_table = volume_table.sort_values(["subject", "age", "roi", "side"])
else:
    volume_table = volume_table.sort_values(["subject", "scan", "roi", "side"])

volume_table.to_csv("/content/roi_volumes_long.csv", index=False)

wide_table = volume_table.pivot_table(index=["subject", "scan"],
                                      columns=["roi", "side"],
                                      values="volume_mm3")
wide_table.to_csv("/content/roi_volumes_wide.csv")
print("\nSaved roi_volumes_long.csv and roi_volumes_wide.csv")
wide_table
