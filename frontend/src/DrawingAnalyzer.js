import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import config from './config';

const questionGroupsKeys = [
  { key: 'facialFeatures', questions: ['face', 'mouth', 'ears'] },
  { key: 'humanFigure', questions: ['hands', 'arms', 'neck', 'legs', 'genitalia'] },
  { key: 'symbolic', questions: ['phallic', 'colors', 'hearts', 'isolation'] },
  { key: 'houseTreePerson', questions: ['house', 'elements', 'trees'] },
];

function DrawingAnalyzer() {
  const { t } = useTranslation();
  const [file, setFile] = React.useState(null);
  const [answers, setAnswers] = React.useState(Array(15).fill(false));
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleCameraCapture = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleCheckboxChange = (idx) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    if (!file) {
      setError(t('drawingAnalyzer.noFile'));
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25 * 60 * 1000); // 25 minutes
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('question', t('drawingAnalyzer.analyze'));
      const response = await fetch(`${config.backendHost}/ask`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.error) {
        const text = await response.text();
        throw new Error('Server error');
      }
      const data = await response.json();
      setResult(data.response || data.error || t('drawingAnalyzer.noResults'));
    } catch (err) {
      if (err.name === 'AbortError') {
        setError(t('drawingAnalyzer.timeout'));
      } else {
        setError(`${t('drawingAnalyzer.error')}: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  let questionIdx = 0;

  return (
    <div className="analyzer-page">
      <h2>{t('drawingAnalyzer.title')}</h2>
      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="upload-section">
          <div className="upload-options">
            <label htmlFor="file-upload" className="upload-label">{t('drawingAnalyzer.uploadTitle')}</label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
            <label htmlFor="camera-capture" className="upload-label">{t('drawingAnalyzer.cameraTitle')}</label>
            <input 
              id="camera-capture" 
              type="file" 
              accept="image/*" 
              capture="environment" 
              onChange={handleCameraCapture}
            />
          </div>
          {file && <div className="file-name">{t('drawingAnalyzer.selected')}: {file.name}</div>}
        </div>
        <div className="analyzer-subheader">{t('drawingAnalyzer.instructions')}</div>
        <div className="questions-section">
          {questionGroupsKeys.map((group, gIdx) => (
            <div key={gIdx} className="question-group">
              <div className="question-header">{t(`drawingAnalyzer.questionGroups.${group.key}.header`)}</div>
              {group.questions.map((qKey, qIdx) => {
                const idx = questionIdx++;
                return (
                  <label key={idx} className="question-item">
                    <input
                      type="checkbox"
                      checked={answers[idx]}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                    <span className="question-text">{t(`drawingAnalyzer.questionGroups.${group.key}.questions.${qKey}.text`)}</span>
                    <span className="tooltip-container">
                      <span className="tooltip-icon">?</span>
                      <span className="tooltip-text">{t(`drawingAnalyzer.questionGroups.${group.key}.questions.${qKey}.tip`)}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
        <button type="submit" className="send-btn" disabled={loading}>
          {loading ? t('drawingAnalyzer.analyzing') : t('drawingAnalyzer.analyzeButton')}
        </button>
      </form>
      {loading && <div className="analyzer-loading">{t('drawingAnalyzer.analyzingWait')}</div>}
      {error && <div className="analyzer-error">{error}</div>}
      {result && (
        <div className="analyzer-result">
          <h3>{t('drawingAnalyzer.analysisResult')}</h3>
          <div className="analyzer-result-content">{result}</div>
        </div>
      )}
    </div>
  );
}

export default DrawingAnalyzer; 