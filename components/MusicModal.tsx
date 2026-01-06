import React, { useRef } from 'react';
import { X, Music, Upload, Trash2, Volume2, ExternalLink, Search } from 'lucide-react';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAudioUrl: string | null;
  onSelectAudio: (url: string | null) => void;
}

const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose, currentAudioUrl, onSelectAudio }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
          alert("File is too large. Please select a file under 10MB.");
          return;
      }
      const url = URL.createObjectURL(file);
      onSelectAudio(url);
      onClose();
    }
  };

  const handleSearchOnline = () => {
      // Open YouTube Search for copyright free music
      window.open('https://www.youtube.com/results?search_query=no+copyright+background+music+for+animation', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-dark-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-dark-950">
          <div className="flex items-center gap-2 text-white">
             <Music size={20} className="text-brand-400" />
             <h2 className="font-bold text-lg">Soundtrack</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white rounded-lg p-1 hover:bg-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
           
           {/* Current Selection Indicator */}
           {currentAudioUrl && (
             <div className="mb-6 bg-brand-900/20 border border-brand-500/30 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <Volume2 size={18} className="text-white" />
                   </div>
                   <div>
                       <span className="text-sm text-brand-100 font-bold block">Active Soundtrack</span>
                       <span className="text-xs text-brand-300/70">Audio is set for this project</span>
                   </div>
                </div>
                <button 
                  onClick={() => onSelectAudio(null)}
                  className="text-red-400 hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                  title="Remove Audio"
                >
                  <Trash2 size={18} />
                </button>
             </div>
           )}
           
           <div className="flex flex-col items-center justify-center gap-6 text-center">
              
              {/* Upload Section */}
              <div className="flex flex-col items-center gap-3 w-full">
                  <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-brand-500 transition-colors group">
                     <Upload size={32} className="text-gray-500 group-hover:text-brand-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">Upload Audio File</h3>
                    <p className="text-sm text-gray-500">MP3, WAV, OGG (Max 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="audio/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-2.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-brand-500/25 w-full sm:w-3/4"
                  >
                    Choose File
                  </button>
              </div>

              <div className="w-full flex items-center gap-3 px-8">
                 <div className="h-px bg-gray-800 flex-1" />
                 <span className="text-xs text-gray-600 font-bold">OR</span>
                 <div className="h-px bg-gray-800 flex-1" />
              </div>

              {/* Online Search Helper */}
              <div className="flex flex-col items-center gap-2 w-full px-2">
                   <button
                      onClick={handleSearchOnline}
                      className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-red-500/25 group"
                   >
                       <Search size={18} />
                       <span>Find Music on YouTube</span>
                       <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
                   </button>
                   <p className="text-[10px] text-gray-500 px-4 leading-tight">
                      Search for royalty-free music, download it, then upload it above.
                   </p>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default MusicModal;