import React from 'react';
import './App.css';

function DrawingAnalyzer() {
  const [file, setFile] = React.useState(null);
  const [answers, setAnswers] = React.useState(Array(20).fill(false));

  const questions = Array.from({ length: 20 }, (_, i) => `Question ${i + 1}`);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCheckboxChange = (idx) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send 'file' and 'answers' to the backend
    alert(`Image: ${file ? file.name : 'None'}\nAnswers: ${answers.map((a, i) => a ? `Q${i+1}` : null).filter(Boolean).join(', ')}`);
  };

  return (
    <div className="analyzer-page">
      <h2>Drawing Analyzer</h2>
      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-label">Upload Image:</label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
          {file && <div className="file-name">Selected: {file.name}</div>}
        </div>
        <div className="questions-section">
          {questions.map((q, idx) => (
            <label key={idx} className="question-item">
              <input
                type="checkbox"
                checked={answers[idx]}
                onChange={() => handleCheckboxChange(idx)}
              />
              {q}
            </label>
          ))}
        </div>
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
}

export default DrawingAnalyzer; 