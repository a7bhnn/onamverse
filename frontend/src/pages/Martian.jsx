import { useEffect, useRef, useState } from "react";
import {
  Rocket,
  ChevronRight,
  Flower2,
  Utensils,
  Crown,
  Waves,
  Satellite,
  CircleDot,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Trophy,
} from "lucide-react";

import "./Martian.css";

/* =========================================
   POOKALAM SCORING
========================================= */

function calculateHarmony(board) {
  const size = 7;

  const flowerCount = board.filter(
    (flower) => flower !== null
  ).length;

  /* Hidden perfect Pookalam */

  const perfectPattern = [
    null, null, "🌼", "🌸", "🌼", null, null,
    null, "🌼", "🌺", "🌺", "🌺", "🌼", null,
    "🌼", "🌺", "🌸", "🌺", "🌸", "🌺", "🌼",
    "🌸", "🌺", "🌺", "🌻", "🌺", "🌺", "🌸",
    "🌼", "🌺", "🌸", "🌺", "🌸", "🌺", "🌼",
    null, "🌼", "🌺", "🌺", "🌺", "🌼", null,
    null, null, "🌼", "🌸", "🌼", null, null,
  ];

  const isPerfect =
    board.length === perfectPattern.length &&
    board.every(
      (flower, index) =>
        flower === perfectPattern[index]
    );

  if (isPerfect) {
    return {
      total: 100,
      symmetry: 40,
      variety: 20,
      structure: 20,
      composition: 20,
      flowerCount,
      perfect: true,
    };
  }

  /* Symmetry */

  let symmetryMatches = 0;
  let symmetryChecks = 0;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < 3; col++) {
      const current =
        board[row * size + col];

      const mirror =
        board[
          row * size +
          (size - 1 - col)
        ];

      if (
        current !== null ||
        mirror !== null
      ) {
        symmetryChecks++;

        if (
          current !== null &&
          current === mirror
        ) {
          symmetryMatches++;
        }
      }
    }
  }

  const symmetry =
    symmetryChecks === 0
      ? 0
      : Math.round(
          (symmetryMatches /
            symmetryChecks) *
            40
        );

  /* Variety */

  const uniqueFlowers =
    new Set(
      board.filter(
        (flower) => flower !== null
      )
    ).size;

  let variety = 0;

  if (uniqueFlowers === 1) {
    variety = 5;
  } else if (uniqueFlowers === 2) {
    variety = 10;
  } else if (uniqueFlowers === 3) {
    variety = 15;
  } else if (uniqueFlowers >= 4) {
    variety = 20;
  }

  /* Structure */

  let structure = 0;

  if (board[24] !== null) {
    structure += 6;
  }

  const importantPositions = [
    3,
    21,
    27,
    45,
  ];

  const filledDirections =
    importantPositions.filter(
      (index) =>
        board[index] !== null
    ).length;

  structure +=
    filledDirections * 2;

  const rings = [
    [24],

    [
      16, 17, 18,
      23, 25,
      30, 31, 32,
    ],

    [
      8, 9, 10, 11, 12,
      15, 19,
      22, 26,
      29, 33,
      36, 37, 38, 39, 40,
    ],

    [
      0, 1, 2, 3, 4, 5, 6,
      7, 13,
      14, 20,
      28, 34,
      35, 41,
      42, 43, 44, 45, 46, 47, 48,
    ],
  ];

  let completedRings = 0;

  rings.forEach((ring) => {
    const filled =
      ring.filter(
        (index) =>
          board[index] !== null
      ).length;

    if (
      filled >=
      Math.ceil(
        ring.length * 0.5
      )
    ) {
      completedRings++;
    }
  });

  structure +=
    completedRings * 2;

  structure =
    Math.min(
      20,
      structure
    );

  /* Composition */

  let composition = 0;

  if (flowerCount === 0) {
    composition = 0;
  } else if (flowerCount < 8) {
    composition = 5;
  } else if (flowerCount < 14) {
    composition = 10;
  } else if (flowerCount < 20) {
    composition = 15;
  } else if (flowerCount <= 28) {
    composition = 20;
  } else if (flowerCount <= 35) {
    composition = 12;
  } else if (flowerCount <= 42) {
    composition = 6;
  } else {
    composition = 2;
  }

  const total = Math.min(
    100,
    symmetry +
      variety +
      structure +
      composition
  );

  return {
    total,
    symmetry,
    variety,
    structure,
    composition,
    flowerCount,
    perfect: false,
  };
}

function getHarmonyTitle(score) {
  if (score >= 100) {
    return "MAHABALI'S PERFECT POOKALAM";
  }

  if (score >= 95) {
    return "PERFECT POOKALAM";
  }

  if (score >= 80) {
    return "MAHABALI'S CHOICE";
  }

  if (score >= 60) {
    return "HARMONIOUS BLOOM";
  }

  if (score >= 40) {
    return "BLOOMING";
  }

  return "SEEDLING";
}

/* =========================================
   SADYA SCORING
========================================= */

function calculateSadyaScore(items) {
  if (items.length === 0) {
    return {
      total: 0,
      nutrition: 0,
      tradition: 0,
      balance: 0,
      portion: 0,
      perfect: false,
    };
  }

  /* Hidden perfect Sadya */

  const perfectCombination = [
    "rice",
    "sambar",
    "avial",
    "thoran",
    "pickle",
    "payasam",
  ];

  const selectedIds =
    items
      .map((item) => item.id)
      .sort();

  const perfectIds =
    [...perfectCombination].sort();

  const isPerfect =
    selectedIds.length ===
      perfectIds.length &&
    selectedIds.every(
      (id, index) =>
        id === perfectIds[index]
    );

  if (isPerfect) {
    return {
      total: 100,
      nutrition: 25,
      tradition: 25,
      balance: 25,
      portion: 25,
      perfect: true,
    };
  }

  const nutritionTotal =
    items.reduce(
      (total, item) =>
        total + item.nutrition,
      0
    );

  const traditionTotal =
    items.reduce(
      (total, item) =>
        total + item.tradition,
      0
    );

  const nutritionAverage =
    nutritionTotal /
    items.length;

  const nutrition =
    Math.min(
      25,
      Math.round(
        (nutritionAverage / 10) *
          25
      )
    );

  const traditionAverage =
    traditionTotal /
    items.length;

  const tradition =
    Math.min(
      25,
      Math.round(
        (traditionAverage / 10) *
          25
      )
    );

  const types =
    new Set(
      items.map(
        (item) => item.type
      )
    );

  let balance = 0;

  if (types.has("MAIN")) {
    balance += 6;
  }

  if (types.has("CURRY")) {
    balance += 6;
  }

  if (
    types.has("VEGETABLE")
  ) {
    balance += 6;
  }

  if (types.has("SIDE")) {
    balance += 4;
  }

  if (types.has("DESSERT")) {
    balance += 3;
  }

  balance =
    Math.min(
      25,
      balance
    );

  let portion = 0;

  if (
    items.length === 5 ||
    items.length === 6
  ) {
    portion = 25;
  } else if (items.length === 4) {
    portion = 21;
  } else if (items.length === 7) {
    portion = 19;
  } else if (items.length === 3) {
    portion = 15;
  } else if (items.length === 8) {
    portion = 12;
  } else if (items.length === 2) {
    portion = 9;
  } else if (items.length === 1) {
    portion = 4;
  }

  const total =
    Math.min(
      100,
      nutrition +
        tradition +
        balance +
        portion
    );

  return {
    total,
    nutrition,
    tradition,
    balance,
    portion,
    perfect: false,
  };
}

function getSadyaTitle(score) {
  if (score >= 100) {
    return "MAHABALI'S PERFECT FEAST";
  }

  if (score >= 95) {
    return "ROYAL MARTIAN SADYA";
  }

  if (score >= 85) {
    return "MAHABALI'S FEAST";
  }

  if (score >= 70) {
    return "HARMONIOUS SADYA";
  }

  if (score >= 50) {
    return "DECENT FEAST";
  }

  return "FEAST IN PROGRESS";
}

/* =========================================
   APP
========================================= */


const VALLAM_DIFFICULTIES = {
  medium: {
    label: "MEDIUM",
    speedMultiplier: 0.95,
    laneMin: 1700,
    laneMax: 2600,
    boostAwareness: 0.35,
  },
  hard: {
    label: "HARD",
    speedMultiplier: 1.05,
    laneMin: 1050,
    laneMax: 1750,
    boostAwareness: 0.7,
  },
  extreme: {
    label: "EXTREME",
    speedMultiplier: 1.15,
    laneMin: 700,
    laneMax: 1250,
    boostAwareness: 1,
  },
};

const BOOST_TYPES = {
  speed: {
    label: "SPEED",
    icon: "⚡",
    color: "gold",
  },
  shield: {
    label: "SHIELD",
    icon: "🛡️",
    color: "cyan",
  },
  magnet: {
    label: "MAGNET",
    icon: "🧲",
    color: "violet",
  },
  overdrive: {
    label: "OVERDRIVE",
    icon: "🚀",
    color: "red",
  },
};

