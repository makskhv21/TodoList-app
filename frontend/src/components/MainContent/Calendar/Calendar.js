import React from 'react';
import MonthNavigation from './MonthNavigation/MonthNavigation';
import WeekDaysHeader from './WeekDaysHeader/WeekDaysHeader';
import RenderDays from './RenderDays/RenderDays';
import AddTaskCalendar from './AddTaskCalendar/AddTaskCalendar';
import TaskModalCalendar from './TaskModalCalendar/TaskModalCalendar';

import { useCalendarLogic } from './hooks/useCalendarLogic';
import './Calendar.css';

const Calendar = ({
  tasks,
  addTask,
  toggleImportant,
  deleteTask,
  editTask,
  toggleTaskCompletion,
  deleteAllTasksForDate,
}) => {
  const {
    currentMonth,
    selectedDate,
    setSelectedDate,
    newTaskText,
    setNewTaskText,
    showModal,
    editingTask,
    editedText,
    setEditedText,
    changeMonth,
    filterTasksByDate,
    handleAddTask,
    closeModal,
    openTaskModal,
    handleDeleteAllTasks,
  } = useCalendarLogic(tasks, addTask, editTask, deleteAllTasksForDate);

  const tasksForDate = filterTasksByDate(false);
  const completedTasksForDate = filterTasksByDate(true);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editingTask) {
      editTask(editingTask.id, editedText);
      setEditedText('');
      closeModal();
    }
  };

  return (
    <div className="calendar-container">
      <MonthNavigation currentMonth={currentMonth} changeMonth={changeMonth} />
      <WeekDaysHeader />

      <div className="calendar-grid">
        <RenderDays
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          tasks={tasks}
          handleDateClick={setSelectedDate}
          handleTaskClick={openTaskModal}
        />
      </div>

      <AddTaskCalendar
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        handleAddTask={handleAddTask}
      />

      {showModal && (
        <div className="calendar-modal">
          <div className="calendar-modal-content">
            <span className="calendar-close-btn" onClick={closeModal}>
              ×
            </span>
            <h3 className="calendar-modal-title">Tasks for {selectedDate}</h3>

            <TaskModalCalendar
              tasksForDate={tasksForDate}
              handleTaskDoubleClick={openTaskModal}
              editingTask={editingTask}
              editedText={editedText}
              setEditedText={setEditedText}
              handleKeyDown={handleKeyDown}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleImportant={toggleImportant}
              deleteTask={deleteTask}
              completedTasksForDate={completedTasksForDate}
            />

            <button
              onClick={handleDeleteAllTasks}
              className="calendar-delete-all-btn"
            >
              Delete All Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
