import React, { useState, useEffect } from "react";
import Day from './Day/Day';

const CalendarWeek = ({ deleteAllTasksForDate, tasks, addEventToTaskList, toggleTaskCompletion, deleteTask, editTask, toggleImportant }) => {
    const [eventsByDay, setEventsByDay] = useState({});
    const [newEventByDay, setNewEventByDay] = useState({});
    const [editingEvent, setEditingEvent] = useState({ day: null, id: null, text: '' });

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
        const todayKey = new Date().toDateString();
        const newEvent = newEventByDay[day]?.trim();
      
        if (newEvent) {
            const event = { id: Date.now(), text: newEvent, completed: false, createdAt: new Date(day) };
      
            addEventToTaskList(event);
      
            const eventsForTasks = {};
            tasks.forEach((task) => {
                const taskDate = new Date(task.createdAt).toDateString();
                if (!eventsForTasks[taskDate]) eventsForTasks[taskDate] = [];
                eventsForTasks[taskDate].push(task);
            });
            setEventsByDay(eventsForTasks);
            setNewEventByDay(prev => ({ ...prev, [day]: '' }));
        }
    };

    const deleteEvent = (day, id) => {
        setEventsByDay(prev => ({
            ...prev,
            [day]: prev[day].filter(event => event.id !== id),
        }));
        deleteTask(id);
    };

    const toggleCompletion = (day, id) => {
        setEventsByDay(prev => ({
            ...prev,
            [day]: prev[day].map(event =>
                event.id === id ? { ...event, completed: !event.completed } : event
            ),
        }));
        toggleTaskCompletion(id);
    };

    const startEditing = (day, id) => {
        const event = eventsByDay[day]?.find(task => task.id === id);
        if (event) {
            setEditingEvent({ day, id, text: event.text });
        }
    };

    const saveEdit = () => {
        if (editingEvent.text.trim()) {
            const { day, id, text } = editingEvent;
            setEventsByDay(prev => ({
                ...prev,
                [day]: prev[day].map(event =>
                    event.id === id ? { ...event, text } : event
                ),
            }));
            editTask(id, text);
            setEditingEvent({ day: null, id: null, text: '' });
        }
    };

    const handleDeleteAllTasks = (day) => {
        const confirmDelete = window.confirm("Are you sure you want to delete all tasks for this day?");
        
        if (confirmDelete) {
            deleteAllTasksForDate(day);
        }
    };

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
                <div key={dayKey}>
                    <Day
                        key={dayKey}
                        date={date}
                        events={eventsForDay}
                        newEventText={newEventText}
                        onToggleImportant={(id) => toggleImportant(id)}
                        onNewEventChange={(e) => setNewEventByDay(prev => ({
                            ...prev,
                            [dayKey]: e.target.value,
                        }))} 
                        onAddEvent={() => addEvent(dayKey)}
                        onEdit={(id) => startEditing(dayKey, id)}
                        onDelete={(id) => deleteEvent(dayKey, id)}
                        onToggleCompletion={(id) => toggleCompletion(dayKey, id)}
                        isEditing={editingEvent.id}
                        onSave={saveEdit}
                        editingText={editingEvent.text}
                        onTextChange={(e) =>
                            setEditingEvent(prev => ({ ...prev, text: e.target.value }))
                        }
                        onDeleteAllTasks={() => handleDeleteAllTasks(dayKey)} 
                    />
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendarWeek">
            <div className="calendarWeek-grid">
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarWeek;
