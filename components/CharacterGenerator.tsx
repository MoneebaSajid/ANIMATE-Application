import React, { useState } from 'react';
import { X, Sparkles, Loader2, Download } from 'lucide-react';
import { generateCharacterReference } from '../services/geminiService';

interface CharacterGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (dataUrl: string) => void;
}

const CharacterGenerator: React.FC<CharacterGeneratorProps> = ({ isOpen, onClose, onImport }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const imageUrl = await generateCharacterReference(prompt);
      setResult(imageUrl);
    } catch (e) {
      setError("Failed to generate. Please check your API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-dark-950">
          <div className="flex items-center gap-2 text-brand-400">
            <Sparkles size={20} />
            <h2 className="font-bold text-lg">AI Character Builder</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
           <p className="text-sm text-gray-400">
             Describe a character to generate a reference sheet. Use this to trace or import directly into your animation.
           </p>
           
           <div className="relative">
             <textarea
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="e.g., A cute blue robot with wheels, flat vector style..."
               className="w-full h-24 bg-dark-800 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
             />
             <div className="absolute bottom-3 right-3">
               <button 
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                  className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
               >
                 {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                 Generate
               </button>
             </div>
           </div>

           {error && (
             <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
               {error}
             </div>
           )}

           {result && (
             <div className="mt-2 space-y-3">
               <div className="rounded-xl overflow-hidden border border-gray-700 aspect-square relative group">
                 <img src={result} alt="Generated Character" className="w-full h-full object-contain bg-white" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => onImport(result)}
                      className="bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <Download size={18} />
                      Import to Canvas
                    </button>
                 </div>
               </div>
               <p className="text-xs text-center text-gray-500">Click Import to add this to your current frame.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CharacterGenerator;
