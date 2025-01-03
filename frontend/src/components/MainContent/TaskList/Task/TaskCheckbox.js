import React from 'react';

function TaskCheckbox({ completed, toggleTaskCompletion, taskId }) {
  return (
    <input
      className="input-check"
      type="checkbox"
      checked={completed}
      onChange={(e) => {
        e.stopPropagation();
        toggleTaskCompletion(taskId);
      }}
    />
  );
}

export default TaskCheckbox;
