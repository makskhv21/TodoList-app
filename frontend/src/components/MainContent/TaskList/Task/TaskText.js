import React from 'react';

function TaskText({
  isEditing,
  taskText,
  editingTaskText,
  setEditingTaskText,
  onEdit,
}) {
  return isEditing ? (
    <input
      style={{
        width: '65%',
        marginLeft: '5px',
        marginBottom: '8px',
        marginRight: '10px',
      }}
      type="text"
      value={editingTaskText}
      onChange={(e) => {
        e.stopPropagation();
        setEditingTaskText(e.target.value);
      }}
    />
  ) : (
    <span
      onDoubleClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
    >
      {taskText}
    </span>
  );
}

export default TaskText;
