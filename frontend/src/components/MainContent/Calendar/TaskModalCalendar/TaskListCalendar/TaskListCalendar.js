import React from 'react';
import TaskItemCalendar from './TaskItemCalendar/TaskItemCalendar';

const TaskListCalendar = ({
  tasks,
  editingTask,
  editedText,
  setEditedText,
  handleKeyDown,
  toggleTaskCompletion,
  toggleImportant,
  deleteTask,
  handleTaskDoubleClick,
}) => (
  <ul className="calendar-task-list">
    {tasks.map((task) => (
      <TaskItemCalendar
        key={task.id}
        task={task}
        isEditing={editingTask && editingTask.id === task.id}
        editedText={editedText}
        setEditedText={setEditedText}
        handleKeyDown={handleKeyDown}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleImportant={toggleImportant}
        deleteTask={deleteTask}
        handleTaskDoubleClick={handleTaskDoubleClick}
      />
    ))}
  </ul>
);

export default TaskListCalendar;
