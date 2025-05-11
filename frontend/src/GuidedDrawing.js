import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const familyFigures = [
  { name: 'Father', icon: '👨' },
  { name: 'Mother', icon: '👩' },
  { name: 'Brother', icon: '👦' },
  { name: 'Sister', icon: '👧' },
];

const homeTools = [
  { name: 'Chair', icon: '🪑' },
  { name: 'Table', icon: '🛋️' },
  { name: 'Lamp', icon: '💡' },
  { name: 'Book', icon: '📚' },
  { name: 'TV', icon: '📺' },
  { name: 'Phone', icon: '📱' },
  { name: 'Spoon', icon: '🥄' },
  { name: 'Fork', icon: '🍴' },
  { name: 'Knife', icon: '🔪' },
  { name: 'Cup', icon: '☕' },
  { name: 'Bed', icon: '🛏️' },
  { name: 'Shoe', icon: '👟' },
  { name: 'Hat', icon: '🎩' },
  { name: 'Toothbrush', icon: '🪥' },
  { name: 'Soap', icon: '🧼' },
  { name: 'Towel', icon: '🧻' },
  { name: 'Mirror', icon: '🪞' },
  { name: 'Clock', icon: '⏰' },
  { name: 'Remote', icon: '🕹️' },
  { name: 'Scissors', icon: '✂️' },
  { name: 'Broom', icon: '🧹' },
  { name: 'Plant', icon: '🪴' },
  { name: 'Fridge', icon: '🧊' },
  { name: 'Oven', icon: '🍳' },
  { name: 'Washing Machine', icon: '🧺' },
  { name: 'Iron', icon: '🧲' },
  { name: 'Vacuum', icon: '🧹' },
  { name: 'Fan', icon: '🌀' },
  { name: 'Curtain', icon: '🪟' },
  { name: 'Picture', icon: '🖼️' },
];

const bodyParts = [
  { name: 'Head', icon: '🟤' },
  { name: 'Arm', icon: '💪' },
  { name: 'Leg', icon: '🦵' },
  { name: 'Hand', icon: '🤚' },
  { name: 'Foot', icon: '🦶' },
  { name: 'Torso', icon: '🟦' },
  { name: 'Eye', icon: '👁️' },
  { name: 'Ear', icon: '👂' },
  { name: 'Mouth', icon: '👄' },
  { name: 'Nose', icon: '👃' },
  { name: 'Hair', icon: '🦱' },
  { name: 'Finger', icon: '☝️' },
  { name: 'Toe', icon: '🦶' },
  { name: 'Neck', icon: '🦴' },
  { name: 'Eyebrow', icon: '〰️' },
  { name: 'Eyelash', icon: '〰️' },
];

function GuidedDrawing() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#222');
  const [tool, setTool] = useState('brush');
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [draggedItem, setDraggedItem] = useState(null);
  const [placedItems, setPlacedItems] = useState([]); // {icon, x, y}
  const [movingIdx, setMovingIdx] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [strokes, setStrokes] = useState([]); // {points: [{x, y}], color, width, eraser}
  const [currentStroke, setCurrentStroke] = useState(null);

  const colors = ['#222', '#e53935', '#43a047', '#1e88e5', '#fbc02d', '#8e24aa', '#ff9800', '#00bcd4'];

  // Redraw everything on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (tool !== 'brush' && tool !== 'eraser') return;
    setDrawing(true);
    const pos = getPos(e);
    setLastPos(pos);
    setCurrentStroke({
      points: [pos],
      color,
      width: tool === 'brush' ? 4 : 16,
      eraser: tool === 'eraser',
    });
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setRedoStack([]);
  };

  const draw = (e) => {
    if (!drawing) return;
    const pos = getPos(e);
    setCurrentStroke((prev) => ({ ...prev, points: [...prev.points, pos] }));
    setLastPos(pos);
  };

  const stopDrawing = () => {
    setDrawing(false);
    if (currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke(null);
    }
  };

  // Drag and drop handlers for new items
  const handleDragStart = (item) => setDraggedItem(item);
  const handleDragEnd = () => setDraggedItem(null);
  const handleDrop = (e) => {
    if (!draggedItem) return;
    const pos = getPos(e);
    setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
    setPlacedItems([...placedItems, { icon: draggedItem.icon, x: pos.x, y: pos.y }]);
    setRedoStack([]);
    setDraggedItem(null);
  };

  // Move placed items
  const handleCanvasMouseDown = (e) => {
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
          setLastPos(pos);
          setUndoStack((prev) => [...prev, { placedItems: [...placedItems], strokes: [...strokes] }]);
          setRedoStack([]);
          return;
        }
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (drawing) {
      draw(e);
      return;
    }
    if (movingIdx !== null) {
      const pos = getPos(e);
      setPlacedItems((prev) => {
        const updated = [...prev];
        updated[movingIdx] = { ...updated[movingIdx], x: pos.x, y: pos.y };
        return updated;
      });
      setLastPos(pos);
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
    const ctx = canvas.getContext('2d');
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
            <div className="sidebar-header">Family</div>
            {familyFigures.map((item) => (
              <div
                key={item.name}
                className="sidebar-draggable"
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
              >
                <span className="sidebar-icon">{item.icon}</span> {item.name}
              </div>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-header">Body Parts</div>
            <div className="sidebar-list">
              {bodyParts.map((item) => (
                <div
                  key={item.name}
                  className="sidebar-draggable"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="sidebar-icon">{item.icon}</span> {item.name}
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
            <button className={`tool-btn${tool === 'brush' ? ' selected' : ''}`} onClick={() => setTool('brush')}>🖌️ Brush</button>
            <button className={`tool-btn${tool === 'eraser' ? ' selected' : ''}`} onClick={() => setTool('eraser')}>🧽 Eraser</button>
            <button className={`tool-btn${tool === 'hand' ? ' selected' : ''}`} onClick={() => setTool('hand')}>🤚 Hand</button>
            <button className="tool-btn" onClick={clearCanvas}>🗑️ Clear</button>
            <button className="tool-btn" onClick={handleUndo} disabled={undoStack.length === 0}>↩️ Undo</button>
            <button className="tool-btn" onClick={handleRedo} disabled={redoStack.length === 0}>↪️ Redo</button>
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
            <div className="sidebar-header">Home Tools & Accessories</div>
            <div className="sidebar-list">
              {homeTools.map((item) => (
                <div
                  key={item.name}
                  className="sidebar-draggable"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="sidebar-icon">{item.icon}</span> {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidedDrawing; 