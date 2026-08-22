import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, CircleDot } from "lucide-react";

export default function MartianLoading() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Step 1: Trigger the cinematic exit animation after 3.2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    // Step 2: Actually navigate to the game after the screen goes black (800ms later)
    const navTimer = setTimeout(() => {
      navigate("/martian");
    }, 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <motion.div 
      className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-8 font-mono relative overflow-hidden"
      initial={{ opacity: 0 }}
      // When isExiting becomes true, it zooms in, blurs, and fades to black!
      animate={isExiting ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      
      {/* Background Grid Illusion */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #ef4444 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning Icon Ring */}
        <div className="relative flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute"
          >
            <CircleDot size={120} className="text-red-900 opacity-50" />
          </motion.div>
          
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Rocket size={48} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          </motion.div>
        </div>

        {/* Pulsing Text */}
        <motion.h1
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        >
          Establishing Mars Link
        </motion.h1>

        <div className="flex items-center space-x-2 text-lg md:text-xl text-red-400/80 uppercase tracking-widest">
          <p>Rover Module Loading</p>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.0 }}>.</motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
        </div>
        
      </div>
    </motion.div>
  );
}