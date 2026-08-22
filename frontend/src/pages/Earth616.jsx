import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Utensils,
  Flower2,
  Waves,
  ArrowLeft,
  RotateCcw,
  CircleDot,
  Terminal,
} from "lucide-react";

/* =========================================
   INFINITY POOKKALAM SCORING
========================================= */
function calculateMCUHarmony(board) {
  const size = 7;
  const flowerCount = board.filter((f) => f !== null).length;

  const perfectPattern = [
    null, null, "⚡", "💎", "⚡", null, null,
    null, "⚡", "🔴", "🔴", "🔴", "⚡", null,
    "⚡", "🔴", "💎", "🔴", "💎", "🔴", "⚡",
    "💎", "🔴", "🔴", "🌌", "🔴", "🔴", "💎",
    "⚡", "🔴", "💎", "🔴", "💎", "🔴", "⚡",
    null, "⚡", "🔴", "🔴", "🔴", "⚡", null,
    null, null, "⚡", "💎", "⚡", null, null,
  ];

  const isPerfect =
    board.length === perfectPattern.length &&
    board.every((flower, index) => flower === perfectPattern[index]);

  if (isPerfect) {
    return { total: 100, infinityBonus: true, flowerCount };
  }

  let symmetryMatches = 0;
  let symmetryChecks = 0;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < 3; col++) {
      const current = board[row * size + col];
      const mirror = board[row * size + (size - 1 - col)];

      if (current !== null || mirror !== null) {
        symmetryChecks++;
        if (current !== null && current === mirror) {
          symmetryMatches++;
        }
      }
    }
  }

  const symmetry = symmetryChecks === 0 ? 0 : Math.round((symmetryMatches / symmetryChecks) * 60);
  const variety = Math.min(40, new Set(board.filter(Boolean)).size * 10);
  const total = Math.min(100, symmetry + variety);

  return { total, flowerCount, infinityBonus: false };
}

/* =========================================
   STARK TECH SADYA SCORING
========================================= */
function calculateMCUSadya(items) {
  if (items.length === 0) return { total: 0 };
  const score = Math.min(100, items.length * 16.6);
  return { total: Math.round(score) };
}

