
import { Frame, Layer, ProjectState, BrushSettings, ToolType, OnionSkinSettings, ShapeType } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const MAX_FRAMES = 100;
export const DEFAULT_FPS = 12;

export const INITIAL_LAYER: Layer = {
  id: 'layer-1',
  name: 'Layer 1',
  data: null,
  visible: true,
  locked: false,
  opacity: 1,
};

export const INITIAL_FRAME: Frame = {
  id: 'frame-1',
  layers: [{ ...INITIAL_LAYER }],
  effectsLayer: [], // Initialize empty effects layer
  thumbnail: null,
};

export const INITIAL_PROJECT_STATE: ProjectState = {
  frames: [INITIAL_FRAME],
  currentFrameIndex: 0,
  currentLayerIndex: 0,
  fps: DEFAULT_FPS,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  audioUrl: null,
};

export const INITIAL_BRUSH_SETTINGS: BrushSettings = {
  color: '#000000',
  size: 5,
  opacity: 1,
  fontFamily: 'Arial',
  shapeType: ShapeType.RECTANGLE,
  lineJoin: 'round',
  gradient: {
    enabled: false,
    colorStart: '#0ea5e9',
    colorEnd: '#a855f7',
    angle: 45,
  },
};

export const INITIAL_ONION_SKIN_SETTINGS: OnionSkinSettings = {
  enabled: true,
  opacity: 0.25,
  showPrevious: true,
  showNext: true,
};

export const INITIAL_TOOL = ToolType.PEN;
