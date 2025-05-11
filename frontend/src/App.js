import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import DrawingAnalyzer from './DrawingAnalyzer';
import FreeDrawing from './FreeDrawing';
import GuidedDrawing from './GuidedDrawing';
import Animate from './Animate';

function Home() {
  return (
    <div className="main-menu">
      {/* Decorative background elements */}
     
      <h1>Signals</h1>
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
        <Link to="/questioner" className="menu-card">
          <img src="/main-page/questioner.png" alt="Questioner" className="menu-img" />
        </Link>
        <Link to="/animate" className="menu-card">
          <img src="/main-page/animate.png" alt="Animate" className="menu-img" />
        </Link>
      </div>
    </div>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return <button className="back-btn" onClick={() => navigate('/')}>← Back</button>;
}

function DrawingAnalyzerPage() {
  return <><BackButton /><DrawingAnalyzer /></>;
}
function GuidedDrawingPage() {
  return <><BackButton /><GuidedDrawing /></>;
}
function FreeDrawingPage() {
  return <><BackButton /><FreeDrawing /></>;
}
function Questioner() { return <><BackButton /><div><h2>Questioner</h2></div></>; }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawing-analyzer" element={<DrawingAnalyzerPage />} />
        <Route path="/guided-drawing" element={<GuidedDrawingPage />} />
        <Route path="/free-drawing" element={<FreeDrawingPage />} />
        <Route path="/questioner" element={<Questioner />} />
        <Route path="/animate" element={<Animate />} />
      </Routes>
    </Router>
  );
}

export default App;
