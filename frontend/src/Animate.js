import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

const IMAGE_COUNT = 12; // Change this to the number of images you have

function Animate() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(1);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleNext = () => {
    setIndex((prev) => (prev < IMAGE_COUNT ? prev + 1 : prev));
    setDescription('');
    setMessage('');
  };
  const handleBack = () => {
    setIndex((prev) => (prev > 1 ? prev - 1 : prev));
    setDescription('');
    setMessage('');
  };
  const handleSend = async () => {
    setMessage(t('director.sentMessage'));
    // await fetch('/api/director', { method: 'POST', body: JSON.stringify({ image: index, description }) });
  };

  return (
    <div className="animate-page">
      <h2>{t('director.describeImage')}</h2>
      <div className="animate-img-wrapper">
        <img
          src={`/director/${index}.png`}
          alt={`Director ${index}`}
          className="animate-img animate-img-large"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="animate-form">
        <textarea
          className="animate-input"
          placeholder={t('director.describePlaceholder')}
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
        <button className="send-btn" onClick={handleSend} disabled={!description.trim()}>{t('director.send')}</button>
        {message && <div className="animate-message">{message}</div>}
      </div>
      <div className="animate-nav">
        <button className="tool-btn" onClick={handleBack} disabled={index === 1}>{t('director.previousImage')}</button>
        <button className="tool-btn" onClick={handleNext} disabled={index === IMAGE_COUNT}>{t('director.nextImage')}</button>
      </div>
    </div>
  );
}

export default Animate; 