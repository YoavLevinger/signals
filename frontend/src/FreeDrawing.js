import React from 'react';
import './App.css';

function FreeDrawing() {
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [color, setColor] = React.useState('#222');
  const [tool, setTool] = React.useState('brush');
  const [lastPos, setLastPos] = React.useState({ x: 0, y: 0 });

  const colors = ['#222', '#e53935', '#43a047', '#1e88e5', '#fbc02d', '#8e24aa', '#ff9800', '#00bcd4'];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = tool === 'brush' ? 4 : 16;
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : color;
  }, [color, tool]);

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
    setDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext('2d');
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
    const ctx = canvas.getContext('2d');
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
        <button className={`tool-btn${tool === 'brush' ? ' selected' : ''}`} onClick={() => setTool('brush')}>🖌️ Brush</button>
        <button className={`tool-btn${tool === 'eraser' ? ' selected' : ''}`} onClick={() => setTool('eraser')}>🧽 Eraser</button>
        <button className="tool-btn" onClick={clearCanvas}>🗑️ Clear</button>
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
}

export default FreeDrawing; 