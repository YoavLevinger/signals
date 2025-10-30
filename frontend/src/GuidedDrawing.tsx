import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Figure, Tool, BodyPart, Point, Stroke, PlacedItem, DrawingTool } from './types';

const familyFigures: Figure[] = [
  { name: 'father', icon: '👨' },
  { name: 'mother', icon: '👩' },
  { name: 'brother', icon: '👦' },
  { name: 'sister', icon: '👧' },
];

const homeTools: Tool[] = [
  { name: 'chair', icon: '🪑' },
  { name: 'table', icon: '🛋️' },
  { name: 'lamp', icon: '💡' },
  { name: 'book', icon: '📚' },
  { name: 'tv', icon: '📺' },
  { name: 'phone', icon: '📱' },
  { name: 'spoon', icon: '🥄' },
  { name: 'fork', icon: '🍴' },
  { name: 'knife', icon: '🔪' },
  { name: 'cup', icon: '☕' },
  { name: 'bed', icon: '🛏️' },
  { name: 'shoe', icon: '👟' },
  { name: 'hat', icon: '🎩' },
  { name: 'toothbrush', icon: '🪥' },
  { name: 'soap', icon: '🧼' },
  { name: 'towel', icon: '🧻' },
  { name: 'mirror', icon: '🪞' },
  { name: 'clock', icon: '⏰' },
  { name: 'remote', icon: '🕹️' },
  { name: 'scissors', icon: '✂️' },
  { name: 'broom', icon: '🧹' },
  { name: 'plant', icon: '🪴' },
  { name: 'fridge', icon: '🧊' },
  { name: 'oven', icon: '🍳' },
  { name: 'washingMachine', icon: '🧺' },
  { name: 'iron', icon: '🧲' },
  { name: 'vacuum', icon: '🧹' },
  { name: 'fan', icon: '🌀' },
  { name: 'curtain', icon: '🪟' },
  { name: 'picture', icon: '🖼️' },
];

const bodyParts: BodyPart[] = [
  { name: 'head', icon: '🟤' },
  { name: 'arm', icon: '💪' },
  { name: 'leg', icon: '🦵' },
  { name: 'hand', icon: '🤚' },
  { name: 'foot', icon: '🦶' },
  { name: 'torso', icon: '🟦' },
  { name: 'eye', icon: '👁️' },
  { name: 'ear', icon: '👂' },
  { name: 'mouth', icon: '👄' },
  { name: 'nose', icon: '👃' },
  { name: 'hair', icon: '🦱' },
  { name: 'finger', icon: '☝️' },
  { name: 'toe', icon: '🦶' },
  { name: 'neck', icon: '🦴' },
  { name: 'eyebrow', icon: '〰️' },
  { name: 'eyelash', icon: '〰️' },
];

type ExtendedTool = DrawingTool | 'hand';

interface UndoState {
  placedItems: PlacedItem[];
  strokes: Stroke[];
}