const ACHIEVEMENTS = [
  {
    id: "first-bloom",
    icon: "🌱",
    title: "FIRST BLOOM",
    description: "Place your first flower in the Pookalam.",
    requirement: "Place 1 flower",
  },
  {
    id: "master-flowers",
    icon: "🌺",
    title: "MASTER OF FLOWERS",
    description: "Create a perfect Pookalam.",
    requirement: "Reach 100% Pookalam harmony",
  },
  {
    id: "sadya-architect",
    icon: "🍛",
    title: "SADYA ARCHITECT",
    description: "Complete a balanced Martian Sadya.",
    requirement: "Complete the Sadya",
  },
  {
    id: "royal-connection",
    icon: "👑",
    title: "ROYAL CONNECTION",
    description: "Complete your transmission with Mahabali.",
    requirement: "Complete the royal transmission",
  },
  {
    id: "vallam-victor",
    icon: "🚣",
    title: "VALLAM VICTOR",
    description: "Defeat the Royal AI crew in Vallam Kali.",
    requirement: "Win a race",
  },
  {
    id: "boost-master",
    icon: "⚡",
    title: "BOOST MASTER",
    description: "Collect every boost type in a single race.",
    requirement: "Speed + Shield + Magnet + Overdrive",
  },
  {
    id: "meteor-dodger",
    icon: "☄️",
    title: "METEOR DODGER",
    description: "Win a Vallam Kali race without taking a meteor hit.",
    requirement: "Win with 0 meteor hits",
  },
  {
    id: "martian-onam",
    icon: "🪐",
    title: "MARTIAN ONAM",
    description: "Complete all four festival activities.",
    requirement: "Complete Pookalam + Sadya + Mahabali + Vallam",
  },
  {
    id: "thiruvonam-champion",
    icon: "🏆",
    title: "THIRUVONAM CHAMPION",
    description: "Raise the colony Harmony Index to 90% or higher.",
    requirement: "Reach 90% Harmony",
  },
];

function createDynamicMeteors() {
  const lanes = [0, 1, 2, 3, 4];

  return Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    progress: 12 + index * 9 + Math.random() * 6,
    lane: lanes[Math.floor(Math.random() * lanes.length)],
    driftDir: Math.random() > 0.5 ? 1 : -1,
    nextDrift: Date.now() + 900 + Math.random() * 1800,
    icon: index % 3 === 0 ? "☄" : index % 3 === 1 ? "✦" : "◈",
  }));
}