export default function Earth616() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("nexus"); 
  const [terminalLog] = useState([
    "INITIALIZING STARK-SHIELD NEXUS PROTOCOL...",
    "MULTIVERSE ANOMALY DETECTED: THIRUVONAM TIMELINE STABLE.",
    "WELCOME, AVENGER. SELECT YOUR MODULE.",
  ]);

  /* Pookalam State */
  const [selectedPetal, setSelectedPetal] = useState("💎");
  const [pookalamBoard, setPookalamBoard] = useState(Array(49).fill(null));
  const pookalamScore = calculateMCUHarmony(pookalamBoard);

  /* Sadya State */
  const [sadyaItems, setSadyaItems] = useState([]);
  const sadyaScore = calculateMCUSadya(sadyaItems);

  /* Bifrost Race State */
  const [raceStarted, setRaceStarted] = useState(false);
  const [avengerProgress, setAvengerProgress] = useState(0);
  const [thanosProgress, setThanosProgress] = useState(0);
  const [raceWon, setRaceWon] = useState(null);

  /* Doomsday Clock — countdown to December 18, 2026 at 00:00:00 (local time) */
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-12-18T00:00:00").getTime();

    const updateCountdown = () => {
      const remaining = Math.max(0, target - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);

      setCountdown({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const mcuFlowers = [
    { emoji: "💎", name: "Reality Stone Petal" },
    { emoji: "⚡", name: "Arc Reactor Bloom" },
    { emoji: "🔴", name: "Vibranium Blossom" },
    { emoji: "🌌", name: "Space Tesseract" },
  ];

  const mcuDishes = [
    { id: "rice", emoji: "🍚", name: "VIBRANIUM BASMATI", type: "MAIN" },
    { id: "sambar", emoji: "🥣", name: "ARC REACTOR SAMBAR", type: "CURRY" },
    { id: "avial", emoji: "🥗", name: "ASGARDIAN AVIAL", type: "VEGETABLE" },
    { id: "thoran", emoji: "🥦", name: "GAMMA THORAN", type: "VEGETABLE" },
    { id: "payasam", emoji: "🍮", name: "QUANTUM PAYASAM", type: "DESSERT" },
    { id: "pappadam", emoji: "🫓", name: "CAPTAIN'S SHIELD PAPPADAM", type: "SIDE" },
  ];

  /* Bifrost Race Loop */
  useEffect(() => {
    if (!raceStarted || raceWon !== null) return;

    const interval = setInterval(() => {
      setAvengerProgress((prev) => {
        if (prev >= 100) {
          setRaceWon(true);
          return 100;
        }
        return prev + Math.random() * 2.5;
      });

      setThanosProgress((prev) => {
        if (prev >= 100) {
          setRaceWon(false);
          return 100;
        }
        return prev + Math.random() * 2.3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [raceStarted, raceWon]);

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 font-mono relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* =========================================
         HERO ART — TWO SEPARATE TRANSPARENT PNGs
         /maveli.png = Maveli on the left
         /doom.png   = Doctor Doom on the right
         The PNG canvases are intentionally NOT stretched or cropped.
         Each image keeps its natural aspect ratio and is positioned
         toward its side, leaving a clean central gap for the clock.
      ========================================= */}
      {screen === "nexus" && (
        <div className="absolute inset-x-0 top-[80px] h-[650px] pointer-events-none z-0 overflow-hidden">

          {/* MAVELI — LEFT */}
          <div
            className="absolute left-0 top-0 h-full w-[52%] overflow-hidden opacity-90"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 78%, rgba(0,0,0,0.72) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 78%, rgba(0,0,0,0.72) 88%, transparent 100%)",
            }}
          >
            <img
              src="/maveli.png"
              alt="Maveli"
              className="absolute top-1/2 left-[-16vw] -translate-y-1/2 max-w-none w-[92vw] h-auto"
              style={{
                filter:
                  "contrast(1.08) brightness(0.84) drop-shadow(0 0 25px rgba(6,182,212,0.12))",
              }}
            />
          </div>

          {/* DOCTOR DOOM — RIGHT */}
          <div
            className="absolute right-0 top-0 h-full w-[52%] overflow-hidden opacity-90"
            style={{
              maskImage:
                "linear-gradient(to left, black 0%, black 78%, rgba(0,0,0,0.72) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, black 78%, rgba(0,0,0,0.72) 88%, transparent 100%)",
            }}
          >
            <img
              src="/doom.png"
              alt="Doctor Doom"
              className="absolute top-1/2 right-[-16vw] -translate-y-1/2 max-w-none w-[92vw] h-auto"
              style={{
                filter:
                  "contrast(1.08) brightness(0.84) drop-shadow(0 0 25px rgba(6,182,212,0.12))",
              }}
            />
          </div>

          {/* Extra dark separation between the two characters */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[180px]"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(2,6,23,0.62) 45%, rgba(2,6,23,0.62) 55%, transparent 100%)",
            }}
          />

          {/* Fade the artwork naturally into the page at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />

          {/* =========================================
             DOOMSDAY CLOCK — CENTER
          ========================================= */}
          <div className="absolute left-1/2 top-[285px] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">

            <div className="text-[9px] md:text-[10px] tracking-[0.45em] text-emerald-400 uppercase mb-2 animate-pulse whitespace-nowrap">
              MULTIVERSE COLLAPSE PROTOCOL
            </div>

            <div className="px-9 py-5 rounded-2xl border border-emerald-500/40 bg-black/85 backdrop-blur-xl shadow-[0_0_45px_rgba(16,185,129,0.2)] min-w-[390px]">

              <div className="text-center text-[8px] tracking-[0.45em] text-emerald-400 mb-2">
                DOOMSDAY CLOCK
              </div>

              <div className="text-center text-4xl md:text-5xl font-black tracking-[0.12em] text-emerald-400 font-mono drop-shadow-[0_0_12px_rgba(16,185,129,0.85)]">
                {`${countdown.days}:${String(countdown.hours).padStart(2, "0")}:${String(countdown.minutes).padStart(2, "0")}:${String(countdown.seconds).padStart(2, "0")}`}
              </div>

              <div className="text-center mt-2 text-[8px] tracking-[0.3em] text-slate-500">
                EARTH-616 COLLAPSE • 18 DEC 2026
              </div>

              <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Background Stark HUD Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950/70 to-black pointer-events-none z-0"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* ================= TOP NAVBAR ================= */}
      <header className="relative z-20 flex items-center justify-between p-6 border-b border-cyan-500/30 bg-black/40 backdrop-blur-md">
        <button
          onClick={() => {
            if (screen === "nexus") navigate("/");
            else setScreen("nexus");
          }}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs tracking-widest uppercase cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{screen === "nexus" ? "Return to Portal" : "Avengers Command"}</span>
        </button>

        <div className="flex items-center space-x-3">
          <Shield className="text-amber-400 animate-pulse" size={20} />
          <span className="text-xs md:text-sm tracking-[0.3em] text-white font-bold uppercase">
            Earth-616 • Avengers Onam Protocol
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-cyan-500">
          <CircleDot size={10} className="text-emerald-400 animate-ping" />
          <span className="hidden md:inline">NEXUS LINK: STABLE</span>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-[700px] pb-16">

        {/* ================= 1. NEXUS HUB SCREEN ================= */}
        {screen === "nexus" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center relative">
            
            <div className="text-center mb-12 relative z-10">
              <span className="text-xs text-amber-400 tracking-[0.4em] uppercase block mb-3">Stark Industries & Asgardian Collaboration</span>
              <h1 className="text-4xl md:text-7xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-white drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                The Avengers Feast
              </h1>
              <p className="text-slate-300 tracking-[0.2em] mt-4 max-w-xl mx-auto text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Multiverse barriers have dissolved. Experience Thiruvonam integrated with Stark nanotechnology, Infinity geometry, and the Bifrost stream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12 relative z-10">
              
              <div 
                onClick={() => setScreen("pookalam")}
                className="group p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Flower2 size={28} />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-amber-400 block mb-1">MODULE 01</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Infinity Pookalam</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Arrange quantum petals and reality stones to calibrate cosmic geometry harmony.
                  </p>
                </div>
                <div className="py-3 px-4 rounded-xl bg-black/60 border border-cyan-500/20 text-center text-xs tracking-widest uppercase group-hover:bg-cyan-500 group-hover:text-black transition-colors font-bold">
                  Launch Holo-Grid →
                </div>
              </div>

              <div 
                onClick={() => setScreen("sadya")}
                className="group p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                    <Utensils size={28} />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-cyan-400 block mb-1">MODULE 02</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Vibranium Sadya</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Synthesize molecular banana-leaf feasts engineered for Earth's Mightiest Heroes.
                  </p>
                </div>
                <div className="py-3 px-4 rounded-xl bg-black/60 border border-amber-500/20 text-center text-xs tracking-widest uppercase group-hover:bg-amber-400 group-hover:text-black transition-colors font-bold">
                  Open Kitchen HUD →
                </div>
              </div>

              <div 
                onClick={() => setScreen("bifrost")}
                className="group p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                    <Waves size={28} />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-amber-400 block mb-1">MODULE 03</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Bifrost Boat Race</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Race an Asgardian snake boat across the rainbow bridge canal against cosmic opposition.
                  </p>
                </div>
                <div className="py-3 px-4 rounded-xl bg-black/60 border border-emerald-500/20 text-center text-xs tracking-widest uppercase group-hover:bg-emerald-400 group-hover:text-black transition-colors font-bold">
                  Engage Thrusters →
                </div>
              </div>

            </div>

            <div className="w-full max-w-3xl p-6 rounded-2xl bg-black/95 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative z-10">
              <div className="flex items-center space-x-2 text-xs text-cyan-500 mb-3 pb-2 border-b border-cyan-500/20">
                <Terminal size={14} />
                <span>STARK_OS_DIAGNOSTICS // LIVE FEED</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                {terminalLog.map((log, idx) => (
                  <p key={idx} className="font-mono">&gt; {log}</p>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ================= 2. INFINITY POOKALAM LAB ================= */}
        {screen === "pookalam" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            
            <div className="text-center mb-8">
              <span className="text-xs text-cyan-400 tracking-[0.3em] uppercase">Cosmic Calibration Grid</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase mt-1">Infinity Pookalam</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full max-w-5xl">
              
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Select Energy Petal</h3>
                  <div className="space-y-3">
                    {mcuFlowers.map((f) => (
                      <button
                        key={f.emoji}
                        onClick={() => setSelectedPetal(f.emoji)}
                        className={`w-full p-3 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                          selectedPetal === f.emoji
                            ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-white"
                            : "bg-black/40 border-slate-800 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <span className="text-2xl">{f.emoji}</span>
                        <div className="text-left">
                          <strong className="block text-xs uppercase">{f.name}</strong>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-black/60 border border-cyan-500/20 text-center">
                  <span className="text-xs text-slate-400 block mb-1">HARMONY INDEX</span>
                  <strong className="text-2xl text-cyan-400">{pookalamScore.total}%</strong>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex flex-col items-center justify-center">
                <div className="grid grid-cols-7 gap-2 max-w-md w-full aspect-square">
                  {pookalamBoard.map((cell, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const updated = [...pookalamBoard];
                        updated[idx] = updated[idx] === null ? selectedPetal : null;
                        setPookalamBoard(updated);
                      }}
                      className={`aspect-square rounded-xl border flex items-center justify-center text-xl transition-all cursor-pointer ${
                        cell !== null
                          ? "bg-cyan-500/30 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-95"
                          : "bg-black/50 border-slate-800 hover:border-cyan-500/50"
                      }`}
                    >
                      {cell}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setPookalamBoard(Array(49).fill(null))}
                    className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all text-xs font-bold uppercase tracking-widest flex items-center space-x-2 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Purge Matrix</span>
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ================= 3. VIBRANIUM SADYA KITCHEN ================= */}
        {screen === "sadya" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            
            <div className="text-center mb-8">
              <span className="text-xs text-amber-400 tracking-[0.3em] uppercase">Stark Molecular Synthesizer</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase mt-1">Vibranium Sadya Feast</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Available Ingredients</h3>
                <div className="space-y-3">
                  {mcuDishes.map((dish) => {
                    const added = sadyaItems.some((item) => item.id === dish.id);
                    return (
                      <button
                        key={dish.id}
                        onClick={() => {
                          if (added) setSadyaItems(sadyaItems.filter((i) => i.id !== dish.id));
                          else setSadyaItems([...sadyaItems, dish]);
                        }}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          added
                            ? "bg-amber-500/20 border-amber-400 text-white"
                            : "bg-black/40 border-slate-800 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{dish.emoji}</span>
                          <span className="text-xs font-bold uppercase">{dish.name}</span>
                        </div>
                        <span className="text-xs font-bold">{added ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Holographic Leaf Array</h3>
                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 min-h-[220px] flex flex-wrap gap-3 items-center content-start">
                    {sadyaItems.length === 0 ? (
                      <p className="text-xs text-slate-500 uppercase tracking-widest m-auto">No dishes synthesized yet...</p>
                    ) : (
                      sadyaItems.map((item) => (
                        <div key={item.id} className="px-3 py-2 rounded-xl bg-black/60 border border-amber-500/40 text-xs flex items-center space-x-2">
                          <span>{item.emoji}</span>
                          <span className="text-white font-bold">{item.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-black/60 border border-amber-500/20">
                  <span className="text-xs text-slate-400 uppercase">Feast Calibration Score</span>
                  <strong className="text-xl text-amber-400">{sadyaScore.total}%</strong>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ================= 4. BIFROST BOAT RACE ================= */}
        {screen === "bifrost" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            
            <div className="text-center mb-8">
              <span className="text-xs text-emerald-400 tracking-[0.3em] uppercase">Asgardian Space-Time Canal</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase mt-1">Bifrost Vallam Kali</h2>
            </div>

            <div className="w-full max-w-4xl p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30">
              
              <div className="space-y-8 mb-8">
                
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2 uppercase">
                    <span>AVENGERS FLAGSHIP (YOU)</span>
                    <span>{Math.round(avengerProgress)}%</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-black/60 border border-cyan-500/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-100" style={{ width: `${avengerProgress}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2 uppercase">
                    <span>THANOS DREADNOUGHT (BOT)</span>
                    <span>{Math.round(thanosProgress)}%</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-black/60 border border-red-500/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-100" style={{ width: `${thanosProgress}%` }}></div>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <span className="text-xs text-slate-400 uppercase">
                  {raceStarted ? (raceWon !== null ? (raceWon ? "VICTORY! ASGARD REJOICES." : "DEFEAT! THANOS CLAIMED THE FINISH.") : "RACE IN PROGRESS...") : "READY TO ENGAGE BIFROST DRIVE"}
                </span>

                <button
                  onClick={() => {
                    if (raceWon !== null) {
                      setAvengerProgress(0);
                      setThanosProgress(0);
                      setRaceWon(null);
                    }
                    setRaceStarted(true);
                  }}
                  className="px-8 py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all cursor-pointer"
                >
                  {raceWon !== null ? "Replay Race" : raceStarted ? "Boosting..." : "Start Bifrost Race"}
                </button>
              </div>

            </div>

          </motion.div>
        )}

      </main>

    </div>
  );
}