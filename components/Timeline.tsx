import React, { useRef, useEffect, useState } from 'react';
import { Plus, Copy, Trash, Play, Pause, Minus } from 'lucide-react';
import { Frame, OnionSkinSettings } from '../types';

interface TimelineProps {
  frames: Frame[];
  currentFrameIndex: number;
  onSelectFrame: (index: number) => void;
  onAddFrame: () => void;
  onDeleteFrame: (index: number) => void;
  onDuplicateFrame: (index: number) => void;
  onReorderFrames: (from: number, to: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  fps: number;
  setFps: (fps: number) => void;
  onionSkinSettings: OnionSkinSettings;
  setOnionSkinSettings: (settings: OnionSkinSettings) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  frames,
  currentFrameIndex,
  onSelectFrame,
  onAddFrame,
  onDeleteFrame,
  onDuplicateFrame,
  onReorderFrames,
  isPlaying,
  onTogglePlay,
  fps,
  setFps,
  onionSkinSettings,
  setOnionSkinSettings
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.children[currentFrameIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentFrameIndex]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('frameIndex', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('frameIndex'));
    setDragOverIndex(null);
    onReorderFrames(fromIndex, index);
  };

  return (
    <div className="h-16 sm:h-20 bg-dark-900 border-t border-white/5 flex flex-col z-20 shrink-0 select-none">
      {/* Micro-Header */}
      <div className="h-6 flex items-center justify-between px-2 sm:px-3 bg-black/30 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <button onClick={onTogglePlay} className={`w-4 h-4 rounded-full flex items-center justify-center text-white transition-all ${isPlaying ? 'bg-red-500' : 'bg-brand-500'} shrink-0`}>
            {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" className="ml-0.5" />}
          </button>
          <div className="flex items-center gap-1.5 text-[8px] text-gray-400 font-black uppercase tracking-widest whitespace-nowrap">
            <span className="hidden xs:inline">FPS:</span><span>{fps}</span>
            <div className="flex items-center bg-dark-800 rounded px-1 gap-1">
              <button onClick={() => setFps(Math.max(1, fps - 1))} className="hover:text-white"><Minus size={8} /></button>
              <button onClick={() => setFps(Math.min(60, fps + 1))} className="hover:text-white"><Plus size={8} /></button>
            </div>
          </div>
          <button 
            onClick={() => setOnionSkinSettings({...onionSkinSettings, enabled: !onionSkinSettings.enabled})}
            className={`text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1 py-0.5 rounded border transition-all whitespace-nowrap ${onionSkinSettings.enabled ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Onion
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
           <button onClick={() => onDuplicateFrame(currentFrameIndex)} className="text-gray-500 hover:text-white transition-colors" title="Duplicate"><Copy size={10} /></button>
           <button onClick={() => onDeleteFrame(currentFrameIndex)} disabled={frames.length <= 1} className="text-gray-500 hover:text-red-400 disabled:opacity-20 transition-colors" title="Delete"><Trash size={10} /></button>
           <button onClick={onAddFrame} className="bg-brand-600 hover:bg-brand-500 text-white px-2 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-widest transition-all shadow-md">+ Frame</button>
        </div>
      </div>

      {/* Thumbnails Area */}
      <div className="flex-1 overflow-x-auto custom-scrollbar py-1 sm:py-2 px-2 sm:px-3 flex items-center">
        <div ref={scrollContainerRef} className="flex gap-1.5 sm:gap-2 h-full items-center pr-10">
          {frames.map((frame, index) => (
            <div
              key={frame.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => onSelectFrame(index)}
              className={`
                relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-md cursor-pointer transition-all duration-200 overflow-hidden
                ${currentFrameIndex === index ? 'ring-2 ring-brand-400 shadow-xl scale-105 z-10' : 'opacity-40 hover:opacity-100 border border-gray-800'}
                ${dragOverIndex === index ? 'border-l-4 border-l-brand-400 pl-1' : ''}
              `}
            >
              <div className="absolute top-0.5 left-0.5 text-[5px] sm:text-[6px] font-black text-gray-400 z-10 bg-white/80 px-0.5 rounded tracking-tighter">
                F{index + 1}
              </div>
              {frame.thumbnail ? (
                <img src={frame.thumbnail} alt="" className="w-full h-full object-contain pointer-events-none" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[5px] sm:text-[6px] text-gray-300 font-bold uppercase">Frame</div>
              )}
            </div>
          ))}
          <button onClick={onAddFrame} className="w-8 h-10 sm:h-12 flex-shrink-0 border border-dashed border-gray-800 hover:border-brand-500/50 hover:bg-white/5 rounded-md flex items-center justify-center text-gray-700 transition-all">+</button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;