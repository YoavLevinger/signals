import React from 'react';
import './App.css';

const questionGroups = [
  {
    header: '🧍Human Figure Characteristics',
    questions: [
      {
        text: 'Are the hands missing, cut off, or extremely small?',
        tip: 'Potential indicator of helplessness, loss of agency, or abuse.\n✔️ Reference: PMC9221832 - NCBI',
      },
      {
        text: 'Are the arms disproportionately large or used aggressively?',
        tip: 'May indicate exposure to physical aggression or internalized anger.\n✔️ Reference: [Lev-Wiesel & Liraz, 2007]',
      },
      {
        text: 'Is the neck missing or the head detached from the body?',
        tip: 'Associated with trauma, disassociation, or abuse.\n✔️ Reference: Allen & Tussey, 2012; Dillenburger, 2005',
      },
      {
        text: 'Are the legs tightly closed or crossed unnaturally?',
        tip: 'May reflect sexual discomfort, shame, or trauma.\n✔️ Reference: Allen & Tussey, 2012; Sidun & Rosenthal, 1987',
      },
      {
        text: 'Is there genitalia depicted or suggested (e.g., emphasis, exposure, or detail)?',
        tip: 'A significant red flag, especially if unsolicited or highly detailed.\n✔️ Reference: Identifying Sexually Abused Children Through Art',
      },
    ],
  },
  {
    header: '👁️ Facial Features and Expression',
    questions: [
      {
        text: 'Is the face sad, crying, or lacks eyes or mouth?',
        tip: 'Can suggest emotional withdrawal or trauma.\n✔️ Reference: Koppitz\'s Emotional Indicators',
      },
      {
        text: 'Is the mouth shown sealed, sewn, or missing entirely?',
        tip: 'May symbolize silencing or fear of speaking out.\n✔️ Reference: Draw-A-Person Test interpretations',
      },
      {
        text: 'Are the ears overly large or exaggerated?',
        tip: 'Could indicate hypervigilance or alertness to danger.\n✔️ Reference: PMC9221832 - NCBI',
      },
    ],
  },
  {
    header: '🏠 House-Tree-Person (HTP) and Environmental Symbols',
    questions: [
      {
        text: 'Is the house missing doors or windows?',
        tip: 'Often interpreted as a lack of escape or isolation.\n✔️ Reference: Scott, University of Wisconsin Study',
      },
      {
        text: 'Are there elements like dark clouds, excessive rain, or bars on the house/tree?',
        tip: 'Symbolize fear, threat, or emotional confinement.\n✔️ Reference: DAP and HTP indicators',
      },
      {
        text: 'Are trees drawn without roots or very small in size?',
        tip: 'Might indicate a lack of grounding, support, or identity.\n✔️ Reference: Generating Psychological Analysis Tables',
      },
    ],
  },
  {
    header: '🎨 Symbolic and Emotional Indicators',
    questions: [
      {
        text: 'Are there phallic shapes (e.g., elongated wedges, circles, weapons)?',
        tip: 'May unconsciously reflect sexual exposure or confusion.\n✔️ Reference: Malchiodi, 1990; Sidun & Rosenthal, 1987',
      },
      {
        text: 'Is there excessive use of red, black, or dark colors?',
        tip: 'Common in drawings of children with high emotional distress.\n✔️ Reference: Frontiers in Psychology, 2020',
      },
      {
        text: 'Are there multiple hearts, wedges, or sad emojis/emoticons?',
        tip: 'May represent self-loathing or distorted affection.\n✔️ Reference: UW-Whitewater study',
      },
      {
        text: 'Does the drawing show isolation (e.g., child far from family figures or alone)?',
        tip: 'Associated with emotional neglect or detachment.\n✔️ Reference: Draw-A-Person and HTP evaluations',
      },
    ],
  },
];

const allQuestions = questionGroups.flatMap(g => g.questions);

function DrawingAnalyzer() {
  const [file, setFile] = React.useState(null);
  const [answers, setAnswers] = React.useState(Array(allQuestions.length).fill(false));

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

  let questionIdx = 0;

  return (
    <div className="analyzer-page">
      <h2>Drawing Analyzer</h2>
      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-label">Upload Image:</label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
          {file && <div className="file-name">Selected: {file.name}</div>}
        </div>
        <div className="analyzer-subheader">Instructions: Review the drawing and check all that apply. Multiple selections are allowed.</div>
        <div className="questions-section">
          {questionGroups.map((group, gIdx) => (
            <div key={gIdx} className="question-group">
              <div className="question-header">{group.header}</div>
              {group.questions.map((q, qIdx) => {
                const idx = questionIdx++;
                return (
                  <label key={idx} className="question-item">
                    <input
                      type="checkbox"
                      checked={answers[idx]}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                    {q.text}
                    <span className="tooltip-container">
                      <span className="tooltip-icon">?</span>
                      <span className="tooltip-text">{q.tip}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
}

export default DrawingAnalyzer; 