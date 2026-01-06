import React from 'react';
import { X, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-dark-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center">
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all"
            >
                <X size={20} />
            </button>
            <div className="text-center">
                <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Ani<span className="text-brand-200">Mate</span>
                </h1>
                <p className="text-white/80 text-sm font-medium mt-1">Creative Animation Studio</p>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-center">
           <p className="text-gray-300 leading-relaxed text-sm">
             AniMate is a powerful yet simple tool for creating 2D frame-by-frame animations. 
             Powered by Google Gemini AI, it helps beginners draft characters and ideas instantly.
           </p>

           <div className="grid grid-cols-2 gap-3 my-2">
               <div className="bg-dark-800 p-3 rounded-xl border border-gray-700">
                   <h3 className="font-bold text-brand-400">Vector & Raster</h3>
                   <p className="text-xs text-gray-500 mt-1">Draw, Erase, and add Text with ease.</p>
               </div>
               <div className="bg-dark-800 p-3 rounded-xl border border-gray-700">
                   <h3 className="font-bold text-purple-400">AI Powered</h3>
                   <p className="text-xs text-gray-500 mt-1">Generate characters in seconds.</p>
               </div>
           </div>

           <div className="text-xs text-gray-500 flex flex-col gap-1 mt-2">
               <p>Version 1.0.0</p>
               <p className="flex items-center justify-center gap-1">
                   Made with <Heart size={10} className="text-red-500 fill-red-500" /> by Moneeba Developer
               </p>
           </div>
        </div>
        
        <div className="p-4 bg-dark-950 border-t border-gray-800 flex justify-center">
            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;