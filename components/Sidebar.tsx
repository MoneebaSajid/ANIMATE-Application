
import React, { useRef } from 'react';
import { X, PlusSquare, HelpCircle, Info, Sliders, HardDrive, ImagePlus, ExternalLink, Film, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
  onImportImage: (file: File) => void;
  onSaveProject: () => void;
  onExportVideo: () => void;
  onSettings: () => void;
  onAbout: () => void;
  onHelp: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewProject, 
  onImportImage,
  onSaveProject,
  onExportVideo,
  onSettings,
  onAbout,
  onHelp,
  onLogout
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportImage(file);
      onClose();
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-dark-900 border-r border-white/5 z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-dark-950">
             <h2 className="font-black text-xs uppercase tracking-widest text-gray-500">Studio Workspace</h2>
             <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors">
               <X size={18} />
             </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
             <div className="flex flex-col px-2 gap-1">
                <button 
                  onClick={() => { onNewProject(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <PlusSquare size={18} className="text-brand-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">New Project</span>
                </button>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <ImagePlus size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">Import Image</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange} 
                />

                <button 
                  onClick={() => { onSaveProject(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <HardDrive size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">Save Project</span>
                </button>

                <button 
                  onClick={() => { onExportVideo(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <Film size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">Export Video</span>
                </button>

                <div className="h-px bg-white/5 my-2 mx-4" />

                <button 
                  onClick={() => { onSettings(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <Sliders size={18} className="text-gray-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">Settings</span>
                </button>

                <button 
                  onClick={() => { onHelp(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <HelpCircle size={18} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">Animation School</span>
                </button>

                <button 
                  onClick={() => { onAbout(); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left group"
                >
                  <Info size={18} className="text-brand-300 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">About AniMate</span>
                </button>
             </div>
          </div>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-white/5 bg-dark-950/50">
             <button 
               onClick={onLogout}
               className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left group"
             >
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-black text-xs uppercase tracking-widest">Logout Studio</span>
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
