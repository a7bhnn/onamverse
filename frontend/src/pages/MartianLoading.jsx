import { useNavigate } from 'react-router-dom';

export default function MartianLoading() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-red-400 flex flex-col items-center justify-center p-8 font-mono">
      <h1 className="text-5xl font-bold mb-8">Martian Onam</h1>
      <p className="text-xl mb-8">Rover Vallam Kali module loading...</p>
      
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
      >
        Return to Portal
      </button>
    </div>
  );
}