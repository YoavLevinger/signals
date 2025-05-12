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
      <div className="menu-options menu-options-grid">
        <div className="menu-row">
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
        <div className="menu-row">
          <Link to="/questioner" className="menu-card">
            <img src="/main-page/questioner.png" alt="Questioner" className="menu-img" />
          </Link>
          <Link to="/director" className="menu-card">
            <img src="/main-page/director.png" alt="Director" className="menu-img" />
          </Link>
          <Link to="/picker" className="menu-card">
            <img src="/main-page/picker.png" alt="Picker" className="menu-img" />
          </Link>
        </div>
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
function Picker() { return <><BackButton /><div><h2>Picker</h2></div></>; }

function Director() { return <><BackButton /><Animate /></>; }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawing-analyzer" element={<DrawingAnalyzerPage />} />
        <Route path="/guided-drawing" element={<GuidedDrawingPage />} />
        <Route path="/free-drawing" element={<FreeDrawingPage />} />
        <Route path="/questioner" element={<Questioner />} />
        <Route path="/director" element={<Director />} />
        <Route path="/picker" element={<Picker />} />
      </Routes>
    </Router>
  );
}

export default App;
