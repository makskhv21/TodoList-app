import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const TaskItemCalendar = ({
  task,
  isEditing,
  editedText,
  setEditedText,
  handleKeyDown,
  toggleTaskCompletion,
  toggleImportant,
  deleteTask,
  handleTaskDoubleClick,
}) => (
  <li
    key={task.id}
    className={`calendar-task-item ${task.completed ? 'completed-task' : ''}`}
    onDoubleClick={() => handleTaskDoubleClick(task)}
  >
    {isEditing ? (
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="calendar-task-edit-input"
      />
    ) : (
      <>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="calendar-task-checkbox"
        />
        <span
          className={`calendar-task-text ${task.important ? 'important' : ''}`}
        >
          {task.text}
        </span>
      </>
    )}
    <button
      onClick={() => toggleImportant(task.id)}
      className="calendar-important-btn"
    >
      {task.important ? '★' : '☆'}
    </button>
    <button onClick={() => deleteTask(task.id)} className="calendar-delete-btn">
      <FaTrashAlt />
    </button>
  </li>
);

export default TaskItemCalendar;
