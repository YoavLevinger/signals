import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import DrawingAnalyzer from './DrawingAnalyzer';
import FreeDrawing from './FreeDrawing';
import GuidedDrawing from './GuidedDrawing';
import Animate from './Animate';
import './i18n';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' || lng === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <div className="language-selector">
      <select onChange={changeLanguage} value={i18n.language}>
        <option value="en">English</option>
        <option value="he">עברית</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}

function Home() {
  const { t } = useTranslation();

  return (
    <div className="main-menu">
      {/* Decorative background elements */}
     
      <h1>{t('app.title')}</h1>
      <div className="menu-options menu-options-grid">
        <div className="menu-row">
          <Link to="/drawing-analyzer" className="menu-card">
            <img src="/main-page/drawing-analyzer.png" alt={t('drawingAnalyzer.title')} className="menu-img" />
          </Link>
          <Link to="/guided-drawing" className="menu-card">
            <img src="/main-page/guided-drawing.png" alt={t('guidedDrawing.title')} className="menu-img" />
          </Link>
          <Link to="/free-drawing" className="menu-card">
            <img src="/main-page/free-drawing.png" alt={t('freeDrawing.title')} className="menu-img" />
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
  const { t } = useTranslation();
  return <button className="back-btn" onClick={() => navigate('/')}>{t('navigation.back')}</button>;
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
function Questioner() { 
  const { t } = useTranslation();
  return <><BackButton /><div><h2>{t('questioner.title')}</h2></div></>; 
}
function Picker() { 
  const { t } = useTranslation();
  return <><BackButton /><div><h2>{t('picker.title')}</h2></div></>; 
}
function Director() { return <><BackButton /><Animate /></>; }

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>{t('app.title')}</h1>
            <LanguageSelector />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drawing-analyzer" element={<DrawingAnalyzerPage />} />
            <Route path="/guided-drawing" element={<GuidedDrawingPage />} />
            <Route path="/free-drawing" element={<FreeDrawingPage />} />
            <Route path="/questioner" element={<Questioner />} />
            <Route path="/director" element={<Director />} />
            <Route path="/picker" element={<Picker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
