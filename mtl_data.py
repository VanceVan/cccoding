"""Bilateral MTL volumes (mm^3) per subject and age, transcribed from the
homework tables. Subjects are keyed by the last 4 digits of the ADNI ID."""

SUBJECT_IDS = {
    "1155": "002_S_1155",
    "4799": "002_S_4799",
    "4713": "006_S_4713",
    "4272": "007_S_4272",
    "2389": "013_S_2389",
}

REGIONS = ["Amygdala", "Entorhinal cortex", "Hippocampus"]

# subject -> {"ages": [...], region -> [volumes aligned with ages]}
MTL_VOLUMES = {
    "1155": {
        "ages":              [63, 64, 66, 68, 70],
        "Amygdala":          [2921, 5063, 3272, 5657, 4120],
        "Entorhinal cortex": [2512, 3864, 1410, 2462, 1878],
        "Hippocampus":       [4386, 9480, 5952, 6872, 4834],
    },
    "4799": {
        "ages":              [68, 70, 72, 73, 74],
        "Amygdala":          [3778, 5104, 3139, 4558, 4513],
        "Entorhinal cortex": [1434, 4030, 2291, 4151, 3448],
        "Hippocampus":       [8719, 7630, 2798, 6817, 5362],
    },
    "4713": {
        "ages":              [71, 73, 75, 78, 82],
        "Amygdala":          [5586, 4158, 6785, 5219, 3389],
        "Entorhinal cortex": [1700, 2797, 6527, 5705, 2974],
        "Hippocampus":       [9530, 8790, 12224, 9248, 6950],
    },
    "4272": {
        "ages":              [77, 80, 84],
        "Amygdala":          [7652, 8438, 3756],
        "Entorhinal cortex": [6560, 4446, 3598],
        "Hippocampus":       [14665, 16871, 10808],
    },
    "2389": {
        "ages":              [58, 59, 64],
        "Amygdala":          [1165, 2952, 2855],
        "Entorhinal cortex": [1051, 2749, 2615],
        "Hippocampus":       [3734, 6287, 7458],
    },
}

# Published regression results, for cross-checking: subject -> region -> (beta1, V_base, rate)
REFERENCE_FITS = {
    "1155": {"Amygdala": (136.3, 2921, -4.67), "Entorhinal cortex": (-49.1, 2512, 1.95),
             "Hippocampus": (-291.5, 4386, 6.65)},
    "4799": {"Amygdala": (39.7, 3778, -1.05), "Entorhinal cortex": (278.6, 1434, -19.43),
             "Hippocampus": (-594.8, 8719, 6.82)},
    "4713": {"Amygdala": (-152.3, 5586, 2.73), "Entorhinal cortex": (130.6, 1700, -7.68),
             "Hippocampus": (-223.2, 9530, 2.34)},
    "4272": {"Amygdala": (-589.8, 7652, 7.71), "Entorhinal cortex": (-411.8, 6560, 6.28),
             "Hippocampus": (-603.1, 14665, 4.11)},
    "2389": {"Amygdala": (184.5, 1165, -15.83), "Entorhinal cortex": (167.9, 1051, -15.97),
             "Hippocampus": (496.0, 3734, -13.28)},
}
