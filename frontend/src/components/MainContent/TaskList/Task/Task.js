import React from 'react';
import TaskCheckbox from './TaskCheckbox';
import TaskText from './TaskText';
import TaskActions from './TaskActions';

function Task({
  task,
  toggleTaskCompletion,
  onEdit,
  onDelete,
  isEditing,
  editingTaskText,
  setEditingTaskText,
  handleSaveEdit,
  toggleImportant,
  onClick,
  isMenuVisible,
}) {
  const handleTaskClick = (e) => {
    if (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'svg' ||
      e.target.tagName === 'path'
    ) {
      return;
    }
    onClick();
  };

  return (
    <div
      className={`task-container ${isMenuVisible ? 'task-expanded' : ''}`}
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      onClick={handleTaskClick}
    >
      <TaskCheckbox
        completed={task.completed}
        toggleTaskCompletion={toggleTaskCompletion}
        taskId={task.id}
      />
      <TaskText
        isEditing={isEditing}
        taskText={task.text}
        editingTaskText={editingTaskText}
        setEditingTaskText={setEditingTaskText}
        onEdit={onEdit}
      />
      <TaskActions
        task={task}
        toggleImportant={toggleImportant}
        onDelete={onDelete}
        isEditing={isEditing}
        handleSaveEdit={handleSaveEdit}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Task;
