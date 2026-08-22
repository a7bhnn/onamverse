import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, Shield, ShieldAlert, ArrowRight } from 'lucide-react';

const universes = [
  {
    id: 'martian',
    title: 'MARTIAN ONAM',
    subtitle: 'COLONY 01 • 2150',
    desc: 'Red dust pookkalams, biometric hydroponic dome feasts, and zero-gravity rover race canals.',
    badge: 'ACTIVE PROTOCOL',
    icon: Rocket,
    color: 'from-red-500/20 via-orange-500/10 to-transparent',
    borderColor: 'border-red-500/40 hover:border-red-500',
    glow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]',
    textColor: 'text-red-500',
    buttonBg: 'bg-red-500 hover:bg-red-600 text-black',
  },
  {
    id: 'earth-616', // Updated ID
    title: 'EARTH-616',
    subtitle: 'MARVEL CINEMATIC UNIVERSE',
    desc: 'Experience Onam in the Marvel Cinematic Universe!', // Requested caption
    badge: 'AVENGERS ASSEMBLE',
    icon: Shield,
    color: 'from-amber-500/20 via-red-500/10 to-transparent',
    borderColor: 'border-amber-400/40 hover:border-amber-400',
    glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]',
    textColor: 'text-amber-400',
    buttonBg: 'bg-amber-400 hover:bg-amber-500 text-black',
  },
  {
    id: 'ghibli',
    title: 'THE ANIMAL FOREST',
    subtitle: 'EARTH SANCTUARY • PROTOCOL 9',
    desc: 'Zero human footprint. Pure wildlife synchronizing the ancient harvest traditions of the woods.',
    badge: 'STABLE',
    icon: Sparkles,
    color: 'from-emerald-500/20 via-green-500/10 to-transparent',
    borderColor: 'border-emerald-400/40 hover:border-emerald-400',
    glow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.4)]',
    textColor: 'text-emerald-400',
    buttonBg: 'bg-emerald-400 hover:bg-emerald-500 text-black',
  }
];

export default function App() {
  const [showPortal, setShowPortal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isWarping, setIsWarping] = useState(false);
  const navigate = useNavigate();

  const handleEnterUniverse = (universeId) => {
    setIsWarping(true);
    setTimeout(() => {
      if (universeId === 'martian') {
        navigate('/martian-loading');
      } else {
        // For Earth-616 or Ghibli, you can route them accordingly or create their screens next!
        navigate(`/${universeId}`);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden relative selection:bg-orange-500 selection:text-white">
      
      {/* Sci-Fi Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/20 via-black to-black pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #f97316 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <AnimatePresence mode="wait">

        {!showPortal ? (
          /* ================= PROCEDURAL DOCTOR STRANGE PORTAL ================= */
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.6, filter: "blur(15px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center cursor-pointer min-h-screen w-full z-10 group relative"
            onClick={() => setShowPortal(true)}
          >
            {/* PROCEDURAL FIERY SLING-RING PORTAL BACKDROP */}
            <div className="absolute flex items-center justify-center pointer-events-none z-0">
              
              {/* Outer Spiky Magma Energy Ring */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.02, 1] }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="w-[340px] h-[340px] md:w-[600px] md:h-[600px] rounded-full border-[8px] border-dashed border-orange-500/80 shadow-[0_0_100px_rgba(249,115,22,0.9),inset_0_0_60px_rgba(234,88,12,0.7)] absolute"
              />

              {/* Inner Swirling Fire Storm Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="w-[300px] h-[300px] md:w-[540px] md:h-[540px] rounded-full border-4 border-yellow-400/60 shadow-[0_0_70px_rgba(234,179,8,0.8)] absolute bg-gradient-to-tr from-red-600/40 via-orange-500/30 to-yellow-400/40 blur-[1px]"
              />

              {/* Core Universe Peek-through Window */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1 }}
                className="w-[260px] h-[260px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden absolute shadow-[inset_0_0_90px_rgba(0,0,0,0.95)] bg-black/60"
              >
                <img 
                  src="/mars.png" 
                  alt="Universe View" 
                  className="w-full h-full object-cover opacity-60 scale-125 animate-pulse filter saturate-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 border border-orange-500/40 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                <ShieldAlert size={14} className="text-yellow-400 animate-pulse" />
                <span className="text-xs tracking-[0.25em] text-orange-300 uppercase">Thiruvonam Interstellar Protocol</span>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-9xl font-black tracking-[0.15em] uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-orange-400 to-red-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]"
              >
                Onamverse
              </motion.h1>

              <motion.p 
                className="text-sm md:text-base text-slate-300 tracking-[0.4em] uppercase mb-12 max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              >
                Transcending planetary bounds. Experience ancestral celebration across multiverse dimensions.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-black font-bold tracking-[0.2em] uppercase shadow-[0_0_35px_rgba(245,158,11,0.6)] flex items-center space-x-3 group-hover:shadow-[0_0_55px_rgba(249,115,22,0.9)] transition-all duration-300"
              >
                <span>Initialize Portal</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>
          </motion.div>

        ) : (

          /* ================= CHOOSE UNIVERSE PORTAL ================= */
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={isWarping ? { opacity: 0, scale: 1.4, filter: "blur(12px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-7xl flex flex-col items-center z-10 py-12"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-xs text-orange-400 tracking-[0.3em] uppercase block mb-3">Dimensional Gateway Active</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-wider uppercase text-white mb-4">
                Choose Your Universe
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {universes.map((u, i) => {
                const IconComponent = u.icon;
                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 100 }}
                    onHoverStart={() => setSelected(u.id)}
                    onHoverEnd={() => setSelected(null)}
                    className={`relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border ${u.borderColor} transition-all duration-500 cursor-pointer ${u.glow} flex flex-col justify-between overflow-hidden group`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${u.color} opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${u.textColor}`}>
                          <IconComponent size={24} />
                        </div>
                        <span className="text-[10px] tracking-[0.2em] px-3 py-1 rounded-full bg-black/40 border border-white/10 text-slate-300">
                          {u.badge}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 tracking-[0.2em] block mb-1">{u.subtitle}</span>
                      <h3 className="text-2xl md:text-3xl font-black tracking-wide mb-4 text-white group-hover:text-yellow-400 transition-colors">
                        {u.title}
                      </h3>

                      <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed min-h-[72px]">
                        {u.desc}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleEnterUniverse(u.id)}
                      className={`relative z-10 w-full py-4 rounded-xl text-center font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                        selected === u.id 
                          ? `${u.buttonBg} shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-[1.02]` 
                          : 'bg-black/60 border border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      <span>Initialize Link</span>
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}