
export interface Point {
  x: number;
  y: number;
}

export enum ToolType {
  PEN = 'PEN',
  ERASER = 'ERASER',
  FILL = 'FILL',
  MOVE = 'MOVE',
  RESIZE = 'RESIZE',
  TEXT = 'TEXT',
  SHAPE = 'SHAPE',
  CROP = 'CROP'
}

export enum ShapeType {
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
  TRIANGLE = 'TRIANGLE',
  STAR = 'STAR',
  STAR_4 = 'STAR_4',
  STAR_6 = 'STAR_6',
  HEXAGON = 'HEXAGON',
  PENTAGON = 'PENTAGON',
  DIAMOND = 'DIAMOND',
  HEART = 'HEART',
  ARROW = 'ARROW',
  OCTAGON = 'OCTAGON',
  TRAPEZOID = 'TRAPEZOID',
  PARALLELOGRAM = 'PARALLELOGRAM',
  CROSS = 'CROSS',
  MOON = 'MOON',
  CLOUD = 'CLOUD',
  LIGHTNING = 'LIGHTNING',
  GEAR = 'GEAR',
  SPEECH_BUBBLE = 'SPEECH_BUBBLE',
  SHIELD = 'SHIELD',
  FLOWER = 'FLOWER',
  SUN = 'SUN',
  BOLT = 'BOLT',
  RING = 'RING',
  EGG = 'EGG',
  RIBBON = 'RIBBON',
  HEXAGRAM = 'HEXAGRAM',
  DROP = 'DROP',
  RHOMBUS = 'RHOMBUS',
  KITE = 'KITE',
  SMILE = 'SMILE',
  FROWN = 'FROWN',
  LEAF = 'LEAF',
  FLAME = 'FLAME',
  CYLINDER = 'CYLINDER',
  PIE = 'PIE',
  CAPSULE = 'CAPSULE',
  CRESCENT = 'CRESCENT',
  L_SHAPE = 'L_SHAPE',
  CHEVRON = 'CHEVRON',
  SPIRAL = 'SPIRAL',
  SHAMROCK = 'SHAMROCK',
  BADGE = 'BADGE',
  CUBE_3D = 'CUBE_3D'
}

export interface GradientSettings {
  enabled: boolean;
  colorStart: string;
  colorEnd: string;
  angle: number;
}

export interface Layer {
  id: string;
  name: string;
  data: string | null; // Base64 Data URL
  visible: boolean;
  locked: boolean;
  opacity: number;
}

export type DynamicEffectType = 'particles' | 'motion_blur' | 'glow' | 'speed_lines';

export interface DynamicEffect {
  type: DynamicEffectType;
  intensity: number;
  color?: string;
}

export interface Frame {
  id: string;
  layers: Layer[];
  effectsLayer: DynamicEffect[];
  thumbnail: string | null;
}

export interface ProjectState {
  frames: Frame[];
  currentFrameIndex: number;
  currentLayerIndex: number;
  fps: number;
  width: number;
  height: number;
  audioUrl: string | null;
}

export interface OnionSkinSettings {
  enabled: boolean;
  opacity: number;
  showPrevious: boolean;
  showNext: boolean;
}

export interface BrushSettings {
  color: string;
  size: number;
  opacity: number;
  fontFamily: string;
  shapeType: ShapeType;
  gradient: GradientSettings;
  lineJoin: 'miter' | 'round' | 'bevel';
}

export interface MusicTrack {
  id: string;
  title: string;
  url: string;
  duration: string;
}

export interface TransformState {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  text?: string;
  image?: HTMLImageElement; // Supports moving/resizing imported AI characters
}
