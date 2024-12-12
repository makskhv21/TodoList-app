import React, { useState } from 'react';
import './Term.css';

function Term({ selectedTask, setMenuTask, menuTask }) {
  const [termDate, setTermDate] = useState('');

  const handleSetTermDate = () => {
    if (selectedTask && termDate) {
      setMenuTask((prev) => ({
        ...prev,
        [selectedTask.id]: {
          ...prev[selectedTask.id],
          term: termDate,
        },
      }));
      setTermDate('');
      alert(`Термін встановлено на ${termDate}`);
    }
  };

  const handleDeleteTermDate = () => {
    if (selectedTask) {
      setMenuTask((prev) => ({
        ...prev,
        [selectedTask.id]: {
          ...prev[selectedTask.id],
          term: null,
        },
      }));
    }
  };

  return (
    <div className="container-term">
      <div className="container-term-input">
        <input
          type="date"
          value={termDate}
          onChange={(e) => setTermDate(e.target.value)}
          className="term-input"
        />
        <button onClick={handleSetTermDate} className="term-button">
          Додати
        </button>
      </div>
      {menuTask[selectedTask.id]?.term && (
        <div className="term-info">
          <p>Термін встановлено на: {menuTask[selectedTask.id].term}</p>
          <button className="delete-button" onClick={handleDeleteTermDate}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default Term;
