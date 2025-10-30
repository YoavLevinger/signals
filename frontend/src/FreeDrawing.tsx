import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Point, DrawingTool } from './types';

const FreeDrawing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#222');
  const [tool, setTool] = useState<DrawingTool>('brush');
  const [lastPos, setLastPos] = useState<Point>({ x: 0, y: 0 });

  const colors = ['#222', '#e53935', '#43a047', '#1e88e5', '#fbc02d', '#8e24aa', '#ff9800', '#00bcd4'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = tool === 'brush' ? 4 : 16;
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : color;
  }, [color, tool]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : color;
    ctx.lineWidth = tool === 'brush' ? 4 : 16;
    ctx.stroke();
    setLastPos(pos);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="drawing-board-page">
      <h2>Free Drawing</h2>
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
          <button 
            className={`tool-btn${tool === 'brush' ? ' selected' : ''}`} 
            onClick={() => setTool('brush')}
          >
            🖌️ Brush
          </button>
          <button 
            className={`tool-btn${tool === 'eraser' ? ' selected' : ''}`} 
            onClick={() => setTool('eraser')}
          >
            🧽 Eraser
          </button>
          <button className="tool-btn" onClick={clearCanvas}>🗑️ Clear</button>
        </div>
      </div>
      <div className="drawing-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
};

export default FreeDrawing;

