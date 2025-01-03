import React from 'react';

function TaskStep({
  step,
  index,
  handleStepToggle,
  handleEditStep,
  handleSaveStepEdit,
  editingStepIndex,
  editingStepText,
  setEditingStepText,
  handleDeleteStep,
}) {
  return (
    <li
      className="task-step"
      style={{
        textDecoration: step.completed ? 'line-through' : 'none',
      }}
    >
      <input
        type="checkbox"
        checked={step.completed}
        onChange={() => handleStepToggle(index)}
        className="step-checkbox"
      />
      {editingStepIndex === index ? (
        <input
          type="text"
          value={editingStepText}
          onChange={(e) => setEditingStepText(e.target.value)}
          onBlur={() => handleSaveStepEdit(index)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSaveStepEdit(index);
          }}
          style={{ flex: 1, marginLeft: '10px' }}
        />
      ) : (
        <span
          className="step-text"
          onDoubleClick={() => handleEditStep(index, step.text)}
          style={{
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            display: 'block',
            padding: '5px 0',
            maxWidth: '65%',
          }}
        >
          {step.text}
        </span>
      )}
      <button
        onClick={() => handleDeleteStep(index)}
        className="delete-step-button"
        style={{
          marginLeft: '25px',
          position: 'relative',
          bottom: '5px',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          color: 'black',
        }}
      >
        ✖
      </button>
    </li>
  );
}

export default TaskStep;
