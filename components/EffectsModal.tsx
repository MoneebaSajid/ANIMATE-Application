
import React, { useState } from 'react';
import { X, FlipHorizontal, FlipVertical, Zap, Droplets, Grid3X3, Image, Moon, Sun, CloudFog, Palette, Aperture, MonitorPlay, Layers, Activity, Tv, ArrowUpCircle, Sparkles, Wind, ZapIcon } from 'lucide-react';
import { DynamicEffectType } from '../types';

export type EffectType = 'flipH' | 'flipV' | 'invert' | 'grayscale' | 'noise' | 'pixelate' | 'blur' | 'brightness' | 'darkness' | 'sepia' | 'hue' | 'vignette' | 'shake' | 'glitch' | 'bounce';

interface EffectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEffect: (type: EffectType, applyToAll: boolean) => void;
  onApplyDynamicEffect: (type: DynamicEffectType, intensity: number, applyToAll: boolean) => void;
}

const EffectsModal: React.FC<EffectsModalProps> = ({ isOpen, onClose, onApplyEffect, onApplyDynamicEffect }) => {
  const [applyToAll, setApplyToAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'pixel' | 'dynamic'>('pixel');

  if (!isOpen) return null;

  const pixelEffects = [
    { id: 'flipH', label: 'Flip Horizontally', icon: <FlipHorizontal size={24} />, color: 'bg-blue-600' },
    { id: 'flipV', label: 'Flip Vertically', icon: <FlipVertical size={24} />, color: 'bg-blue-600' },
    { id: 'shake', label: 'Camera Shake', icon: <Activity size={24} />, color: 'bg-red-500' },
    { id: 'bounce', label: 'Bounce', icon: <ArrowUpCircle size={24} />, color: 'bg-orange-500' },
    { id: 'glitch', label: 'RGB Glitch', icon: <Tv size={24} />, color: 'bg-cyan-600' },
    { id: 'invert', label: 'Invert Colors', icon: <Zap size={24} />, color: 'bg-purple-600' },
    { id: 'grayscale', label: 'Grayscale', icon: <Moon size={24} />, color: 'bg-gray-600' },
    { id: 'sepia', label: 'Sepia Tone', icon: <Image size={24} />, color: 'bg-amber-700' },
    { id: 'blur', label: 'Blur', icon: <CloudFog size={24} />, color: 'bg-teal-600' },
    { id: 'noise', label: 'Add Noise', icon: <Droplets size={24} />, color: 'bg-orange-600' },
    { id: 'pixelate', label: 'Pixelate', icon: <Grid3X3 size={24} />, color: 'bg-green-600' },
    { id: 'brightness', label: 'Brighten', icon: <Sun size={24} />, color: 'bg-yellow-500' },
    { id: 'darkness', label: 'Darken', icon: <Moon size={24} />, color: 'bg-indigo-900' },
    { id: 'hue', label: 'Hue Shift', icon: <Palette size={24} />, color: 'bg-pink-500' },
    { id: 'vignette', label: 'Vignette', icon: <Aperture size={24} />, color: 'bg-gray-800' },
  ];

  const dynamicEffects = [
    { id: 'particles' as DynamicEffectType, label: 'Particles', icon: <Sparkles size={24} />, color: 'bg-indigo-500', desc: 'Floating ambient particles' },
    { id: 'motion_blur' as DynamicEffectType, label: 'Motion Trail', icon: <Wind size={24} />, color: 'bg-blue-400', desc: 'Ghosting trail from prev frame' },
    { id: 'speed_lines' as DynamicEffectType, label: 'Speed Lines', icon: <ZapIcon size={24} />, color: 'bg-yellow-600', desc: 'Classic anime speed overlays' },
    { id: 'glow' as DynamicEffectType, label: 'Ambient Glow', icon: <Sun size={24} />, color: 'bg-brand-500', desc: 'Soft radial glow effect' },
  ];

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      <div className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px] transition-opacity" onClick={onClose} />

      <div className="fixed top-0 right-0 z-[100] h-full w-80 bg-dark-900 border-l border-gray-700 shadow-2xl flex flex-col slide-in-right">
        
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-dark-950 shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-brand-500/10 rounded-lg">
                <MonitorPlay size={20} className="text-brand-400" />
             </div>
             <div>
                <h2 className="font-bold text-lg text-white leading-none">Effects Studio</h2>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Enhance your art</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white rounded-lg p-2 hover:bg-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pt-4 shrink-0">
          <button 
            onClick={() => setActiveTab('pixel')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'pixel' ? 'border-brand-500 text-brand-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Pixel FX
          </button>
          <button 
            onClick={() => setActiveTab('dynamic')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'dynamic' ? 'border-brand-500 text-brand-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Animation FX
          </button>
        </div>

        <div className="px-5 pt-4 pb-2">
            <div 
                onClick={() => setApplyToAll(!applyToAll)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${applyToAll ? 'bg-brand-900/20 border-brand-500' : 'bg-dark-800 border-gray-700'}`}
            >
                <div className="flex items-center gap-3">
                    <Layers size={18} className={applyToAll ? 'text-brand-400' : 'text-gray-400'} />
                    <div className="flex flex-col">
                        <span className={`text-sm font-medium ${applyToAll ? 'text-white' : 'text-gray-300'}`}>Apply to all frames</span>
                    </div>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${applyToAll ? 'bg-brand-500' : 'bg-gray-600'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${applyToAll ? 'left-4.5' : 'left-0.5'}`} />
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
           {activeTab === 'pixel' ? (
             <div className="grid grid-cols-2 gap-3">
               {pixelEffects.map((effect) => (
                 <button
                   key={effect.id}
                   onClick={() => { onApplyEffect(effect.id as EffectType, applyToAll); onClose(); }}
                   className="flex flex-col items-center justify-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 border border-gray-700 hover:border-brand-500/50 rounded-xl transition-all group aspect-square hover:-translate-y-1"
                 >
                    <div className={`p-3 rounded-full text-white shadow-lg ${effect.color}`}>
                       {effect.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-white text-center leading-tight">
                      {effect.label}
                    </span>
                 </button>
               ))}
             </div>
           ) : (
             <div className="flex flex-col gap-3">
               <div className="mb-2 p-3 bg-brand-500/5 border border-brand-500/10 rounded-xl">
                 <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                   Animation FX are non-destructive and live on a dedicated layer above your drawings.
                 </p>
               </div>
               {dynamicEffects.map((effect) => (
                 <button
                   key={effect.id}
                   onClick={() => { onApplyDynamicEffect(effect.id as DynamicEffectType, 50, applyToAll); onClose(); }}
                   className="flex items-center gap-4 p-4 bg-dark-800 hover:bg-dark-700 border border-gray-700 hover:border-brand-500/50 rounded-xl transition-all group hover:-translate-x-1"
                 >
                    <div className={`p-3 rounded-xl text-white shadow-lg ${effect.color} shrink-0`}>
                       {effect.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{effect.label}</span>
                      <span className="text-[10px] text-gray-500 font-medium">{effect.desc}</span>
                    </div>
                 </button>
               ))}
             </div>
           )}
        </div>
        
        <div className="p-4 bg-dark-950 border-t border-gray-800 shrink-0">
             <div className="flex items-start gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                <p>Pro Tip: Use Speed Lines for action scenes!</p>
             </div>
        </div>
      </div>
    </>
  );
};

export default EffectsModal;
