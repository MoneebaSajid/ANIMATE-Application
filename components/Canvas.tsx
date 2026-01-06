import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Layer, BrushSettings, ToolType, OnionSkinSettings, ShapeType, Point, DynamicEffect, TransformState } from '../types';
import { 
  Check, X, Pen, Eraser, Move, Scaling, Crop, Maximize2
} from 'lucide-react';

interface CanvasProps {
  currentLayer: Layer;
  prevFrameLayer: Layer | null;
  nextFrameLayer: Layer | null;
  effectsLayer: DynamicEffect[];
  onionSkinSettings: OnionSkinSettings;
  brushSettings: BrushSettings;
  activeTool: ToolType;
  onUpdateLayer: (data: string) => void;
  zoom: number;
  width: number;
  height: number;
  showGrid: boolean;
  pendingImage: string | null;
  onClearPendingImage: () => void;
}

type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

const Canvas: React.FC<CanvasProps> = ({
  currentLayer,
  prevFrameLayer,
  nextFrameLayer,
  onionSkinSettings,
  brushSettings,
  activeTool,
  onUpdateLayer,
  zoom,
  width,
  height,
  pendingImage,
  onClearPendingImage
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onionRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle | 'move' | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [activeObject, setActiveObject] = useState<TransformState | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (pendingImage) {
      const img = new Image();
      img.src = pendingImage;
      img.onload = () => {
        const initSize = Math.min(width, height) * 0.6;
        setActiveObject({
          x: (width - initSize) / 2,
          y: (height - initSize) / 2,
          width: initSize,
          height: initSize,
          rotation: 0,
          image: img
        });
        onClearPendingImage();
      };
    }
  }, [pendingImage, width, height, onClearPendingImage]);

  useEffect(() => {
    if (activeTool === ToolType.CROP || activeTool === ToolType.RESIZE) {
      if (!activeObject && currentLayer.data) {
        handleTransformLayer();
      }
    } else if (activeTool !== ToolType.SHAPE && activeTool !== ToolType.MOVE && activeTool !== ToolType.TEXT) {
      if (activeObject) commitActiveObject();
    }
  }, [activeTool, currentLayer.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    if (currentLayer.data) {
        const img = new Image();
        img.src = currentLayer.data;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            drawActiveObject(ctx);
        };
        if (img.complete) {
          ctx.drawImage(img, 0, 0);
          drawActiveObject(ctx);
        }
    } else {
        drawActiveObject(ctx);
    }
  }, [currentLayer.data, activeObject, width, height, brushSettings]);

  const handleTransformLayer = () => {
    if (!currentLayer.data || activeObject) return;
    const img = new Image();
    img.src = currentLayer.data;
    img.onload = () => {
      onUpdateLayer('');
      setActiveObject({
        x: 0, y: 0, width: width, height: height, rotation: 0, image: img
      });
    };
  };

  const commitActiveObject = () => {
    if (!activeObject) return;
    const canvas = canvasRef.current;
    if (canvas) { 
      const ctx = canvas.getContext('2d')!;
      drawActiveObject(ctx);
      onUpdateLayer(canvas.toDataURL()); 
      setActiveObject(null); 
    }
  };

  const drawActiveObject = (ctx: CanvasRenderingContext2D) => {
      if (!activeObject) return;
      ctx.save();
      const centerX = activeObject.x + activeObject.width / 2;
      const centerY = activeObject.y + activeObject.height / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((activeObject.rotation * Math.PI) / 180);
      
      ctx.lineWidth = brushSettings.size;
      ctx.lineJoin = brushSettings.lineJoin;
      ctx.lineCap = 'round';
      ctx.strokeStyle = brushSettings.color;
      ctx.fillStyle = brushSettings.color;

      const w = activeObject.width;
      const h = activeObject.height;
      const hw = w / 2;
      const hh = h / 2;
      
      if (activeObject.image) {
          ctx.drawImage(activeObject.image, -hw, -hh, w, h);
      } else if (activeTool === ToolType.TEXT || activeObject.text !== undefined) {
          ctx.font = `bold ${Math.abs(h)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeObject.text || "...", 0, 0);
      } else {
          ctx.beginPath();
          switch (brushSettings.shapeType) {
              case ShapeType.RECTANGLE: ctx.strokeRect(-hw, -hh, w, h); break;
              case ShapeType.CIRCLE: ctx.ellipse(0, 0, Math.abs(hw), Math.abs(hh), 0, 0, Math.PI * 2); ctx.stroke(); break;
              case ShapeType.TRIANGLE: 
                ctx.moveTo(0, -hh); 
                ctx.lineTo(hw, hh); 
                ctx.lineTo(-hw, hh); 
                ctx.closePath(); 
                ctx.stroke(); 
                break;
              default: ctx.strokeRect(-hw, -hh, w, h); break;
          }
      }
      ctx.restore();
  };

  useEffect(() => {
    const canvas = onionRef.current;
    if (!canvas || !onionSkinSettings.enabled) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const drawOnion = (layer: Layer | null, color: string) => {
      if (!layer?.data) return;
      const img = new Image(); img.src = layer.data;
      img.onload = () => {
        ctx.save(); ctx.globalAlpha = onionSkinSettings.opacity;
        const tempCanvas = document.createElement('canvas'); tempCanvas.width = width; tempCanvas.height = height;
        const tCtx = tempCanvas.getContext('2d')!; tCtx.drawImage(img, 0, 0);
        tCtx.globalCompositeOperation = 'source-in'; tCtx.fillStyle = color; tCtx.fillRect(0, 0, width, height);
        ctx.drawImage(tempCanvas, 0, 0); ctx.restore();
      };
    };
    if (onionSkinSettings.showPrevious) drawOnion(prevFrameLayer, '#ef4444');
    if (onionSkinSettings.showNext) drawOnion(nextFrameLayer, '#22c55e');
  }, [prevFrameLayer, nextFrameLayer, onionSkinSettings, width, height]);

  const getCoordinates = (e: React.PointerEvent | React.MouseEvent | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (width / rect.width);
    const y = (e.clientY - rect.top) * (height / rect.height);
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const coords = getCoordinates(e);
    if (activeTool === ToolType.SHAPE || activeTool === ToolType.TEXT) {
        if (!activeObject) { 
            setIsCreating(true); 
            setActiveObject({ x: coords.x, y: coords.y, width: 0, height: 0, rotation: 0, text: activeTool === ToolType.TEXT ? "" : undefined }); 
        } else {
            const handle = getHandleAt(coords);
            if (handle) setActiveHandle(handle);
            else if (coords.x >= activeObject.x && coords.x <= activeObject.x + activeObject.width && coords.y >= activeObject.y && coords.y <= activeObject.y + activeObject.height) { setActiveHandle('move'); }
            else { commitActiveObject(); }
        }
    } else if (activeTool === ToolType.PEN || activeTool === ToolType.ERASER) { 
        setIsDrawing(true); 
    } else if (activeTool === ToolType.MOVE || activeTool === ToolType.RESIZE || activeTool === ToolType.CROP) {
        const handle = getHandleAt(coords);
        if (handle) setActiveHandle(handle);
        else if (activeObject && coords.x >= activeObject.x && coords.x <= activeObject.x + activeObject.width && coords.y >= activeObject.y && coords.y <= activeObject.y + activeObject.height) { setActiveHandle('move'); }
    }
    lastPos.current = coords;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const coords = getCoordinates(e);
    setMousePos(coords);
    if (!lastPos.current) return;
    const dx = coords.x - lastPos.current.x;
    const dy = coords.y - lastPos.current.y;
    
    if (isCreating && activeObject) { 
      setActiveObject({ ...activeObject, width: coords.x - activeObject.x, height: coords.y - activeObject.y }); 
    }
    else if (activeHandle && activeObject) {
        const obj = { ...activeObject };
        if (activeHandle === 'move') { 
          obj.x += dx; 
          obj.y += dy; 
        } else {
          if (activeHandle.includes('e')) obj.width += dx;
          if (activeHandle.includes('w')) { obj.x += dx; obj.width -= dx; }
          if (activeHandle.includes('s')) obj.height += dy;
          if (activeHandle.includes('n')) { obj.y += dy; obj.height -= dy; }
        }
        setActiveObject(obj);
    } else if (isDrawing) {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath(); ctx.lineWidth = brushSettings.size;
            ctx.globalCompositeOperation = activeTool === ToolType.ERASER ? 'destination-out' : 'source-over';
            ctx.strokeStyle = brushSettings.color; ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(coords.x, coords.y); ctx.stroke();
        }
    }
    lastPos.current = coords;
  };

  const handlePointerUp = () => {
    setIsCreating(false); setActiveHandle(null); setIsDrawing(false);
    if (activeTool === ToolType.PEN || activeTool === ToolType.ERASER) { onUpdateLayer(canvasRef.current!.toDataURL()); }
  };

  const getHandleAt = (coords: Point): ResizeHandle | null => {
    if (!activeObject) return null;
    const s = 14 / zoom;
    const { x, y, width: w, height: h } = activeObject;
    
    const handles: Record<ResizeHandle, Point> = {
      nw: { x, y },
      n: { x: x + w / 2, y },
      ne: { x: x + w, y },
      e: { x: x + w, y: y + h / 2 },
      se: { x: x + w, y: y + h },
      s: { x: x + w / 2, y: y + h },
      sw: { x, y: y + h },
      w: { x, y: y + h / 2 }
    };

    for (const [key, pos] of Object.entries(handles)) {
      if (Math.abs(coords.x - pos.x) < s && Math.abs(coords.y - pos.y) < s) {
        return key as ResizeHandle;
      }
    }
    return null;
  };

  const getHandleCursor = (h: ResizeHandle): string => {
    switch (h) {
      case 'n': case 's': return 'ns-resize';
      case 'e': case 'w': return 'ew-resize';
      case 'nw': case 'se': return 'nwse-resize';
      case 'ne': case 'sw': return 'nesw-resize';
      default: return 'default';
    }
  };

  const getHandleStyle = (h: ResizeHandle): React.CSSProperties => {
    const s = 10 / zoom;
    const style: React.CSSProperties = { 
      width: s, 
      height: s, 
      position: 'absolute',
      cursor: getHandleCursor(h),
      marginLeft: -s / 2,
      marginTop: -s / 2
    };

    switch (h) {
      case 'nw': style.top = 0; style.left = 0; break;
      case 'n': style.top = 0; style.left = '50%'; break;
      case 'ne': style.top = 0; style.left = '100%'; break;
      case 'e': style.top = '50%'; style.left = '100%'; break;
      case 'se': style.top = '100%'; style.left = '100%'; break;
      case 's': style.top = '100%'; style.left = '50%'; break;
      case 'sw': style.top = '100%'; style.left = 0; break;
      case 'w': style.top = '50%'; style.left = 0; break;
    }
    return style;
  };

  const renderCursor = () => {
    if (!mousePos) return null;
    const scale = zoom;
    const left = mousePos.x * scale;
    const top = mousePos.y * scale;

    const getToolIcon = () => {
      switch (activeTool) {
        case ToolType.PEN: return <Pen size={14} className="text-white fill-brand-500" />;
        case ToolType.ERASER: return <Eraser size={14} className="text-white fill-red-500" />;
        case ToolType.MOVE: return <Move size={14} className="text-white fill-brand-400" />;
        case ToolType.RESIZE: return <Scaling size={14} className="text-white fill-brand-400" />;
        case ToolType.CROP: return <Crop size={14} className="text-white fill-emerald-500" />;
        default: return null;
      }
    };

    return (
      <div className="pointer-events-none absolute z-[100] hidden sm:block" style={{ left, top, transform: 'translate(-50%, -50%)' }}>
        <div className="bg-dark-900/80 p-2 rounded-xl shadow-2xl border border-white/5 opacity-60 backdrop-blur-md">
          {getToolIcon()}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative shadow-2xl bg-white cursor-none overflow-hidden rounded-sm touch-none" 
      style={{ width: width * zoom, height: height * zoom }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setMousePos(null)}
    >
        <canvas ref={onionRef} width={width} height={height} className="absolute inset-0 pointer-events-none z-[1]" style={{ width: '100%', height: '100%' }} />
        <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 z-10 w-full h-full touch-none" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} />
        
        {renderCursor()}

        {activeObject && (
            <div className="absolute border border-brand-500 pointer-events-none z-20" style={{ left: activeObject.x * zoom, top: activeObject.y * zoom, width: activeObject.width * zoom, height: activeObject.height * zoom }}>
                {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((h) => (
                    <div 
                      key={h} 
                      className="bg-white border border-brand-500 rounded-full shadow-md z-30 pointer-events-auto"
                      style={getHandleStyle(h as ResizeHandle)}
                    />
                ))}
            </div>
        )}

        {/* Dedicated Contextual Header for Crop/Transform */}
        {activeObject && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-dark-900/95 p-2 px-4 rounded-full flex items-center gap-2 sm:gap-4 z-50 border border-white/5 shadow-2xl animate-in slide-in-from-top-2 backdrop-blur-md whitespace-nowrap">
                <span className="text-[8px] sm:text-[10px] font-black uppercase text-brand-400 tracking-widest flex items-center gap-1 sm:gap-2">
                   {activeTool === ToolType.CROP ? <Crop size={12}/> : <Scaling size={12}/>}
                   <span className="hidden xs:inline">{activeTool === ToolType.CROP ? 'Cropping' : 'Transforming'}</span>
                </span>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex gap-1 sm:gap-2">
                  <button onClick={() => commitActiveObject()} className="bg-brand-500 text-white p-1 rounded-lg flex items-center gap-1.5 text-[9px] font-black px-2 sm:px-3 hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/20"> 
                    <Check size={12} /> Apply
                  </button>
                  <button 
                    onClick={() => { 
                      if (activeObject.image && !currentLayer.data) onUpdateLayer(activeObject.image.src); 
                      setActiveObject(null); 
                    }} 
                    className="text-gray-500 hover:text-white p-1 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
            </div>
        )}

        {(activeTool === ToolType.MOVE || activeTool === ToolType.RESIZE) && !activeObject && currentLayer.data && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 animate-in slide-in-from-top-2 duration-300">
               <button 
                onClick={handleTransformLayer}
                className="bg-brand-600/90 hover:bg-brand-500 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-2 text-[9px] sm:text-[10px] font-black shadow-xl border border-white/10 transition-all hover:scale-105 active:scale-95 group uppercase tracking-widest whitespace-nowrap"
               >
                 <Maximize2 size={12} /> 
                 Edit Layer
               </button>
            </div>
        )}
    </div>
  );
};

export default Canvas;