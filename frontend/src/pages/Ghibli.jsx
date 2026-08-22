import { useNavigate } from 'react-router-dom';

export default function Cyberpunk() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-8 font-mono">
      <h1 className="text-5xl font-bold mb-8">Neo-Kochi 2099</h1>
      <p className="text-xl mb-8">Cyber Vallam Kali module loading...</p>
      
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
      >
        Return to Portal
      </button>
    </div>
  );
}