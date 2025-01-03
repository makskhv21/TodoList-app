import React from 'react';
import TaskList from '../TaskList/TaskList';
import Calendar from '../Calendar/Calendar';
import CalendarWeek from '../CalendarWeek/CalendarWeek';

const TaskRenderer = ({
  selectedProject,
  tasks,
  sortedTasks,
  toggleTaskCompletion,
  deleteTask,
  editingTaskId,
  setEditingTaskId,
  editingTaskText,
  setEditingTaskText,
  handleSaveEdit,
  toggleImportant,
  addTask,
  editTask,
  deleteAllTasksForDate,
  addEventToTaskList,
}) => {
  if (selectedProject === 'Next 7 days') {
    return (
      <CalendarWeek
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        addEventToTaskList={addEventToTaskList}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleImportant={toggleImportant}
        deleteAllTasksForDate={deleteAllTasksForDate}
      />
    );
  }
  if (selectedProject === 'Calendar') {
    return (
      <Calendar
        tasks={tasks}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleImportant={toggleImportant}
        deleteAllTasksForDate={deleteAllTasksForDate}
      />
    );
  }
  return (
    <TaskList
      tasks={sortedTasks}
      toggleTaskCompletion={toggleTaskCompletion}
      deleteTask={deleteTask}
      editingTaskId={editingTaskId}
      setEditingTaskId={setEditingTaskId}
      editingTaskText={editingTaskText}
      setEditingTaskText={setEditingTaskText}
      handleSaveEdit={handleSaveEdit}
      toggleImportant={toggleImportant}
    />
  );
};

export default TaskRenderer;
