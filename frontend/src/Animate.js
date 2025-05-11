import React, { useState } from 'react';
import './App.css';

const IMAGE_COUNT = 10; // Change this to the number of images you have

function Animate() {
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
    // Replace with actual backend call
    setMessage('Description sent!');
    // await fetch('/api/animate', { method: 'POST', body: JSON.stringify({ image: index, description }) });
  };

  return (
    <div className="animate-page">
      <h2>Describe the Image</h2>
      <div className="animate-img-wrapper">
        <img
          src={`/animate/${index}.png`}
          alt={`Animate ${index}`}
          className="animate-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="animate-form">
        <textarea
          className="animate-input"
          placeholder="Describe what you see..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
        <button className="send-btn" onClick={handleSend} disabled={!description.trim()}>Send</button>
        {message && <div className="animate-message">{message}</div>}
      </div>
      <div className="animate-nav">
        <button className="tool-btn" onClick={handleBack} disabled={index === 1}>Back Image</button>
        <button className="tool-btn" onClick={handleNext} disabled={index === IMAGE_COUNT}>Next Image</button>
      </div>
    </div>
  );
}

export default Animate; 