import React, { useState, useEffect } from 'react';
import { 
  Pen, Eraser, Move, Undo, Redo, Trash2, Type, Music, Wand, 
  Square, Circle, Triangle, Star, Hexagon, Pentagon,
  Diamond, Heart, ArrowRight, Moon, Cloud, Zap, Flower2, Sun,
  Smile, Leaf, Flame, Sparkles, Scaling, Crop
} from 'lucide-react';
import { ToolType, BrushSettings, ShapeType } from '../types';

interface ToolbarProps {
  activeTool: ToolType;
  setTool: (t: ToolType) => void;
  brushSettings: BrushSettings;
  setBrushSettings: (s: BrushSettings) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onClearFrame: () => void;
  onOpenMusic: () => void;
  onOpenEffects: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setTool,
  brushSettings,
  setBrushSettings,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onClearFrame,
  onOpenMusic,
  onOpenEffects
}) => {
  const [showShapePanel, setShowShapePanel] = useState(false);

  useEffect(() => {
    if (activeTool === ToolType.SHAPE) setShowShapePanel(true);
    else setShowShapePanel(false);
  }, [activeTool]);

  const getShapeIcon = (type: ShapeType, size: number) => {
    switch (type) {
      case ShapeType.RECTANGLE: return <Square size={size} />;
      case ShapeType.CIRCLE: return <Circle size={size} />;
      case ShapeType.TRIANGLE: return <Triangle size={size} />;
      case ShapeType.STAR: return <Star size={size} />;
      case ShapeType.STAR_4: return <Sparkles size={size} />;
      case ShapeType.HEXAGON: return <Hexagon size={size} />;
      case ShapeType.DIAMOND: return <Diamond size={size} />;
      case ShapeType.HEART: return <Heart size={size} />;
      case ShapeType.ARROW: return <ArrowRight size={size} />;
      case ShapeType.LIGHTNING: return <Zap size={size} />;
      case ShapeType.MOON: return <Moon size={size} />;
      case ShapeType.CLOUD: return <Cloud size={size} />;
      case ShapeType.SUN: return <Sun size={size} />;
      case ShapeType.FLOWER: return <Flower2 size={size} />;
      case ShapeType.SMILE: return <Smile size={size} />;
      case ShapeType.LEAF: return <Leaf size={size} />;
      case ShapeType.FLAME: return <Flame size={size} />;
      default: return <Square size={size} />;
    }
  };
  
  const tools = [
    { type: ToolType.PEN, icon: (size: number) => <Pen size={size} />, label: 'Pen' },
    { type: ToolType.ERASER, icon: (size: number) => <Eraser size={size} />, label: 'Eraser' },
    { type: ToolType.SHAPE, icon: (size: number) => getShapeIcon(brushSettings.shapeType, size), label: 'Shape' },
    { type: ToolType.MOVE, icon: (size: number) => <Move size={size} />, label: 'Move' },
    { type: ToolType.RESIZE, icon: (size: number) => <Scaling size={size} />, label: 'Resize' },
    { type: ToolType.CROP, icon: (size: number) => <Crop size={size} />, label: 'Crop' },
    { type: ToolType.TEXT, icon: (size: number) => <Type size={size} />, label: 'Text' },
  ];

  return (
    <div className="h-full flex relative z-20 overflow-hidden">
      {/* Dynamic Tool Strip */}
      <div className="w-10 sm:w-11 bg-dark-950/98 border-r border-white/5 flex flex-col shadow-2xl transition-all duration-300">
        
        {/* Scrollable Tool Body */}
        <div className="flex-1 w-full flex flex-col items-center py-2 sm:py-3 gap-1.5 sm:gap-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {tools.map((tool) => {
            const isActive = activeTool === tool.type;
            const currentSize = isActive ? 12 : 16;
            
            return (
              <button
                key={tool.type}
                onClick={() => setTool(tool.type)}
                className={`shrink-0 p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg scale-90'
                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
                title={tool.label}
              >
                {tool.icon(currentSize)}
              </button>
            );
          })}

          <div className="shrink-0 h-px bg-white/5 my-1 w-6" />

          <button onClick={onOpenEffects} className="shrink-0 p-1.5 sm:p-2 rounded-lg transition-all duration-200 text-gray-500 hover:bg-white/5 hover:text-yellow-400" title="Visual Effects">
            <Wand size={16} />
          </button>
          <button onClick={onOpenMusic} className="shrink-0 p-1.5 sm:p-2 rounded-lg transition-all duration-200 text-gray-500 hover:bg-white/5 hover:text-purple-400" title="Music">
            <Music size={16} />
          </button>
        </div>

        {/* Fixed Pinned Utilities at Bottom */}
        <div className="shrink-0 flex flex-col gap-2 pb-2 sm:pb-3 w-full items-center border-t border-white/5 pt-2 sm:pt-3 bg-dark-950">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-white/20 relative overflow-hidden bg-black shadow-inner group cursor-pointer transition-transform hover:scale-110">
              <div 
                className="absolute inset-0" 
                style={{ background: brushSettings.color }} 
              />
              <input
                  type="color"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  value={brushSettings.color}
                  onChange={(e) => setBrushSettings({ ...brushSettings, color: e.target.value })}
              />
          </div>
          <button onClick={onClearFrame} className="p-1 text-gray-600 hover:text-red-400 transition-colors" title="Clear Canvas"><Trash2 size={14} /></button>
          <div className="flex flex-col gap-0.5">
            <button onClick={onUndo} disabled={!canUndo} className="p-1 text-gray-600 disabled:opacity-20 hover:text-white transition-colors"><Undo size={12} /></button>
            <button onClick={onRedo} disabled={!canRedo} className="p-1 text-gray-600 disabled:opacity-20 hover:text-white transition-colors"><Redo size={12} /></button>
          </div>
        </div>
      </div>

      {showShapePanel && (
        <div className="w-36 sm:w-44 bg-dark-950/98 backdrop-blur-3xl border-r border-white/5 flex flex-col animate-in slide-in-from-left duration-200 shadow-2xl">
          <div className="p-1.5 sm:p-2 border-b border-white/5 bg-black/20">
            <h3 className="text-[6px] sm:text-[7px] font-black uppercase tracking-widest text-gray-500">Shapes</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 sm:p-2 grid grid-cols-4 gap-1 custom-scrollbar">
            {Object.values(ShapeType).map((type) => (
              <button
                key={type}
                onClick={() => setBrushSettings({...brushSettings, shapeType: type as ShapeType})}
                className={`aspect-square rounded flex items-center justify-center transition-all ${
                  brushSettings.shapeType === type 
                    ? 'bg-brand-500 text-white shadow-md' 
                    : 'bg-dark-800 text-gray-600 hover:text-white hover:bg-dark-700'
                }`}
              >
                {getShapeIcon(type as ShapeType, 10)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;