function App() {
  const [entered, setEntered] =
    useState(false);

  const [screen, setScreen] =
    useState("colony");

  const [selectedLocation,
    setSelectedLocation] =
    useState(null);

  /* =========================================
     PHASE 7.1 — GLOBAL HARMONY PROGRESS
  ========================================= */

  const [globalProgress, setGlobalProgress] =
    useState({
      pookalam: 0,
      sadya: 0,
      mahabali: 0,
      vallam: 0,
    });

  const harmonyIndex = Math.round(
    (
      globalProgress.pookalam +
      globalProgress.sadya +
      globalProgress.mahabali +
      globalProgress.vallam
    ) / 4
  );

  /* =========================================
     PHASE 7.3 — COLONY REACTIVITY
  ========================================= */

  const colonyState =
    harmonyIndex >= 90
      ? {
          key: "complete",
          label: "THIRUVONAM COMPLETE",
          message: "The Martian colony has become a home for tradition.",
          subtext: "Festival systems synchronized • Community harmony exceptional",
        }
      : harmonyIndex >= 75
      ? {
          key: "thriving",
          label: "COLONY THRIVING",
          message: "Onam is taking root across Mars.",
          subtext: "Festival systems active • Community harmony rising",
        }
      : harmonyIndex >= 50
      ? {
          key: "stable",
          label: "COLONY HARMONIZED",
          message: "The colony is beginning to feel like home.",
          subtext: "Festival systems responding • Tradition stabilized",
        }
      : harmonyIndex >= 25
      ? {
          key: "developing",
          label: "COLONY DEVELOPING",
          message: "The first sparks of Thiruvonam are spreading.",
          subtext: "Festival systems initializing • More traditions await",
        }
      : {
          key: "unstable",
          label: "COLONY AWAITING FESTIVAL",
          message: "Mars is ready for its first Martian Thiruvonam.",
          subtext: "Festival systems dormant • Begin the celebration",
        };

  const getReactiveLocationStatus = (location) => {
    const value = globalProgress[location.id];

    if (value >= 100) return "COMPLETED";
    if (value > 0) return "IN PROGRESS";
    if (harmonyIndex >= 75) return "READY";
    return location.status;
  };

  const updateGlobalProgress = (
    activity,
    value
  ) => {
    setGlobalProgress((previous) => ({
      ...previous,
      [activity]: Math.max(
        previous[activity],
        Math.min(100, Math.round(value))
      ),
    }));
  };

  /* =========================================
     PHASE 7.2 — ACHIEVEMENTS & MILESTONES
  ========================================= */

  const [unlockedAchievements, setUnlockedAchievements] =
    useState(() => {
      try {
        const saved = localStorage.getItem("onam2150-achievements");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    });

  const unlockedAchievementsRef =
    useRef(unlockedAchievements);

  useEffect(() => {
    unlockedAchievementsRef.current =
      unlockedAchievements;

    localStorage.setItem(
      "onam2150-achievements",
      JSON.stringify(unlockedAchievements)
    );
  }, [unlockedAchievements]);

  const [vallamCollectedBoostTypes,
    setVallamCollectedBoostTypes] =
    useState([]);

  const [vallamHitCount,
    setVallamHitCount] =
    useState(0);

  const unlockAchievement = (id) => {
    if (
      unlockedAchievementsRef.current.includes(id)
    ) {
      return;
    }

    const updated = [
      ...unlockedAchievementsRef.current,
      id,
    ];

    unlockedAchievementsRef.current = updated;
    setUnlockedAchievements(updated);
  };

  /* Pookalam */

  const [selectedFlower,
    setSelectedFlower] =
    useState("🌸");

  const [pookalam,
    setPookalam] =
    useState(
      Array(49).fill(null)
    );

  const [completed,
    setCompleted] =
    useState(false);

  const score =
    calculateHarmony(
      pookalam
    );

  /* Sadya */

  const [sadyaItems,
    setSadyaItems] =
    useState([]);

  const [sadyaCompleted,
    setSadyaCompleted] =
    useState(false);

  const sadyaScore =
    calculateSadyaScore(
      sadyaItems
    );

  /* Mahabali */

  const [mahabaliChoice,
    setMahabaliChoice] =
    useState(null);

  const [mahabaliComplete,
    setMahabaliComplete] =
    useState(false);

  /* Vallam Kali */

  const [vallamLane, setVallamLane] =
    useState(2);

  const [vallamStarted, setVallamStarted] =
    useState(false);

  const [vallamProgress, setVallamProgress] =
    useState(0);

  const [vallamOpponentProgress, setVallamOpponentProgress] =
    useState(0);

  const [vallamAIs, setVallamAIs] =
    useState([
      { id: 1, name: "Neo Malabar", lane: 0, progress: 0, speed: 0.56, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
      { id: 2, name: "Vajra Varma", lane: 1, progress: 0, speed: 0.62, nextLaneChange: 0, direction: -1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
      { id: 3, name: "Keralon Prime", lane: 3, progress: 0, speed: 0.59, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
    ]);

  const [vallamSpeed, setVallamSpeed] =
    useState(1);

  const [vallamFinished, setVallamFinished] =
    useState(false);

  const [vallamWon, setVallamWon] =
    useState(false);

  const [vallamWinnerName, setVallamWinnerName] =
    useState("");

  const [vallamHit, setVallamHit] =
    useState(false);

  const [vallamDifficulty, setVallamDifficulty] =
    useState("hard");

  const [vallamActiveBoost, setVallamActiveBoost] =
    useState(null);

  const [vallamShield, setVallamShield] =
    useState(0);

  const [vallamMeteors, setVallamMeteors] =
    useState(() => createDynamicMeteors());

  /* Phase 6.3 — Boosts & Combo */

  const initialBoosts = [
    { id: 1, progress: 18, lane: 1, type: "speed", collected: false },
    { id: 2, progress: 35, lane: 3, type: "shield", collected: false },
    { id: 3, progress: 52, lane: 0, type: "magnet", collected: false },
    { id: 4, progress: 69, lane: 4, type: "overdrive", collected: false },
    { id: 5, progress: 84, lane: 2, type: "speed", collected: false },
  ];

  const [vallamScore, setVallamScore] = useState(0);
  const [vallamCombo, setVallamCombo] = useState(0);
  const [vallamBoost, setVallamBoost] = useState(0);
  const [vallamBoosts, setVallamBoosts] =
    useState(initialBoosts);

  const vallamScoreRef = useRef(0);
  const vallamComboRef = useRef(0);
  const vallamBoostRef = useRef(0);
  const vallamBoostsRef = useRef(initialBoosts);

  const vallamLaneRef = useRef(2);
  const vallamProgressRef = useRef(0);
  const vallamOpponentRef = useRef(0);
  const vallamActiveBoostRef = useRef(null);
  const vallamShieldRef = useRef(0);
  const vallamMeteorsRef = useRef(createDynamicMeteors());

  const vallamAIsRef = useRef([
    { id: 1, name: "Neo Malabar", lane: 0, progress: 0, speed: 0.56, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
    { id: 2, name: "Vajra Varma", lane: 1, progress: 0, speed: 0.62, nextLaneChange: 0, direction: -1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
    { id: 3, name: "Keralon Prime", lane: 3, progress: 0, speed: 0.59, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
  ]);

  const vallamSpeedRef = useRef(1);

  useEffect(() => {
    vallamLaneRef.current = vallamLane;
  }, [vallamLane]);

  useEffect(() => {
    vallamProgressRef.current = vallamProgress;
  }, [vallamProgress]);

  useEffect(() => {
    vallamOpponentRef.current = vallamOpponentProgress;
  }, [vallamOpponentProgress]);

  useEffect(() => {
    vallamSpeedRef.current = vallamSpeed;
  }, [vallamSpeed]);

  /* Automatically unlock achievements as the player progresses. */
  useEffect(() => {
    if (score.flowerCount >= 1) {
      unlockAchievement("first-bloom");
    }

    if (score.perfect || score.total >= 100) {
      unlockAchievement("master-flowers");
    }

    if (sadyaCompleted) {
      unlockAchievement("sadya-architect");
    }

    if (mahabaliComplete) {
      unlockAchievement("royal-connection");
    }

    if (vallamWon) {
      unlockAchievement("vallam-victor");
    }

    if (
      vallamCollectedBoostTypes.length === 4
    ) {
      unlockAchievement("boost-master");
    }

    if (
      vallamWon &&
      vallamHitCount === 0
    ) {
      unlockAchievement("meteor-dodger");
    }

    if (
      completed &&
      sadyaCompleted &&
      mahabaliComplete &&
      vallamWon
    ) {
      unlockAchievement("martian-onam");
    }

    if (harmonyIndex >= 90) {
      unlockAchievement("thiruvonam-champion");
    }
  }, [
    score.flowerCount,
    score.perfect,
    score.total,
    sadyaCompleted,
    mahabaliComplete,
    vallamWon,
    vallamCollectedBoostTypes,
    vallamHitCount,
    completed,
    harmonyIndex,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!vallamStarted || vallamFinished) return;

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w"
      ) {
        event.preventDefault();
        setVallamLane((lane) => Math.max(0, lane - 1));
      }

      if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        setVallamLane((lane) => Math.min(4, lane + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [vallamStarted, vallamFinished]);

  useEffect(() => {
    if (!vallamStarted || vallamFinished) return;

    const difficulty =
      VALLAM_DIFFICULTIES[vallamDifficulty] ||
      VALLAM_DIFFICULTIES.hard;

    const interval = setInterval(() => {
      const now = Date.now();
      const current = vallamProgressRef.current;

      /* Dynamic meteors: every race gets a new layout, and meteors
         can drift one lane while the race is running. */
      const updatedMeteors = vallamMeteorsRef.current.map((meteor) => {
        if (now < meteor.nextDrift) return meteor;

        const nextLane = Math.max(
          0,
          Math.min(4, meteor.lane + meteor.driftDir)
        );

        return {
          ...meteor,
          lane: nextLane,
          driftDir:
            nextLane === 0
              ? 1
              : nextLane === 4
              ? -1
              : Math.random() > 0.5
              ? 1
              : -1,
          nextDrift: now + 1100 + Math.random() * 1800,
        };
      });

      vallamMeteorsRef.current = updatedMeteors;
      setVallamMeteors(updatedMeteors);

      const activePlayerBoost = vallamActiveBoostRef.current;
      const playerMultiplier =
        activePlayerBoost === "overdrive"
          ? 2.25
          : activePlayerBoost === "speed"
          ? 1.8
          : 1;

      const next = Math.min(
        100,
        current +
          0.75 *
            vallamSpeedRef.current *
            playerMultiplier
      );

      /* Meteor collision. Shield blocks the first hit. */
      const collision = updatedMeteors.some(
        (meteor) =>
          current < meteor.progress &&
          next >= meteor.progress &&
          vallamLaneRef.current === meteor.lane
      );

      if (collision) {
        if (vallamShieldRef.current > 0) {
          vallamShieldRef.current = 0;
          setVallamShield(0);
          setVallamActiveBoost(null);
          vallamActiveBoostRef.current = null;
          vallamScoreRef.current += 75;
          setVallamScore(vallamScoreRef.current);
        } else {
          setVallamHit(true);
          setVallamHitCount((count) => count + 1);
          setVallamSpeed(0.45);
          vallamSpeedRef.current = 0.45;
          vallamComboRef.current = 0;
          setVallamCombo(0);

          setTimeout(() => {
            setVallamHit(false);
            setVallamSpeed(1);
            vallamSpeedRef.current = 1;
          }, 700);
        }
      }

      /* Magnet automatically pulls in a nearby boost. */
      const magnetActive =
        vallamActiveBoostRef.current === "magnet";

      const boostClaims = new Map();

      vallamBoostsRef.current.forEach((boost) => {
        if (boost.collected) return;

        const sameLane =
          vallamLaneRef.current === boost.lane;

        const playerReached =
          (sameLane &&
            current < boost.progress &&
            next >= boost.progress) ||
          (magnetActive &&
            Math.abs(boost.progress - current) < 9);

        const aiReached = vallamAIsRef.current
          .filter((bot) => bot.lane === boost.lane)
          .find((bot) => bot.progress >= boost.progress);

        if (playerReached) {
          boostClaims.set(boost.id, { type: "player" });
        } else if (aiReached) {
          boostClaims.set(boost.id, {
            type: "ai",
            botId: aiReached.id,
          });
        }
      });

      const updatedBoosts =
        vallamBoostsRef.current.map((boost) => {
          const claim = boostClaims.get(boost.id);
          if (!claim) return boost;

          if (claim.type === "player") {
            const newCombo =
              vallamComboRef.current + 1;
            const multiplier = Math.min(5, newCombo);
            const type = boost.type || "speed";

            setVallamCollectedBoostTypes((types) =>
              types.includes(type)
                ? types
                : [...types, type]
            );

            vallamComboRef.current = newCombo;
            vallamScoreRef.current +=
              100 * multiplier;

            setVallamCombo(newCombo);
            setVallamScore(vallamScoreRef.current);

            if (type === "shield") {
              vallamShieldRef.current = 1;
              setVallamShield(1);
              setVallamActiveBoost("shield");
              vallamActiveBoostRef.current = "shield";
            } else {
              const duration =
                type === "overdrive" ? 65 : 100;

              vallamBoostRef.current = duration;
              setVallamBoost(duration);
              setVallamActiveBoost(type);
              vallamActiveBoostRef.current = type;
            }
          }

          return {
            ...boost,
            collected: true,
            collectedBy: claim.type,
            collectedByBot:
              claim.type === "ai" ? claim.botId : null,
          };
        });

      /* AI boost types + difficulty. */
      const boostedAIs = vallamAIsRef.current.map((bot) => {
        const collectedBoost = updatedBoosts.find(
          (boost) =>
            boost.collected &&
            boost.collectedBy === "ai" &&
            boost.collectedByBot === bot.id &&
            !(bot.boostedBy || []).includes(boost.id)
        );

        if (collectedBoost) {
          const type = collectedBoost.type || "speed";

          return {
            ...bot,
            activeBoost: type,
            boostMultiplier:
              type === "overdrive"
                ? 2.1
                : type === "speed"
                ? 1.75
                : 1,
            boostTimer:
              type === "shield" ? 0 : 100,
            shield:
              type === "shield" ? 1 : bot.shield || 0,
            boostedBy: [
              ...(bot.boostedBy || []),
              collectedBoost.id,
            ],
          };
        }

        const remaining = Math.max(
          0,
          (bot.boostTimer || 0) - 1
        );

        return {
          ...bot,
          boostTimer: remaining,
          boostMultiplier:
            remaining > 0
              ? bot.boostMultiplier || 1.75
              : 1,
          activeBoost:
            remaining > 0 ? bot.activeBoost : null,
        };
      });

      vallamBoostsRef.current = updatedBoosts;
      setVallamBoosts(updatedBoosts);

      vallamAIsRef.current = boostedAIs;
      setVallamAIs(boostedAIs);

      if (vallamBoostRef.current > 0) {
        vallamBoostRef.current = Math.max(
          0,
          vallamBoostRef.current - 2.5
        );
        setVallamBoost(vallamBoostRef.current);

        if (vallamBoostRef.current === 0) {
          setVallamActiveBoost(null);
          vallamActiveBoostRef.current = null;
        }
      }

      /* AI CREW — difficulty changes speed, reaction time and lane choice. */
      const currentAIs = vallamAIsRef.current;

      const updatedAIs = currentAIs.map((bot) => {
        let lane = bot.lane;
        let nextLaneChange = bot.nextLaneChange;

        if (now >= nextLaneChange) {
          const otherLanes = currentAIs
            .filter((other) => other.id !== bot.id)
            .map((other) => other.lane);

          const nearbyBoosts = vallamBoostsRef.current
            .filter(
              (boost) =>
                !boost.collected &&
                boost.progress > bot.progress &&
                boost.progress - bot.progress < 22
            )
            .sort(
              (a, b) =>
                a.progress - b.progress
            );

          const dangerousLanes = updatedMeteors
            .filter(
              (meteor) =>
                meteor.progress > bot.progress &&
                meteor.progress - bot.progress < 18
            )
            .map((meteor) => meteor.lane);

          let candidates = [
            lane - 1,
            lane + 1,
          ].filter(
            (value) =>
              value >= 0 &&
              value <= 4 &&
              !otherLanes.includes(value)
          );

          /* Hard/Extreme bots actively seek boosts and avoid meteors. */
          if (difficulty.boostAwareness > 0) {
            const targetBoost = nearbyBoosts.find(
              (boost) =>
                Math.random() <
                difficulty.boostAwareness
            );

            if (targetBoost) {
              const towardBoost = [
                targetBoost.lane,
                targetBoost.lane - 1,
                targetBoost.lane + 1,
              ].find(
                (value) =>
                  value >= 0 &&
                  value <= 4 &&
                  !otherLanes.includes(value)
              );

              if (towardBoost !== undefined) {
                lane = towardBoost;
              }
            }
          }

          if (
            lane === bot.lane &&
            dangerousLanes.includes(lane)
          ) {
            const safe = candidates.filter(
              (value) =>
                !dangerousLanes.includes(value)
            );
            if (safe.length) candidates = safe;
            if (candidates.length) {
              lane =
                candidates[
                  Math.floor(
                    Math.random() * candidates.length
                  )
                ];
            }
          } else if (lane === bot.lane && candidates.length) {
            lane =
              candidates[
                Math.floor(
                  Math.random() * candidates.length
                )
              ];
          }

          nextLaneChange =
            now +
            difficulty.laneMin +
            Math.random() *
              (difficulty.laneMax - difficulty.laneMin);
        }

        return {
          ...bot,
          lane,
          progress: Math.min(
            100,
            bot.progress +
              bot.speed *
                difficulty.speedMultiplier *
                (bot.boostMultiplier || 1)
          ),
          nextLaneChange,
          direction:
            lane > bot.lane ? 1 : -1,
        };
      });

      vallamAIsRef.current = updatedAIs;
      setVallamAIs(updatedAIs);

      const opponentNext = Math.max(
        ...updatedAIs.map((bot) => bot.progress),
        0
      );

      vallamOpponentRef.current = opponentNext;
      setVallamOpponentProgress(opponentNext);

      vallamProgressRef.current = next;
      setVallamProgress(next);

      if (next >= 100 || opponentNext >= 100) {
        const playerWon =
          next >= 100 && next >= opponentNext;

        if (playerWon) {
          setVallamWinnerName("Mars Crew");
        } else {
          const winningBot = updatedAIs.reduce(
            (leader, bot) =>
              bot.progress > leader.progress
                ? bot
                : leader,
            updatedAIs[0]
          );

          setVallamWinnerName(
            winningBot?.name || "Royal Crew"
          );
        }

        setVallamWon(playerWon);
        setVallamFinished(true);

        const vallamPerformance = playerWon
          ? Math.min(
              100,
              70 +
                Math.round(
                  vallamScoreRef.current / 100
                )
            )
          : Math.min(
              65,
              40 +
                Math.round(
                  vallamScoreRef.current / 150
                )
            );

        updateGlobalProgress(
          "vallam",
          vallamPerformance
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [vallamStarted, vallamFinished, vallamDifficulty]);

  /* =========================================
     LOCATIONS
  ========================================= */

  const locations = [
    {
      id: "pookalam",
      icon: Flower2,
      title: "POOKALAM",
      subtitle: "Holographic Garden",
      description:
        "Create a Pookalam using Martian flowers, bioluminescent petals and synthetic flora.",
      status: "PLAY NOW",
    },

    {
      id: "sadya",
      icon: Utensils,
      title: "SADYA LAB",
      subtitle: "Hydroponic Kitchen",
      description:
        "Design a traditional Sadya using ingredients grown inside the Mars colony.",
      status: "PLAY NOW",
    },

    {
      id: "mahabali",
      icon: Crown,
      title: "MAHABALI",
      subtitle: "Royal Transmission",
      description:
        "Establish a connection with Mahabali and ask him what Onam means in 2150.",
      status: "PLAY NOW",
    },

    {
      id: "vallam",
      icon: Waves,
      title: "VALLAM KALI",
      subtitle: "Zero-G Arena",
      description:
        "Enter the Martian waters and compete in a futuristic low-gravity Vallam Kali.",
      status: "PLAY NOW",
    },
  ];

  /* =========================================
     FLOWERS
  ========================================= */

  const flowers = [
    {
      emoji: "🌸",
      name: "Cosmic Lotus",
    },
    {
      emoji: "🌺",
      name: "Mars Bloom",
    },
    {
      emoji: "🌼",
      name: "Solar Petal",
    },
    {
      emoji: "🌻",
      name: "Sun Flower",
    },
    {
      emoji: "🪻",
      name: "Nebula Bloom",
    },
  ];

  /* =========================================
     SADYA DISHES
  ========================================= */

  const sadyaDishes = [
    {
      id: "rice",
      emoji: "🍚",
      name: "MARTIAN RICE",
      type: "MAIN",
      nutrition: 10,
      tradition: 10,
    },
    {
      id: "sambar",
      emoji: "🥣",
      name: "HYDROPONIC SAMBAR",
      type: "CURRY",
      nutrition: 10,
      tradition: 9,
    },
    {
      id: "avial",
      emoji: "🥗",
      name: "MARS AVIAL",
      type: "VEGETABLE",
      nutrition: 10,
      tradition: 10,
    },
    {
      id: "thoran",
      emoji: "🥬",
      name: "OXYGEN THORAN",
      type: "VEGETABLE",
      nutrition: 9,
      tradition: 9,
    },
    {
      id: "olan",
      emoji: "🥒",
      name: "LUNAR OLAN",
      type: "CURRY",
      nutrition: 8,
      tradition: 8,
    },
    {
      id: "pickle",
      emoji: "🌶️",
      name: "MARS PICKLE",
      type: "SIDE",
      nutrition: 5,
      tradition: 9,
    },
    {
      id: "pappadam",
      emoji: "🫓",
      name: "CRYO PAPPADAM",
      type: "SIDE",
      nutrition: 5,
      tradition: 8,
    },
    {
      id: "payasam",
      emoji: "🍮",
      name: "ZERO-G PAYASAM",
      type: "DESSERT",
      nutrition: 8,
      tradition: 10,
    },
  ];

  /* =========================================
     POOKALAM FUNCTIONS
  ========================================= */

  const placeFlower = (index) => {
    const newPookalam =
      [...pookalam];

    if (
      newPookalam[index] !== null
    ) {
      newPookalam[index] = null;
    } else {
      newPookalam[index] =
        selectedFlower;
    }

    setPookalam(
      newPookalam
    );
  };

  const resetPookalam = () => {
    setPookalam(
      Array(49).fill(null)
    );

    setCompleted(false);
  };

  const completePookalam = () => {
    if (
      score.flowerCount < 8
    ) {
      alert(
        "Your Pookalam needs at least 8 flowers!"
      );

      return;
    }

    setCompleted(true);
    updateGlobalProgress(
      "pookalam",
      score.total
    );
  };

  /* =========================================
     SADYA FUNCTIONS
  ========================================= */

  const addSadyaItem = (dish) => {
    const alreadyAdded =
      sadyaItems.some(
        (item) =>
          item.id === dish.id
      );

    if (alreadyAdded) {
      return;
    }

    setSadyaItems([
      ...sadyaItems,
      dish,
    ]);
  };

  const removeSadyaItem =
    (id) => {
      setSadyaItems(
        sadyaItems.filter(
          (item) =>
            item.id !== id
        )
      );
    };

  const resetSadya = () => {
    setSadyaItems([]);

    setSadyaCompleted(false);
  };

  const completeSadya = () => {
    if (
      sadyaItems.length < 5
    ) {
      alert(
        "A balanced Sadya needs at least 5 dishes!"
      );

      return;
    }

    setSadyaCompleted(true);
    updateGlobalProgress(
      "sadya",
      sadyaScore.total
    );
  };

  /* =========================================
     MAHABALI FUNCTIONS
  ========================================= */

  const chooseMahabaliResponse =
    (choice) => {
      setMahabaliChoice(choice);
    };

  const resetMahabali = () => {
    setMahabaliChoice(null);
    setMahabaliComplete(false);
  };

  const finishMahabali =
    () => {
      setMahabaliComplete(true);
      updateGlobalProgress(
        "mahabali",
        100
      );
    };

  /* =========================================
     LANDING
  ========================================= */

  if (!entered) {
    return (
      <div className="app">

        <main className="landing">

          <div className="stars"></div>

          <div className="mars-glow"></div>

          <div className="landing-content">

            <div className="year">
              THIRUVONAM • MARS COLONY • 2150
            </div>

            <h1>
              ONAM 2150
            </h1>

            <h2>
              THE FIRST ONAM BEYOND EARTH
            </h2>

            <p className="story">
              It is the year 2150.
              Humanity has made Mars
              its second home. But one
              tradition survived the
              journey across the stars.
            </p>

            <p className="quote">
              "Even across the stars,
              Mahabali comes home."
            </p>

            <button
              className="enter-button"
              onClick={() =>
                setEntered(true)
              }
            >
              <Rocket size={20} />

              ENTER MARS

              <ChevronRight size={20} />
            </button>

          </div>

          <div className="mars">

            <img
              src="/mars.png"
              alt="Mars"
            />

          </div>

          <div className="bottom-text">
            MARS COLONY 01 • YEAR 2150 • THIRUVONAM PROTOCOL ACTIVE
          </div>

        </main>

      </div>
    );
  }

  /* =========================================
     PHASE 7.2 — ACHIEVEMENTS SCREEN
  ========================================= */

  if (screen === "achievements") {
    return (
      <div className="app">
        <main className="achievements-screen">
          <div className="achievements-background"></div>

          <header className="achievements-header">
            <button
              className="return-button"
              onClick={() => setScreen("colony")}
            >
              <ArrowLeft size={18} />
              BACK TO COLONY
            </button>

            <div className="achievements-title">
              <span>THIRUVONAM PROTOCOL • MARS COLONY 01</span>
              <h1>ACHIEVEMENTS</h1>
              <p>EVERY TRADITION LEAVES A MARK</p>
            </div>

            <div className="achievements-total">
              <Trophy size={18} />
              <div>
                <span>UNLOCKED</span>
                <strong>
                  {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                </strong>
              </div>
            </div>
          </header>

          <section className="achievements-main">
            <div className="achievements-intro">
              <span>PHASE 7.2 • MILESTONE SYSTEM</span>
              <h2>YOUR MARTIAN ONAM JOURNEY</h2>
              <p>
                Complete festival activities, master the challenges
                and unlock milestones that persist between sessions.
              </p>
            </div>

            <div className="achievement-progress-track">
              <div
                className="achievement-progress-fill"
                style={{
                  width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%`,
                }}
              />
            </div>

            <div className="achievement-grid">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked =
                  unlockedAchievements.includes(
                    achievement.id
                  );

                return (
                  <article
                    key={achievement.id}
                    className={
                      unlocked
                        ? "achievement-card unlocked"
                        : "achievement-card locked"
                    }
                  >
                    <div className="achievement-icon">
                      {unlocked ? achievement.icon : "🔒"}
                    </div>

                    <div className="achievement-content">
                      <span>
                        {unlocked
                          ? "UNLOCKED"
                          : "LOCKED"}
                      </span>

                      <h3>
                        {achievement.title}
                      </h3>

                      <p>
                        {achievement.description}
                      </p>

                      <small>
                        {achievement.requirement}
                      </small>
                    </div>

                    {unlocked && (
                      <div className="achievement-check">
                        ✓
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <footer className="achievements-footer">
            <span>
              ACHIEVEMENTS ARE SAVED LOCALLY
            </span>
            <span>
              {unlockedAchievements.length === ACHIEVEMENTS.length
                ? "THIRUVONAM COMPLETE"
                : "MORE MILESTONES AWAIT"}
            </span>
          </footer>
        </main>
      </div>
    );
  }

  /* =========================================
     SADYA LAB
  ========================================= */

  if (screen === "sadya") {
    return (
      <div className="app">

        <main className="sadya-lab">

          <div className="sadya-background"></div>

          <header className="sadya-header">

            <button
              className="return-button"
              onClick={() =>
                setScreen("colony")
              }
            >
              <ArrowLeft size={18} />

              BACK TO COLONY
            </button>

            <div className="sadya-title">

              <span>
                MARS COLONY 01 • HYDROPONIC FOOD SYSTEM
              </span>

              <h1>
                MARTIAN SADYA LAB
              </h1>

              <p>
                THIRUVONAM FEAST • YEAR 2150
              </p>

            </div>

            <div className="sadya-score">

              <Sparkles size={17} />

              <div>

                <span>
                  FEAST SCORE
                </span>

                <strong>
                  {sadyaScore.total}%
                </strong>

              </div>

            </div>

          </header>

          {!sadyaCompleted && (

            <section className="sadya-game">

              <aside className="dish-panel">

                <span className="panel-label">
                  HYDROPONIC KITCHEN
                </span>

                <h2>
                  SELECT DISHES
                </h2>

                <p>
                  Build a balanced Martian
                  Sadya. More food does not
                  always mean a better feast.
                </p>

                <div className="dish-list">

                  {sadyaDishes.map(
                    (dish) => {

                      const selected =
                        sadyaItems.some(
                          (item) =>
                            item.id ===
                            dish.id
                        );

                      return (
                        <button
                          key={dish.id}
                          className={
                            selected
                              ? "dish-option selected"
                              : "dish-option"
                          }
                          onClick={() => {

                            if (selected) {
                              removeSadyaItem(
                                dish.id
                              );
                            } else {
                              addSadyaItem(
                                dish
                              );
                            }

                          }}
                        >

                          <span className="dish-emoji">
                            {dish.emoji}
                          </span>

                          <div>

                            <strong>
                              {dish.name}
                            </strong>

                            <small>
                              {dish.type}
                            </small>

                          </div>

                          <span className="dish-check">
                            {selected
                              ? "✓"
                              : "+"}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                <div className="sadya-hint">

                  <Sparkles size={14} />

                  <span>
                    HARMONY OVER ABUNDANCE
                  </span>

                </div>

              </aside>

              <div className="sadya-center">

                <div className="leaf-label">
                  HOLOGRAPHIC BANANA LEAF
                </div>

                <div className="banana-leaf">

                  <div className="leaf-stem"></div>

                  <div className="sadya-arrangement">

                    {sadyaItems.length === 0 && (

                      <div className="empty-leaf">

                        <span>
                          🍃
                        </span>

                        <p>
                          SELECT DISHES
                          <br />
                          TO BEGIN
                        </p>

                      </div>

                    )}

                    {sadyaItems.map(
                      (dish) => (

                        <div
                          key={dish.id}
                          className="placed-dish"
                          onClick={() =>
                            removeSadyaItem(
                              dish.id
                            )
                          }
                        >

                          <span>
                            {dish.emoji}
                          </span>

                          <small>
                            {dish.name}
                          </small>

                        </div>
                      )
                    )}

                  </div>

                </div>

                <div className="leaf-status">

                  <CircleDot size={12} />

                  MARTIAN FOOD SYNTHESIS ACTIVE

                </div>

              </div>

              <aside className="sadya-info">

                <div className="info-box">

                  <span>
                    DISHES SELECTED
                  </span>

                  <strong>
                    {sadyaItems.length}
                  </strong>

                </div>

                <div className="info-box">

                  <span>
                    FEAST SCORE
                  </span>

                  <strong>
                    {sadyaScore.total}%
                  </strong>

                  <div className="score-bar">

                    <div
                      style={{
                        width:
                          `${sadyaScore.total}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <div className="score-breakdown">

                  <span className="breakdown-title">
                    FEAST ANALYSIS
                  </span>

                  <div className="breakdown-row">
                    <span>
                      NUTRITION
                    </span>

                    <strong>
                      {sadyaScore.nutrition}/25
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      TRADITION
                    </span>

                    <strong>
                      {sadyaScore.tradition}/25
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      BALANCE
                    </span>

                    <strong>
                      {sadyaScore.balance}/25
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      PORTION
                    </span>

                    <strong>
                      {sadyaScore.portion}/25
                    </strong>
                  </div>

                </div>

                <button
                  className="complete-button"
                  onClick={
                    completeSadya
                  }
                >

                  <Trophy size={17} />

                  COMPLETE SADYA

                </button>

                <button
                  className="reset-button"
                  onClick={
                    resetSadya
                  }
                >

                  <RotateCcw size={15} />

                  CLEAR SADYA

                </button>

              </aside>

            </section>
          )}

          {sadyaCompleted && (

            <section className="sadya-complete">

              <div className="complete-icon">
                🍛
              </div>

              <span>
                MARTIAN HYDROPONIC KITCHEN
              </span>

              <h2>
                SADYA
                <br />
                READY
              </h2>

              <div className="harmony-title">

                {sadyaScore.perfect
                  ? "MAHABALI'S PERFECT FEAST"
                  : getSadyaTitle(
                      sadyaScore.total
                    )}

              </div>

              <p>
                Your Martian Sadya is ready
                for Thiruvonam 2150.
              </p>

              <div className="final-score">

                <span>
                  FEAST SCORE
                </span>

                <strong>
                  {sadyaScore.total}%
                </strong>

              </div>

              <div className="complete-actions">

                <button
                  className="complete-button"
                  onClick={
                    resetSadya
                  }
                >

                  <RotateCcw size={17} />

                  CREATE AGAIN

                </button>

                <button
                  className="reset-button"
                  onClick={() =>
                    setScreen("colony")
                  }
                >

                  <ArrowLeft size={15} />

                  RETURN TO COLONY

                </button>

              </div>

            </section>
          )}

        </main>

      </div>
    );
  }

  /* =========================================
     POOKALAM LAB
  ========================================= */

  if (screen === "pookalam") {
    return (
      <div className="app">

        <main className="pookalam-lab">

          <div className="pookalam-background"></div>

          <header className="pookalam-header">

            <button
              className="return-button"
              onClick={() =>
                setScreen("colony")
              }
            >
              <ArrowLeft size={18} />

              BACK TO COLONY
            </button>

            <div className="pookalam-title">

              <span>
                MARS COLONY 01 • BOTANICAL SYSTEM
              </span>

              <h1>
                MARTIAN POOKALAM
              </h1>

              <p>
                HOLOGRAPHIC GARDEN • THIRUVONAM 2150
              </p>

            </div>

            <div className="pookalam-score">

              <Sparkles size={17} />

              <div>

                <span>
                  HARMONY
                </span>

                <strong>
                  {score.total}%
                </strong>

              </div>

            </div>

          </header>

          {!completed && (

            <section className="pookalam-game">

              <aside className="flower-panel">

                <span className="panel-label">
                  MARTIAN FLORA
                </span>

                <h2>
                  SELECT PETAL
                </h2>

                <p>
                  Choose a flower and place it
                  inside the holographic garden.
                </p>

                <div className="flower-options">

                  {flowers.map(
                    (flower) => (

                      <button
                        key={flower.emoji}
                        className={
                          selectedFlower ===
                          flower.emoji
                            ? "flower-option active"
                            : "flower-option"
                        }
                        onClick={() =>
                          setSelectedFlower(
                            flower.emoji
                          )
                        }
                      >

                        <span>
                          {flower.emoji}
                        </span>

                        <small>
                          {flower.name}
                        </small>

                      </button>
                    )
                  )}

                </div>

                <div className="game-instructions">

                  <span>
                    HOW TO PLAY
                  </span>

                  <p>
                    Select a flower and click
                    any position on the Pookalam.
                  </p>

                  <p>
                    Build a symmetrical design
                    to maximize your Harmony score.
                  </p>

                </div>

              </aside>

              <div className="pookalam-center">

                <div className="garden-label">
                  HOLOGRAPHIC GARDEN
                </div>

                <div className="pookalam-ring">

                  <div className="pookalam-grid">

                    {pookalam.map(
                      (flower, index) => (

                        <button
                          key={index}
                          className={
                            flower
                              ? "pookalam-cell filled"
                              : "pookalam-cell"
                          }
                          onClick={() =>
                            placeFlower(index)
                          }
                        >
                          {flower}
                        </button>
                      )
                    )}

                  </div>

                </div>

                <div className="garden-status">

                  <CircleDot size={12} />

                  BIO-LUMINESCENT SYSTEM ACTIVE

                </div>

              </div>

              <aside className="pookalam-info">

                <div className="info-box">

                  <span>
                    CURRENT FLOWER
                  </span>

                  <strong>
                    {selectedFlower}
                  </strong>

                </div>

                <div className="info-box">

                  <span>
                    FLOWERS PLACED
                  </span>

                  <strong>
                    {score.flowerCount}
                  </strong>

                </div>

                <div className="info-box">

                  <span>
                    HARMONY LEVEL
                  </span>

                  <strong>
                    {score.total}%
                  </strong>

                  <div className="score-bar">

                    <div
                      style={{
                        width:
                          `${score.total}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <div className="score-breakdown">

                  <span className="breakdown-title">
                    HARMONY ANALYSIS
                  </span>

                  <div className="breakdown-row">
                    <span>
                      SYMMETRY
                    </span>

                    <strong>
                      {score.symmetry}/40
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      VARIETY
                    </span>

                    <strong>
                      {score.variety}/20
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      STRUCTURE
                    </span>

                    <strong>
                      {score.structure}/20
                    </strong>
                  </div>

                  <div className="breakdown-row">
                    <span>
                      COMPOSITION
                    </span>

                    <strong>
                      {score.composition}/20
                    </strong>
                  </div>

                </div>

                <button
                  className="complete-button"
                  onClick={
                    completePookalam
                  }
                >

                  <Trophy size={17} />

                  COMPLETE POOKALAM

                </button>

                <button
                  className="reset-button"
                  onClick={
                    resetPookalam
                  }
                >

                  <RotateCcw size={15} />

                  CLEAR GARDEN

                </button>

              </aside>

            </section>
          )}

          {completed && (

            <section className="pookalam-complete">

              <div className="complete-icon">
                🌸
              </div>

              <span>
                MARTIAN BOTANICAL SYSTEM
              </span>

              <h2>
                POOKALAM
                <br />
                COMPLETE
              </h2>

              <div className="harmony-title">

                {score.perfect
                  ? "MAHABALI'S PERFECT POOKALAM"
                  : getHarmonyTitle(
                      score.total
                    )}

              </div>

              <p>
                Your Onam garden is ready
                for Thiruvonam 2150.
              </p>

              <div className="final-score">

                <span>
                  HARMONY SCORE
                </span>

                <strong>
                  {score.total}%
                </strong>

              </div>

              <div className="complete-actions">

                <button
                  className="complete-button"
                  onClick={
                    resetPookalam
                  }
                >

                  <RotateCcw size={17} />

                  CREATE AGAIN

                </button>

                <button
                  className="reset-button"
                  onClick={() =>
                    setScreen("colony")
                  }
                >

                  <ArrowLeft size={15} />

                  RETURN TO COLONY

                </button>

              </div>

            </section>
          )}

        </main>

      </div>
    );
  }

  /* =========================================
     VALLAM KALI - PHASE 6.2
  ========================================= */

  if (screen === "vallam") {
    const lanes = [0, 1, 2, 3, 4];

    const resetVallam = () => {
      setVallamLane(2);
      vallamLaneRef.current = 2;

      setVallamStarted(false);
      setVallamFinished(false);
      setVallamWon(false);
      setVallamWinnerName("");
      setVallamHit(false);
      setVallamHitCount(0);
      setVallamCollectedBoostTypes([]);
      setVallamActiveBoost(null);
      vallamActiveBoostRef.current = null;
      setVallamShield(0);
      vallamShieldRef.current = 0;

      const freshMeteors = createDynamicMeteors();
      setVallamMeteors(freshMeteors);
      vallamMeteorsRef.current = freshMeteors;

      setVallamProgress(0);
      vallamProgressRef.current = 0;

      const resetAIs = [
        { id: 1, name: "Neo Malabar", lane: 0, progress: 0, speed: 0.56, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
        { id: 2, name: "Vajra Varma", lane: 1, progress: 0, speed: 0.62, nextLaneChange: 0, direction: -1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
        { id: 3, name: "Keralon Prime", lane: 3, progress: 0, speed: 0.59, nextLaneChange: 0, direction: 1, boostMultiplier: 1, boostTimer: 0, boostedBy: [], activeBoost: null, shield: 0 },
      ];

      setVallamAIs(resetAIs);
      vallamAIsRef.current = resetAIs;

      setVallamOpponentProgress(0);
      vallamOpponentRef.current = 0;

      setVallamSpeed(1);
      vallamSpeedRef.current = 1;

      const resetBoosts = [
        { id: 1, progress: 18, lane: 1, type: "speed", collected: false },
        { id: 2, progress: 35, lane: 3, type: "shield", collected: false },
        { id: 3, progress: 52, lane: 0, type: "magnet", collected: false },
        { id: 4, progress: 69, lane: 4, type: "overdrive", collected: false },
        { id: 5, progress: 84, lane: 2, type: "speed", collected: false },
      ];

      vallamScoreRef.current = 0;
      vallamComboRef.current = 0;
      vallamBoostRef.current = 0;
      vallamBoostsRef.current = resetBoosts;

      setVallamScore(0);
      setVallamCombo(0);
      setVallamBoost(0);
      setVallamBoosts(resetBoosts);
    };

    const startVallam = () => {
      if (vallamFinished) {
        resetVallam();
      }

      setVallamStarted(true);
      setVallamFinished(false);
      setVallamWon(false);
    };

    return (
      <div className="app">
        <main className="vallam-screen">
          <div className="vallam-stars"></div>
          <div className="vallam-nebula"></div>

          <header className="vallam-header">
            <button
              className="return-button"
              onClick={() => {
                setScreen("colony");
                resetVallam();
              }}
            >
              <ArrowLeft size={18} />
              BACK TO COLONY
            </button>

            <div className="vallam-status">
              <CircleDot size={10} />
              ZERO-G ARENA • MARS COLONY 01
            </div>
          </header>

          <section className="vallam-main">
            <div className="vallam-heading">
              <span>THIRUVONAM PROTOCOL • YEAR 2150</span>

              <h1>
                ZERO-G
                <br />
                VALLAM KALI
              </h1>

              <p>
                Steer your Martian snake boat through the
                zero-gravity canal and beat the royal AI crew.
              </p>
            </div>

            <div className="vallam-hud">
              <div className="phase63-stat">
                <span>SCORE</span>
                <strong>{vallamScore}</strong>
              </div>

              <div className="phase63-stat">
                <span>COMBO</span>
                <strong>
                  x{Math.max(1, vallamCombo)}
                </strong>
              </div>

              <div className="phase63-stat boost-stat">
                <span>BOOST</span>
                <div className="boost-meter">
                  <div
                    style={{
                      width: `${vallamBoost}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <span>PROGRESS</span>
                <strong>
                  {Math.round(vallamProgress)}%
                </strong>
              </div>

              <div>
                <span>SPEED</span>
                <strong>
                  {vallamHit
                    ? "IMPACT"
                    : `${vallamSpeed.toFixed(1)}x`}
                </strong>
              </div>

              <div>
                <span>OPPONENT</span>
                <strong>
                  {Math.round(vallamOpponentProgress)}%
                </strong>
              </div>

              <div>
                <span>GRAVITY</span>
                <strong>0.38 G</strong>
              </div>

              <div className="phase63-stat difficulty-stat">
                <span>AI DIFFICULTY</span>
                <strong>{VALLAM_DIFFICULTIES[vallamDifficulty].label}</strong>
              </div>

              <div className="phase63-stat active-boost-stat">
                <span>ACTIVE BOOST</span>
                <strong>
                  {vallamActiveBoost
                    ? BOOST_TYPES[vallamActiveBoost]?.label
                    : vallamShield
                    ? "SHIELD READY"
                    : "NONE"}
                </strong>
              </div>
            </div>

            <div className="vallam-progress-track">
              <div
                className="vallam-progress-fill"
                style={{
                  width: `${vallamProgress}%`,
                }}
              ></div>
            </div>

            <div className="vallam-arena">
              <div className="arena-grid"></div>

              <div
                className="track-distance"
                style={{
                  left: `${Math.min(
                    92,
                    8 + vallamProgress * 0.84
                  )}%`,
                }}
              >
                <span>YOU</span>
              </div>

              <div
                className="opponent-distance"
                style={{
                  left: `${Math.min(
                    92,
                    8 + vallamOpponentProgress * 0.84
                  )}%`,
                }}
              >
                <span>AI</span>
              </div>

              <div className="finish-line">
                <span>FINISH</span>
              </div>

              {lanes.map((lane) => (
                <div
                  className="race-lane"
                  key={lane}
                >
                  <span className="lane-number">
                    0{lane + 1}
                  </span>

                  {vallamBoosts
                    .filter(
                      (boost) =>
                        boost.lane === lane &&
                        !boost.collected
                    )
                    .map((boost) => {
                      const boostInfo =
                        BOOST_TYPES[boost.type] ||
                        BOOST_TYPES.speed;

                      return (
                        <div
                          key={boost.id}
                          className={`vallam-boost boost-${boost.type}`}
                          style={{
                            left: `${Math.min(
                              82,
                              10 +
                                boost.progress *
                                  0.72
                            )}%`,
                          }}
                          title={boostInfo.label}
                        >
                          <span>{boostInfo.icon}</span>
                          <small>{boostInfo.label}</small>
                        </div>
                      );
                    })}
                </div>
              ))}

              {/* Boats are rendered directly on the arena so lane changes
                  can animate smoothly instead of jumping between lane DOM nodes. */}
              <div
                className={
                  vallamHit
                    ? "player-boat hit"
                    : vallamBoost > 0
                    ? "player-boat boosting"
                    : "player-boat"
                }
                style={{
                  left: `${Math.min(82, 10 + vallamProgress * 0.72)}%`,
                  top: `${10 + vallamLane * 20}%`,
                }}
              >
                <span className="boat-glow"></span>
                <span className="boat-body">🚣</span>
                <small>YOU</small>
              </div>

              {vallamAIs.map((bot) => (
                <div
                  key={bot.id}
                  className={`ai-boat ai-boat-${bot.id}${
                    bot.boostMultiplier > 1
                      ? " ai-boosting"
                      : ""
                  }`}
                  style={{
                    left: `${Math.min(82, 10 + bot.progress * 0.72)}%`,
                    top: `${10 + bot.lane * 20}%`,
                  }}
                >
                  <span className="boat-body">🚣</span>
                  <small>{bot.name}</small>
                </div>
              ))}

              {vallamMeteors.map((meteor) => (
                <div
                  key={meteor.id}
                  className="meteor dynamic-meteor"
                  style={{
                    left: `${Math.min(92, 8 + meteor.progress * 0.84)}%`,
                    top: `${meteor.lane * 20 + 10}%`,
                  }}
                >
                  {meteor.icon}
                </div>
              ))}

              {!vallamStarted && !vallamFinished && (
                <div className="race-overlay">
                  <div>
                    <span>ZERO-G RACE SYSTEM</span>
                    <strong>READY</strong>
                    <p>
                      Use ↑ / W and ↓ / S to change lanes.
                    </p>

                    <div className="difficulty-picker">
                      <span>AI DIFFICULTY</span>
                      <div>
                        {Object.entries(VALLAM_DIFFICULTIES).map(([key, config]) => (
                          <button
                            key={key}
                            className={vallamDifficulty === key ? "selected" : ""}
                            onClick={() => setVallamDifficulty(key)}
                          >
                            {config.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {vallamFinished && (
                <div className="race-overlay result">
                  <div>
                    <Trophy size={32} />

                    <span>
                      {vallamWon
                        ? "VICTORY"
                        : "RACE COMPLETE"}
                    </span>

                    <strong>
                      {vallamWinnerName || (
                        vallamWon
                          ? "MARS CREW"
                          : "ROYAL CREW"
                      )}
                    </strong>

                    <p>
                      {vallamWinnerName === "Mars Crew"
                        ? "Your Mars crew reached the finish first."
                        : `${vallamWinnerName || "Royal Crew"} reached the finish first.`}
                    </p>

                    <p>
                      Final distance:{" "}
                      {Math.round(vallamProgress)}%
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="vallam-controls">
              <div className="control-info">
                <span>
                  PHASE 6.4 • AI DIFFICULTY • BOOST TYPES • DYNAMIC METEORS
                </span>

                <strong>
                  {vallamHit
                    ? "METEOR IMPACT — SPEED REDUCED"
                    : vallamFinished
                    ? vallamWon
                      ? "RACE WON"
                      : "RACE LOST"
                    : vallamStarted
                    ? "RACE IN PROGRESS"
                    : "ARENA READY"}
                </strong>

                <p>
                  Choose your AI difficulty, dodge dynamic meteors, collect different boosts and reach the finish first.
                </p>
              </div>

              <div className="lane-controls">
                <button
                  onClick={() =>
                    setVallamLane(
                      (lane) => Math.max(0, lane - 1)
                    )
                  }
                  disabled={
                    !vallamStarted || vallamFinished
                  }
                  aria-label="Move boat up"
                >
                  ↑
                </button>

                <button
                  onClick={() =>
                    setVallamLane(
                      (lane) => Math.min(4, lane + 1)
                    )
                  }
                  disabled={
                    !vallamStarted || vallamFinished
                  }
                  aria-label="Move boat down"
                >
                  ↓
                </button>
              </div>

              <button
                className="start-race-button"
                onClick={startVallam}
              >
                <Waves size={18} />

                {vallamFinished
                  ? "RACE AGAIN"
                  : vallamStarted
                  ? "RACE IN PROGRESS"
                  : "START RACE"}
              </button>
            </div>
          </section>

          <footer className="vallam-footer">
            <span>SIGNAL: STABLE</span>
            <span>ARENA: MARTIAN CANAL 07</span>
            <span>ZERO-G SYSTEM: ONLINE</span>
            <span>CONTROLS: W / S</span>
          </footer>
        </main>
      </div>
    );
  }

  /* =========================================
     MAHABALI TRANSMISSION
  ========================================= */

  if (screen === "mahabali") {
    return (
      <div className="app">

        <main className="mahabali-screen">

          <div className="mahabali-stars"></div>

          <div className="mahabali-glow"></div>

          <header className="mahabali-header">

            <button
              className="return-button"
              onClick={() => {
                setScreen("colony");
                resetMahabali();
              }}
            >
              <ArrowLeft size={18} />

              BACK TO COLONY
            </button>

            <div className="mahabali-system">

              <CircleDot size={10} />

              LONG-RANGE TRANSMISSION ACTIVE

            </div>

          </header>

          {!mahabaliComplete ? (

            <section className="mahabali-content">

              <div className="mahabali-label">

                ROYAL TRANSMISSION

                <span>•</span>

                MARS COLONY 01

              </div>

              <div className="mahabali-hologram">

                <div className="hologram-ring ring-one"></div>

                <div className="hologram-ring ring-two"></div>

                <div className="hologram-ring ring-three"></div>

                <div className="mahabali-symbol">
                  <img
                    src="/hologram.png"
                    alt="Mahabali hologram"
                    className="mahabali-face"
                  />
                </div>

              </div>

              <div className="mahabali-name">

                <span>
                  INCOMING TRANSMISSION
                </span>

                <h1>
                  MAHABALI
                </h1>

                <p>
                  KING OF THE GOLDEN AGE
                </p>

              </div>

              <div className="mahabali-message">

                <span>
                  MAHABALI
                </span>

                {!mahabaliChoice ? (

                  <p>
                    "Welcome, traveler.
                    Even across the stars,
                    I hear the songs of Onam."
                  </p>

                ) : (

                  <p>
                    {mahabaliChoice === "roots"
                      ? "Then the roots of Onam still live within you. A tradition survives wherever people remember what it means."
                      : mahabaliChoice === "mars"
                      ? "You have carried the spirit of Onam beyond Earth. That is a journey even I could never have imagined."
                      : "Tradition grows when people give it new life. Perhaps this Martian Onam is exactly what the future needed."
                    }
                  </p>

                )}

              </div>

              {!mahabaliChoice ? (

                <div className="mahabali-question">

                  <span>
                    TRANSMISSION RESPONSE
                  </span>

                  <h2>
                    What does Onam mean
                    to you on Mars?
                  </h2>

                  <div className="mahabali-choices">

                    <button
                      onClick={() =>
                        chooseMahabaliResponse(
                          "roots"
                        )
                      }
                    >

                      <span>
                        01
                      </span>

                      WE REMEMBER OUR ROOTS

                    </button>

                    <button
                      onClick={() =>
                        chooseMahabaliResponse(
                          "mars"
                        )
                      }
                    >

                      <span>
                        02
                      </span>

                      WE BROUGHT ONAM TO MARS

                    </button>

                    <button
                      onClick={() =>
                        chooseMahabaliResponse(
                          "future"
                        )
                      }
                    >

                      <span>
                        03
                      </span>

                      WE CREATED SOMETHING NEW

                    </button>

                  </div>

                </div>

              ) : (

                <div className="mahabali-question">

                  <div className="transmission-complete">

                    <Sparkles size={22} />

                    <span>
                      TRANSMISSION RESPONSE RECEIVED
                    </span>

                  </div>

                  <button
                    className="complete-button"
                    onClick={
                      finishMahabali
                    }
                  >

                    <Trophy size={17} />

                    COMPLETE TRANSMISSION

                  </button>

                </div>

              )}

            </section>

          ) : (

            <section className="mahabali-complete">

              <div className="mahabali-complete-icon">
                👑
              </div>

              <span>
                ROYAL TRANSMISSION
              </span>

              <h2>
                CONNECTION
                <br />
                ESTABLISHED
              </h2>

              <p>
                Mahabali has received your
                message from Mars.
              </p>

              <div className="transmission-result">

                <Sparkles size={18} />

                <span>
                  ONAM LIVES BEYOND EARTH
                </span>

              </div>

              <div className="complete-actions">

                <button
                  className="complete-button"
                  onClick={() =>
                    setScreen("colony")
                  }
                >

                  <ArrowLeft size={17} />

                  RETURN TO COLONY

                </button>

                <button
                  className="reset-button"
                  onClick={
                    resetMahabali
                  }
                >

                  <RotateCcw size={15} />

                  TRANSMIT AGAIN

                </button>

              </div>

            </section>

          )}

          <footer className="mahabali-footer">

            <span>
              SIGNAL: STABLE
            </span>

            <span>
              DISTANCE: 225,000,000 KM
            </span>

            <span>
              TRANSMISSION: ENCRYPTED
            </span>

          </footer>

        </main>

      </div>
    );
  }

  /* =========================================
     PHASE 7.4 — THIRUVONAM 2150 FINALE
  ========================================= */

  if (screen === "finale" && harmonyIndex >= 90) {
    const finaleAchievements =
      unlockedAchievements.length;

    return (
      <div className="app">
        <main className="festival-finale">
          <div className="finale-stars"></div>
          <div className="finale-glow finale-glow-one"></div>
          <div className="finale-glow finale-glow-two"></div>

          <header className="finale-header">
            <button
              className="return-button"
              onClick={() => setScreen("colony")}
            >
              <ArrowLeft size={18} />
              BACK TO COLONY
            </button>

            <div className="finale-system">
              <Sparkles size={13} />
              THIRUVONAM PROTOCOL • FINAL CELEBRATION
            </div>
          </header>

          <section className="finale-content">
            <div className="finale-eyebrow">
              MARS COLONY 01 • 08.21.2150
            </div>

            <div className="finale-emblem">
              <div className="finale-ring finale-ring-one"></div>
              <div className="finale-ring finale-ring-two"></div>
              <div className="finale-lotus">🪷</div>
            </div>

            <span className="finale-kicker">
              THE FESTIVAL HAS COME TO MARS
            </span>

            <h1>
              THIRUVONAM
              <br />
              <span>2150</span>
            </h1>

            <div className="finale-complete-label">
              <span></span>
              COLONY FESTIVAL STATUS
              <strong>COMPLETE</strong>
              <span></span>
            </div>

            <p className="finale-message">
              The traditions of Earth have found a new home among
              the stars. Your choices brought the Martian colony
              together for its first Thiruvonam.
            </p>

            <div className="finale-harmony-card">
              <div className="finale-score-block">
                <span>FINAL HARMONY INDEX</span>
                <strong>{harmonyIndex}%</strong>
                <small>EXCEPTIONAL COLONY HARMONY</small>
              </div>

              <div className="finale-score-line">
                <div style={{ width: `${harmonyIndex}%` }}></div>
              </div>

              <div className="finale-activity-grid">
                <div>
                  <span>🌸 POOKALAM</span>
                  <strong>{globalProgress.pookalam}%</strong>
                </div>
                <div>
                  <span>🍛 SADYA</span>
                  <strong>{globalProgress.sadya}%</strong>
                </div>
                <div>
                  <span>👑 MAHABALI</span>
                  <strong>{globalProgress.mahabali}%</strong>
                </div>
                <div>
                  <span>🚣 VALLAM KALI</span>
                  <strong>{globalProgress.vallam}%</strong>
                </div>
              </div>
            </div>

            <div className="finale-mahabali">
              <div className="finale-crown">👑</div>
              <div>
                <span>FINAL ROYAL TRANSMISSION</span>
                <p>
                  “Wherever people gather with love,
                  that place becomes home.”
                </p>
                <small>— MAHABALI</small>
              </div>
            </div>

            <div className="finale-stats">
              <div>
                <Trophy size={17} />
                <span>
                  <strong>{finaleAchievements}/{ACHIEVEMENTS.length}</strong>
                  ACHIEVEMENTS
                </span>
              </div>

              <div>
                <Flower2 size={17} />
                <span>
                  <strong>4</strong>
                  FESTIVAL TRADITIONS
                </span>
              </div>

              <div>
                <Satellite size={17} />
                <span>
                  <strong>STABLE</strong>
                  COLONY STATUS
                </span>
              </div>
            </div>

            <div className="finale-actions">
              <button
                className="finale-primary-button"
                onClick={() => setScreen("colony")}
              >
                <ArrowLeft size={17} />
                RETURN TO COLONY
              </button>

              <button
                className="finale-secondary-button"
                onClick={() => setScreen("achievements")}
              >
                <Trophy size={16} />
                VIEW ACHIEVEMENTS
                <ChevronRight size={16} />
              </button>
            </div>

            <p className="finale-footer-quote">
              MARS COLONY 01 • ONAM LIVES BEYOND EARTH
            </p>
          </section>
        </main>
      </div>
    );
  }

  /* =========================================
     MARS COLONY
  ========================================= */

  return (
    <div className="app">

      <main className={`colony colony-${colonyState.key}`}>

        <div className="colony-grid"></div>

        <div className="colony-glow"></div>

        <header className="colony-header">

          <button
            className="return-button"
            onClick={() =>
              setEntered(false)
            }
          >
            <ArrowLeft size={18} />

            EXIT COLONY
          </button>

          <div className="colony-title">

            <span className="system-status">

              <CircleDot size={10} />

              SYSTEM ONLINE

            </span>

            <h1>
              MARS COLONY 01
            </h1>

            <p>
              THIRUVONAM PROTOCOL • YEAR 2150
            </p>

          </div>

          <div className="colony-status">

            <Satellite size={18} />

            <div>

              <span>
                EARTH LINK
              </span>

              <strong>
                CONNECTED
              </strong>

            </div>

          </div>

        </header>

        <section className="colony-main">

          <div className="welcome-text">

            <span>
              08.21.2150
            </span>

            <h2>
              THIRUVONAM
              <br />
              HAS ARRIVED.
            </h2>

            <p>
              Welcome to the first Martian
              celebration of Onam. Explore
              the colony and create your own
              version of the festival.
            </p>

          </div>

          <section className="harmony-dashboard">
            <div className="harmony-dashboard-header">
              <div>
                <span>MARS 2150 • COLONY HARMONY SYSTEM</span>
                <h3>HARMONY INDEX</h3>
              </div>

              <div className="harmony-total">
                <strong>{harmonyIndex}%</strong>
                <small>
                  {harmonyIndex >= 90
                    ? "EXCEPTIONAL"
                    : harmonyIndex >= 75
                    ? "THRIVING"
                    : harmonyIndex >= 50
                    ? "STABLE"
                    : "AWAITING FESTIVAL"}
                </small>
              </div>
            </div>

            <div className="harmony-progress-track">
              <div
                className="harmony-progress-fill"
                style={{
                  width: `${harmonyIndex}%`,
                }}
              />
            </div>

            <div className="harmony-activities">
              <div className="harmony-activity">
                <span>🌸 POOKALAM</span>
                <strong>{globalProgress.pookalam}%</strong>
              </div>

              <div className="harmony-activity">
                <span>🍛 SADYA</span>
                <strong>{globalProgress.sadya}%</strong>
              </div>

              <div className="harmony-activity">
                <span>👑 MAHABALI</span>
                <strong>{globalProgress.mahabali}%</strong>
              </div>

              <div className="harmony-activity">
                <span>🚣 VALLAM KALI</span>
                <strong>{globalProgress.vallam}%</strong>
              </div>
            </div>
          </section>

          <section className="colony-reactivity-panel">
            <div className="colony-reactivity-indicator">
              <span className="reactivity-pulse"></span>
              COLONY RESPONSE SYSTEM
            </div>

            <div className="colony-reactivity-content">
              <div>
                <span>COLONY STATUS</span>
                <strong>{colonyState.label}</strong>
              </div>

              <p>{colonyState.message}</p>
              <small>{colonyState.subtext}</small>
            </div>
          </section>

          <button
            className="achievements-button"
            onClick={() => setScreen("achievements")}
          >
            <Trophy size={17} />
            <span>
              <strong>ACHIEVEMENTS</strong>
              <small>
                {unlockedAchievements.length} / {ACHIEVEMENTS.length} UNLOCKED
              </small>
            </span>
            <ChevronRight size={17} />
          </button>

          {harmonyIndex >= 90 && (
            <button
              className="finale-unlock-button"
              onClick={() => setScreen("finale")}
            >
              <Sparkles size={18} />
              <span>
                <strong>THIRUVONAM 2150 FINALE</strong>
                <small>THE FESTIVAL IS COMPLETE • ENTER CELEBRATION</small>
              </span>
              <ChevronRight size={18} />
            </button>
          )}

          <div className="location-grid">

            {locations.map(
              (location) => {

                const Icon =
                  location.icon;

                return (

                  <button
                    key={location.id}
                    className={
                      `location-card ${
                        selectedLocation ===
                        location.id
                          ? "selected"
                          : ""
                      }`
                    }
                    onClick={() => {

                      if (
                        location.id ===
                        "pookalam"
                      ) {

                        setScreen(
                          "pookalam"
                        );

                        setSelectedLocation(
                          null
                        );

                      } else if (
                        location.id ===
                        "sadya"
                      ) {

                        setScreen(
                          "sadya"
                        );

                        setSelectedLocation(
                          null
                        );

                      } else if (
                        location.id ===
                        "vallam"
                      ) {

                        setScreen("vallam");
                        setSelectedLocation(null);

                      } else if (
                        location.id ===
                        "mahabali"
                      ) {

                        setScreen(
                          "mahabali"
                        );

                        setSelectedLocation(
                          null
                        );

                      }

                    }}
                  >

                    <div className="card-top">

                      <div className="location-icon">

                        <Icon size={25} />

                      </div>

                      <span className="card-status">

                        {getReactiveLocationStatus(location)}

                      </span>

                    </div>

                    <div className="card-content">

                      <h3>
                        {location.title}
                      </h3>

                      <span>
                        {location.subtitle}
                      </span>

                      <div className="location-progress">
                          <div>
                            <span>COLONY CONTRIBUTION</span>
                            <strong>{globalProgress[location.id] || 0}%</strong>
                          </div>
                          <div className="location-progress-track">
                            <span
                              style={{
                                width: `${globalProgress[location.id] || 0}%`,
                              }}
                            />
                          </div>
                      </div>

                      <p>
                        {location.description}
                      </p>

                    </div>

                    <div className="card-arrow">

                      <ChevronRight size={18} />

                    </div>

                  </button>
                );
              }
            )}

          </div>

        </section>

        {selectedLocation && (

          <div className="location-panel">

            {(() => {

              const location =
                locations.find(
                  (item) =>
                    item.id ===
                    selectedLocation
                );

              const Icon =
                location.icon;

              return (
                <>
                  <div className="panel-icon">

                    <Icon size={24} />

                  </div>

                  <div>

                    <span>
                      SELECTED DESTINATION
                    </span>

                    <h3>
                      {location.title}
                    </h3>

                  </div>

                  <p>
                    This module will become
                    interactive in the next
                    development phase.
                  </p>

                  <button
                    onClick={() =>
                      setSelectedLocation(null)
                    }
                  >
                    CLOSE
                  </button>
                </>
              );

            })()}

          </div>
        )}

        <footer className="colony-footer">

          <span>
            MARS COLONY 01
          </span>

          <span>
            POPULATION: 18,742
          </span>

          <span>
            OXYGEN: 98.7%
          </span>

          <span>
            EARTH LINK: STABLE
          </span>

          <span>
            THIRUVONAM: ACTIVE
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;