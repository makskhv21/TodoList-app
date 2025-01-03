import { useState, useEffect } from 'react';

export const useCalendarWeek = (
  tasks,
  addEventToTaskList,
  toggleTaskCompletion,
  deleteTask,
  editTask,
  deleteAllTasksForDate
) => {
  const [eventsByDay, setEventsByDay] = useState({});
  const [newEventByDay, setNewEventByDay] = useState({});
  const [editingEvent, setEditingEvent] = useState({
    day: null,
    id: null,
    text: '',
  });

  useEffect(() => {
    const eventsForTasks = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.createdAt).toDateString();
      if (!eventsForTasks[taskDate]) eventsForTasks[taskDate] = [];
      eventsForTasks[taskDate].push(task);
    });
    setEventsByDay(eventsForTasks);
  }, [tasks]);

  const addEvent = (day) => {
    const newEvent = newEventByDay[day]?.trim();
    if (newEvent) {
      const event = {
        id: Date.now(),
        text: newEvent,
        completed: false,
        createdAt: new Date(day),
      };
      addEventToTaskList(event);
      setNewEventByDay((prev) => ({ ...prev, [day]: '' }));
    }
  };

  const deleteEvent = (day, id) => {
    setEventsByDay((prev) => ({
      ...prev,
      [day]: prev[day].filter((event) => event.id !== id),
    }));
    deleteTask(id);
  };

  const toggleCompletion = (day, id) => {
    setEventsByDay((prev) => ({
      ...prev,
      [day]: prev[day].map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      ),
    }));
    toggleTaskCompletion(id);
  };

  const startEditing = (day, id) => {
    const event = eventsByDay[day]?.find((task) => task.id === id);
    if (event) {
      setEditingEvent({ day, id, text: event.text });
    }
  };

  const saveEdit = () => {
    if (editingEvent.text.trim()) {
      const { day, id, text } = editingEvent;
      setEventsByDay((prev) => ({
        ...prev,
        [day]: prev[day].map((event) =>
          event.id === id ? { ...event, text } : event
        ),
      }));
      editTask(id, text);
      setEditingEvent({ day: null, id: null, text: '' });
    }
  };

  const handleDeleteAllTasks = (day) => {
    if (
      window.confirm('Are you sure you want to delete all tasks for this day?')
    ) {
      deleteAllTasksForDate(day);
    }
  };

  return {
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
  };
};
