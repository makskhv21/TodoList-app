import React from 'react';

const AddTaskCalendar = ({ newTaskText, setNewTaskText, handleAddTask }) => {
  return (
    <div className="calendar-add-task">
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Enter new task"
        className="calendar-task-input"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
      />
      <button onClick={handleAddTask} className="calendar-add-btn">
        Add Task
      </button>
    </div>
  );
};

export default AddTaskCalendar;
