import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const universes = [
  {
    id: 'martian',
    title: 'Martian Onam',
    desc: 'Red dust pookkalams, dome habitats, and rover races.',
    glow: 'hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]', // Martian Red glow
    border: 'border-red-500/50',
    bg: "bg-[url('/assets/martian.jpg')]"
  },
  {
    id: 'underwater',
    title: 'Deep Sea Sadya',
    desc: 'Gravity-defying physics, bioluminescence, and floating feasts.',
    glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]',
    border: 'border-cyan-400/30',
  },
  {
    id: 'ghibli',
    title: 'The Animal Forest',
    desc: 'No humans. Just wildlife preparing the ultimate Onam.',
    glow: 'hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]',
    border: 'border-green-400/30',
  }
];

export default function App() {
  const [showPortal, setShowPortal] = useState(false);
  const [selected, setSelected] = useState(null);
  
  // New state to handle the cinematic exit animation
  const [isWarping, setIsWarping] = useState(false); 
  const navigate = useNavigate();

  // Custom navigation function to handle the animation delay and correct routing
  const handleEnterUniverse = (universeId) => {
    setIsWarping(true); // Trigger the zoom/blur effect

    setTimeout(() => {
      // Send Martian to the loading screen, send others to their normal routes
      if (universeId === 'martian') {
        navigate('/martian-loading');
      } else {
        navigate(`/${universeId}`);
      }
    }, 800); // Wait 800ms for the animation to finish before actually routing
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-8 overflow-hidden">

      <AnimatePresence mode="wait">

        {!showPortal ? (
          /* ================= INTRO SCREEN ================= */
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center cursor-pointer min-h-screen w-full"
            onClick={() => setShowPortal(true)}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-widest uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-cyan-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Onamverse
            </h1>
            <p className="text-xl md:text-2xl animate-pulse text-slate-400 tracking-[0.3em] uppercase">
              Click to Choose Your Universe
            </p>
          </motion.div>
        ) : (

          /* ================= PORTAL SCREEN ================= */
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            // When isWarping is true, run the exit animation!
            animate={isWarping ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 mt-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase text-white mb-2">
                Choose Your Universe
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-cyan-400 mx-auto rounded-full"></div>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              {universes.map((u, i) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                  onHoverStart={() => setSelected(u.id)}
                  onHoverEnd={() => setSelected(null)}
                  className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border ${u.border} transition-all duration-300 cursor-pointer ${u.glow} flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{u.title}</h3>
                    <p className="text-slate-300 mb-8 min-h-[80px] leading-relaxed">{u.desc}</p>
                  </div>

                  <div 
                  // Call our new custom function instead of navigating instantly
                  onClick={() => handleEnterUniverse(u.id)}
                  className={`w-full py-3 rounded text-center font-bold tracking-wide transition-all duration-300 ${selected === u.id ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'bg-black/50 border border-yellow-500/30 text-yellow-500'}`}
                >
                  Enter Universe
                </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}