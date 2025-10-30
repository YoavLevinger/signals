// API Response types
export interface ApiResponse {
  response?: string;
  error?: string;
}

// Config type
export interface AppConfig {
  backendHost: string;
}

// Drawing Analyzer Types
export interface QuestionGroup {
  key: 'facialFeatures' | 'humanFigure' | 'symbolic' | 'houseTreePerson';
  questions: string[];
}

// Canvas Drawing Types (for GuidedDrawing and FreeDrawing)
export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  width: number;
  eraser: boolean;
}

export interface PlacedItem {
  icon: string;
  x: number;
  y: number;
}

// Family Figure and Tool Types
export interface Figure {
  name: string;
  icon: string;
}

export interface Tool extends Figure {}

export interface BodyPart extends Figure {}

// Tool type for drawing components
export type DrawingTool = 'brush' | 'eraser';

