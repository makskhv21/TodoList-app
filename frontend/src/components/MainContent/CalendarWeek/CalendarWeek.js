import React from 'react';
import { useCalendarWeek } from './hooks/useCalendarWeek';
import Day from './Day/Day';

const CalendarWeek = ({
  deleteAllTasksForDate,
  tasks,
  addEventToTaskList,
  toggleTaskCompletion,
  deleteTask,
  editTask,
  toggleImportant,
}) => {
  const {
    eventsByDay,
    newEventByDay,
    editingEvent,
    setNewEventByDay,
    setEditingEvent,
    addEvent,
    deleteEvent,
    toggleCompletion,
    startEditing,
    saveEdit,
    handleDeleteAllTasks,
  } = useCalendarWeek(
    tasks,
    addEventToTaskList,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    deleteAllTasksForDate
  );

  const renderDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayKey = date.toDateString();

      const eventsForDay = eventsByDay[dayKey] || [];
      const newEventText = newEventByDay[dayKey] || '';

      days.push(
        <Day
          key={dayKey}
          date={date}
          events={eventsForDay}
          newEventText={newEventText}
          onToggleImportant={toggleImportant}
          onNewEventChange={(e) =>
            setNewEventByDay((prev) => ({ ...prev, [dayKey]: e.target.value }))
          }
          onAddEvent={() => addEvent(dayKey)}
          onEdit={(id) => startEditing(dayKey, id)}
          onDelete={(id) => deleteEvent(dayKey, id)}
          onToggleCompletion={(id) => toggleCompletion(dayKey, id)}
          isEditing={editingEvent.id}
          onSave={saveEdit}
          editingText={editingEvent.text}
          onTextChange={(e) =>
            setEditingEvent((prev) => ({ ...prev, text: e.target.value }))
          }
          onDeleteAllTasks={() => handleDeleteAllTasks(dayKey)}
        />
      );
    }
    return days;
  };

  return (
    <div className="calendarWeek">
      <div className="calendarWeek-grid">{renderDays()}</div>
    </div>
  );
};

export default CalendarWeek;
