import React from 'react';
import { X, Grid, LayoutTemplate } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  width: number;
  height: number;
  onUpdateDimensions: (w: number, h: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  showGrid,
  setShowGrid,
  width,
  height,
  onUpdateDimensions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-gray-700 w-full max-w-sm rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-dark-950">
          <h2 className="font-bold text-lg text-white">Project Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white rounded-lg p-1 hover:bg-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
           
           {/* Grid Settings */}
           <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                 <Grid size={14} /> View
              </h3>
              <div className="flex items-center justify-between bg-dark-800 p-3 rounded-xl border border-gray-700">
                 <span className="text-gray-200">Show Grid</span>
                 <button 
                   onClick={() => setShowGrid(!showGrid)}
                   className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${showGrid ? 'bg-brand-500' : 'bg-gray-600'}`}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${showGrid ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
              </div>
           </div>

           <div className="h-px bg-gray-800" />

           {/* Canvas Settings */}
           <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                 <LayoutTemplate size={14} /> Canvas Size
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Width (px)</label>
                      <input 
                         type="number" 
                         value={width}
                         onChange={(e) => onUpdateDimensions(parseInt(e.target.value) || 100, height)}
                         className="bg-dark-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-brand-500"
                      />
                  </div>
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Height (px)</label>
                      <input 
                         type="number" 
                         value={height}
                         onChange={(e) => onUpdateDimensions(width, parseInt(e.target.value) || 100)}
                         className="bg-dark-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-brand-500"
                      />
                  </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                  <button onClick={() => onUpdateDimensions(800, 600)} className="text-xs bg-dark-800 hover:bg-gray-700 border border-gray-700 rounded p-1 text-gray-400">Default</button>
                  <button onClick={() => onUpdateDimensions(1080, 1080)} className="text-xs bg-dark-800 hover:bg-gray-700 border border-gray-700 rounded p-1 text-gray-400">Square</button>
                  <button onClick={() => onUpdateDimensions(1280, 720)} className="text-xs bg-dark-800 hover:bg-gray-700 border border-gray-700 rounded p-1 text-gray-400">HD</button>
              </div>
           </div>

        </div>
        
        <div className="p-4 bg-dark-950 border-t border-gray-800 flex justify-end">
            <button onClick={onClose} className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
                Done
            </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;