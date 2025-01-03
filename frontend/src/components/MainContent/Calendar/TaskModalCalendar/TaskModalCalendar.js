import React from 'react';

import TaskListCalendar from './TaskListCalendar/TaskListCalendar';

const TaskModalCalendar = ({
  tasksForDate,
  handleTaskDoubleClick,
  editingTask,
  editedText,
  setEditedText,
  handleKeyDown,
  toggleTaskCompletion,
  toggleImportant,
  deleteTask,
  completedTasksForDate,
}) => {
  return (
    <>
      <TaskListCalendar
        tasks={tasksForDate}
        editingTask={editingTask}
        editedText={editedText}
        setEditedText={setEditedText}
        handleKeyDown={handleKeyDown}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleImportant={toggleImportant}
        deleteTask={deleteTask}
        handleTaskDoubleClick={handleTaskDoubleClick}
      />
      <TaskListCalendar
        tasks={completedTasksForDate}
        editingTask={editingTask}
        editedText={editedText}
        setEditedText={setEditedText}
        handleKeyDown={handleKeyDown}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleImportant={toggleImportant}
        deleteTask={deleteTask}
        handleTaskDoubleClick={handleTaskDoubleClick}
      />
    </>
  );
};

export default TaskModalCalendar;
