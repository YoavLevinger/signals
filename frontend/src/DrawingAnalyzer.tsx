import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import config from './config';
import { QuestionGroup, ApiResponse } from './types';

const questionGroupsKeys: QuestionGroup[] = [
  { key: 'facialFeatures', questions: ['face', 'mouth', 'ears'] },
  { key: 'humanFigure', questions: ['hands', 'arms', 'neck', 'legs', 'genitalia'] },
  { key: 'symbolic', questions: ['phallic', 'colors', 'hearts', 'isolation'] },
  { key: 'houseTreePerson', questions: ['house', 'elements', 'trees'] },
];

const DrawingAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<boolean[]>(Array(15).fill(false));
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Create and manage object URL for preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    
    // Create new URL if file exists
    if (file) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Cleanup: revoke URL when file changes or component unmounts
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleCheckboxChange = (idx: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data: ApiResponse = await response.json();
      setResult(data.response || data.error || t('drawingAnalyzer.noResults'));
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError(t('drawingAnalyzer.timeout'));
        } else {
          setError(`${t('drawingAnalyzer.error')}: ${err.message}`);
        }
      } else {
        setError(t('drawingAnalyzer.error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    
    // Save original style
    const originalStyle = resultRef.current.getAttribute('style') || '';
    
    // Expand the section to show all content
    resultRef.current.style.maxHeight = 'none';
    resultRef.current.style.overflow = 'visible';
    resultRef.current.style.height = 'auto';
    
    // Wait for the browser to render the new style
    await new Promise<void>((r) => setTimeout(r, 100));
    
    const canvas = await html2canvas(resultRef.current, { useCORS: true, scale: 2 });
    
    // Restore original style
    resultRef.current.setAttribute('style', originalStyle);
    
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let remainingHeight = imgHeight;
    let pageNum = 0;
    
    while (remainingHeight > 0) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(
        canvas.height, 
        Math.round((pageHeight - 40) * canvas.width / imgWidth)
      );
      const ctx = pageCanvas.getContext('2d');
      if (!ctx) break;
      
      ctx.drawImage(
        canvas,
        0,
        pageNum * pageCanvas.height,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );
      const pageImgData = pageCanvas.toDataURL('image/png');
      if (pageNum > 0) pdf.addPage();
      pdf.addImage(
        pageImgData, 
        'PNG', 
        20, 
        20, 
        imgWidth, 
        (pageCanvas.height * imgWidth) / canvas.width
      );
      remainingHeight -= (pageCanvas.height * imgWidth) / canvas.width;
      pageNum++;
    }
    pdf.save('drawing-analysis-result.pdf');
  };

  let questionIdx = 0;

  return (
    <div className="analyzer-page">
      <h2>{t('drawingAnalyzer.title')}</h2>
      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="upload-section">
          <div className="upload-options">
            <label htmlFor="file-upload" className="upload-label">
              {t('drawingAnalyzer.uploadTitle')}
            </label>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              capture="environment" 
              onChange={handleFileChange} 
            />
          </div>
          {file && (
            <>
              <div className="file-name">
                {t('drawingAnalyzer.selected')}: {file.name}
              </div>
              <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 16 }}>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Uploaded drawing preview"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '400px', 
                    borderRadius: 8, 
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="analyzer-subheader">{t('drawingAnalyzer.instructions')}</div>
        <div className="questions-section">
          {questionGroupsKeys.map((group, gIdx) => (
            <div key={gIdx} className="question-group">
              <div className="question-header">
                {t(`drawingAnalyzer.questionGroups.${group.key}.header`)}
              </div>
              {group.questions.map((qKey, qIdx) => {
                const idx = questionIdx++;
                return (
                  <label key={idx} className="question-item">
                    <input
                      type="checkbox"
                      checked={answers[idx]}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                    <span className="question-text">
                      {t(`drawingAnalyzer.questionGroups.${group.key}.questions.${qKey}.text`)}
                    </span>
                    <span className="tooltip-container">
                      <span className="tooltip-icon">?</span>
                      <span className="tooltip-text">
                        {t(`drawingAnalyzer.questionGroups.${group.key}.questions.${qKey}.tip`)}
                      </span>
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
          <button 
            className="download-pdf-btn" 
            onClick={handleDownloadPDF} 
            style={{ float: 'right', marginBottom: 8 }}
          >
            {t('drawingAnalyzer.downloadPDF')}
          </button>
          <h3>{t('drawingAnalyzer.analysisResult')}</h3>
          <div ref={resultRef} style={{ background: '#fff', padding: 16 }}>
            {file && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: 8, border: '1px solid #ccc' }}
                />
              </div>
            )}
            <div className="analyzer-result-content">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingAnalyzer;

