import React, { useState } from "react";
import Day from './Day';

const CalendarWeek = () => {
    const [eventsByDay, setEventsByDay] = useState({});
    const [newEventByDay, setNewEventByDay] = useState({});
    const [editingEventId, setEditingEventId] = useState(null);
    const [editingEventText, setEditingEventText] = useState('');
    const [selectedDay, setSelectedDay] = useState(null);

    const addEvent = (day) => {
        const newEvent = newEventByDay[day] || '';
        if (newEvent.trim()) {
            setEventsByDay((prevEvents) => {
                const eventsForDay = prevEvents[day] || [];
                return {
                    ...prevEvents,
                    [day]: [...eventsForDay, { id: Date.now(), text: newEvent, completed: false }],
                };
            });
            setNewEventByDay(prevState => ({
                ...prevState,
                [day]: '',
            }));
        }
    };

    const editEvent = (day, id) => {
        const eventToEdit = eventsByDay[day].find(event => event.id === id);
        setEditingEventId(id);
        setEditingEventText(eventToEdit.text);
        setSelectedDay(day);
    };

    const saveEdit = () => {
        setEventsByDay((prevEvents) => {
            const updatedEventsForDay = prevEvents[selectedDay].map(event =>
                event.id === editingEventId ? { ...event, text: editingEventText } : event
            );
            return {
                ...prevEvents,
                [selectedDay]: updatedEventsForDay,
            };
        });
        setEditingEventId(null);
        setEditingEventText('');
    };

    const deleteEvent = (day, id) => {
        setEventsByDay((prevEvents) => {
            const updatedEventsForDay = prevEvents[day].filter(event => event.id !== id);
            return {
                ...prevEvents,
                [day]: updatedEventsForDay,
            };
        });
    };

    const toggleCompletion = (day, id) => {
        setEventsByDay((prevEvents) => {
            const updatedEventsForDay = prevEvents[day].map(event =>
                event.id === id ? { ...event, completed: !event.completed } : event
            );
            return {
                ...prevEvents,
                [day]: updatedEventsForDay,
            };
        });
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
                <Day
                    key={i}
                    date={date}
                    events={eventsForDay}
                    newEventText={newEventText}
                    onNewEventChange={(e) => setNewEventByDay({
                        ...newEventByDay,
                        [dayKey]: e.target.value,
                    })}
                    onAddEvent={() => addEvent(dayKey)}
                    onEdit={(id) => editEvent(dayKey, id)}
                    onDelete={(id) => deleteEvent(dayKey, id)}
                    isEditing={editingEventId}
                    onSave={saveEdit}
                    editingText={editingEventText}
                    onTextChange={(e) => setEditingEventText(e.target.value)}
                />
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
