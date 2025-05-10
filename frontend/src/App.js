import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="main-menu">
      {/* Decorative background elements */}
     
      <h1 style={{color: '#2706e4'}}>Signals</h1>
      <div className="menu-options">
        <Link to="/drawing-analyzer" className="menu-card">
          <img src="/main-page/drawing-analyzer.png" alt="Drawing Analyzer" className="menu-img" />
        </Link>
        <Link to="/guided-drawing" className="menu-card">
          <img src="/main-page/guided-drawing.png" alt="Guided Drawing" className="menu-img" />
        </Link>
        <Link to="/free-drawing" className="menu-card">
          <img src="/main-page/free-drawing.png" alt="Free Drawing" className="menu-img" />
        </Link>
      </div>
    </div>
  );
}

function DrawingAnalyzer() { return <div><h2>Drawing Analyzer</h2></div>; }
function GuidedDrawing() { return <div><h2>Guided Drawing</h2></div>; }
function FreeDrawing() { return <div><h2>Free Drawing</h2></div>; }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawing-analyzer" element={<DrawingAnalyzer />} />
        <Route path="/guided-drawing" element={<GuidedDrawing />} />
        <Route path="/free-drawing" element={<FreeDrawing />} />
      </Routes>
    </Router>
  );
}

export default App;