const GuidedDrawing: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#222');
  const [tool, setTool] = useState<ExtendedTool>('brush');
  const [draggedItem, setDraggedItem] = useState<Figure | Tool | BodyPart | null>(null);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [movingIdx, setMovingIdx] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<UndoState[]>([]);
  const [redoStack, setRedoStack] = useState<UndoState[]>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  const colors = ['#222', '#e53935', '#43a047', '#1e88e5', '#fbc02d', '#8e24aa', '#ff9800', '#00bcd4'];

  // Redraw everything on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw all strokes
    for (const stroke of strokes) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = stroke.width;
      ctx.strokeStyle = stroke.eraser ? '#fff' : stroke.color;
      stroke.points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }
    // Draw current stroke
    if (currentStroke) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = currentStroke.width;
      ctx.strokeStyle = currentStroke.eraser ? '#fff' : currentStroke.color;
      currentStroke.points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }
    // Draw all placed items
    placedItems.forEach(item => {
      ctx.font = '32px serif';
      ctx.fillText(item.icon, item.x, item.y);
    });
  }, [color, tool, placedItems, strokes, currentStroke]);

  // Drawing logic
  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement> | React.DragEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : 'clientX' in e ? e.clientX : 0;
    const clientY = 'touches' in e ? e.touches[0].clientY : 'clientY' in e ? e.clientY : 0;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (tool !== 'brush' && tool !== 'eraser') return;
    setDrawing(true);
    const pos = getPos(e);
    setCurrentStroke({
      points: [pos],
      color,
      width: tool === 'brush' ? 4 : 16,
      eraser: tool === 'eraser',
    });
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setRedoStack([]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing || !currentStroke) return;
    const pos = getPos(e);
    setCurrentStroke((prev) => prev ? { ...prev, points: [...prev.points, pos] } : null);
  };

  // Drag and drop handlers for new items
  const handleDragStart = (item: Figure | Tool | BodyPart) => setDraggedItem(item);
  const handleDragEnd = () => setDraggedItem(null);
  const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    if (!draggedItem) return;
    const pos = getPos(e);
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setPlacedItems([...placedItems, { icon: draggedItem.icon, x: pos.x, y: pos.y }]);
    setRedoStack([]);
    setDraggedItem(null);
  };

  // Move placed items
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'brush' || tool === 'eraser') {
      startDrawing(e);
      return;
    }
    if (tool === 'hand') {
      const pos = getPos(e);
      // Find topmost item under cursor
      for (let i = placedItems.length - 1; i >= 0; i--) {
        const item = placedItems[i];
        const dx = pos.x - item.x;
        const dy = pos.y - item.y;
        if (Math.abs(dx) < 24 && Math.abs(dy) < 24) {
          setMovingIdx(i);
          setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
          setRedoStack([]);
          return;
        }
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (drawing) {
      draw(e);
      return;
    }
    if (movingIdx !== null && movingIdx >= 0 && movingIdx < placedItems.length) {
      const pos = getPos(e);
      setPlacedItems((prev) => {
        const updated = [...prev];
        updated[movingIdx] = { ...updated[movingIdx], x: pos.x, y: pos.y };
        return updated;
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setDrawing(false);
    setMovingIdx(null);
    if (currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke(null);
    }
  };

  // Undo/Redo
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setPlacedItems(last.placedItems);
    setStrokes(last.strokes);
    setUndoStack((prev) => prev.slice(0, -1));
  };
  
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setPlacedItems(last.placedItems);
    setStrokes(last.strokes);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setPlacedItems([]);
    setStrokes([]);
    setRedoStack([]);
  };

  return (
    <div className="drawing-board-page guided">
      <h2>Guided Drawing</h2>
      <div className="guided-layout">
        <div className="guided-sidebar left">
          <div className="sidebar-section">
            <div className="sidebar-header">{t('guidedDrawing.sections.homeTools')}</div>
            <div className="sidebar-list">
              {homeTools.map((item) => (
                <div
                  key={item.name}
                  className="sidebar-draggable"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="sidebar-icon">{item.icon}</span> {t(`guidedDrawing.items.${item.name}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="guided-drawing-main">
          <div className="drawing-toolbar">
            <div className="color-palette">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`color-btn${color === c && tool === 'brush' ? ' selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => { setColor(c); setTool('brush'); }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
            <div className="tool-buttons">
              <button className={`tool-btn${tool === 'brush' ? ' selected' : ''}`} onClick={() => setTool('brush')}>🖌️ Brush</button>
              <button className={`tool-btn${tool === 'eraser' ? ' selected' : ''}`} onClick={() => setTool('eraser')}>🧽 Eraser</button>
              <button className={`tool-btn${tool === 'hand' ? ' selected' : ''}`} onClick={() => setTool('hand')}>🤚 Hand</button>
              <button className="tool-btn" onClick={clearCanvas}>🗑️ Clear</button>
              <button className="tool-btn" onClick={handleUndo} disabled={undoStack.length === 0}>↩️ Undo</button>
              <button className="tool-btn" onClick={handleRedo} disabled={redoStack.length === 0}>↪️ Redo</button>
            </div>
          </div>
          <div className="drawing-canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              className="drawing-canvas"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onTouchStart={handleCanvasMouseDown}
              onTouchMove={handleCanvasMouseMove}
              onTouchEnd={handleCanvasMouseUp}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            />
          </div>
        </div>
        <div className="guided-sidebar right">
          <div className="sidebar-section">
            <div className="sidebar-header">{t('guidedDrawing.sections.family')}</div>
            <div className="sidebar-list">
              {familyFigures.map((item) => (
                <div
                  key={item.name}
                  className="sidebar-draggable"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="sidebar-icon">{item.icon}</span> {t(`guidedDrawing.items.${item.name}`)}
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-header">{t('guidedDrawing.sections.bodyParts')}</div>
            <div className="sidebar-list">
              {bodyParts.map((item) => (
                <div
                  key={item.name}
                  className="sidebar-draggable"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="sidebar-icon">{item.icon}</span> {t(`guidedDrawing.items.${item.name}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedDrawing;

