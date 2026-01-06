
import React, { useState } from 'react';
import { X, PlayCircle, BookOpen, Sparkles, Wand2, Zap, Layers, Move, Palette, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react';

interface TutorialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialsModal: React.FC<TutorialsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'basics' | 'principles' | 'tools'>('basics');

  if (!isOpen) return null;

  const tutorialCards = {
    basics: [
      {
        title: "Bouncing Ball",
        desc: "The classic first step. Learn timing and spacing.",
        difficulty: "Beginner",
        icon: <Zap className="text-yellow-400" />,
        link: "https://www.youtube.com/results?search_query=bouncing+ball+animation+tutorial"
      },
      {
        title: "Simple Walk Cycle",
        desc: "Make your character move across the screen.",
        difficulty: "Intermediate",
        icon: <Move className="text-brand-400" />,
        link: "https://www.youtube.com/results?search_query=simple+walk+cycle+tutorial"
      },
      {
        title: "Facial Expressions",
        desc: "Bring life to characters with simple eye and mouth movements.",
        difficulty: "Beginner",
        icon: <Palette className="text-pink-400" />,
        link: "https://www.youtube.com/results?search_query=2d+animation+facial+expressions"
      }
    ],
    principles: [
      {
        title: "Squash and Stretch",
        desc: "Add weight and flexibility to your objects.",
        difficulty: "Core Principle",
        icon: <Layers className="text-purple-400" />,
        link: "https://www.youtube.com/results?search_query=squash+and+stretch+animation"
      },
      {
        title: "Anticipation",
        desc: "Prepare the viewer for an action before it happens.",
        difficulty: "Core Principle",
        icon: <PlayCircle className="text-emerald-400" />,
        link: "https://www.youtube.com/results?search_query=anticipation+animation+principle"
      }
    ],
    tools: [
      {
        title: "Onion Skin Mastery",
        desc: "See ghosts of previous frames to draw perfect in-betweens.",
        difficulty: "Pro Tip",
        icon: <Sparkles className="text-brand-300" />,
        link: "#"
      },
      {
        title: "AI Character Builder",
        desc: "Generate reference sheets to keep your designs consistent.",
        difficulty: "Pro Tip",
        icon: <Wand2 className="text-purple-300" />,
        link: "#"
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-dark-900 border border-white/10 w-full max-w-2xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-dark-950 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-brand-500/20 flex items-center justify-center border border-brand-500/20">
                <GraduationCap size={22} className="text-brand-400" />
             </div>
             <div>
                <h2 className="font-black text-xl text-white tracking-tight leading-none">Animation School</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Master the art of motion</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-6 pt-4 gap-6 border-b border-white/5 shrink-0">
          {[
            { id: 'basics', label: 'Basics' },
            { id: 'principles', label: '12 Principles' },
            { id: 'tools', label: 'Studio Tools' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeCategory === tab.id ? 'text-brand-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeCategory === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
           {tutorialCards[activeCategory].map((card, idx) => (
             <div 
               key={idx}
               className="group relative bg-dark-800/50 border border-white/5 rounded-2xl p-5 hover:bg-white/5 transition-all cursor-pointer overflow-hidden"
               onClick={() => card.link !== "#" && window.open(card.link, '_blank')}
             >
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-dark-950 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      {card.icon}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white group-hover:text-brand-400 transition-colors">{card.title}</h3>
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                           {card.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-[80%]">{card.desc}</p>
                   </div>
                   <div className="self-center text-gray-600 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                   </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-brand-500/20 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
             </div>
           ))}

           {/* AI Pro Tip Card */}
           <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 to-brand-900/20 rounded-3xl border border-purple-500/20 flex items-center gap-6">
              <div className="bg-white/10 p-3 rounded-2xl">
                 <Sparkles className="text-purple-400 animate-pulse" size={24} />
              </div>
              <div className="flex-1">
                 <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">AI Character Tracing</h4>
                 <p className="text-[11px] text-gray-400 leading-normal">
                   Use the AI Builder to generate character reference sheets. Lower their opacity on Layer 1 and trace over them on Layer 2 to learn professional proportions!
                 </p>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-dark-950 border-t border-white/5 flex justify-center shrink-0">
           <button 
             onClick={() => window.open('https://www.youtube.com/c/AlanBeckerTutorials', '_blank')}
             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
           >
              Watch the Legends on YouTube <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </button>
        </div>

      </div>
    </div>
  );
};

export default TutorialsModal;
