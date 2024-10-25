import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'; 

const Calendar = () => {
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
                <div className="day" key={i}>
                    <h4>{date.toDateString()}</h4>
                    <ul>
                        {eventsForDay.map(event => (
                            <li key={event.id} style={{ textDecoration: event.completed ? 'line-through' : 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={event.completed}
                                    onChange={() => toggleCompletion(dayKey, event.id)}
                                />
                                {editingEventId === event.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingEventText}
                                            onChange={(e) => setEditingEventText(e.target.value)}
                                        />
                                        <button onClick={saveEdit}>
                                            <FontAwesomeIcon icon={faSave} /> 
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {event.text}
                                        <div className="group-task">
                                            <button onClick={() => editEvent(dayKey, event.id)}>
                                                <FontAwesomeIcon icon={faEdit} /> 
                                            </button>
                                            <button onClick={() => deleteEvent(dayKey, event.id)}>
                                                <FontAwesomeIcon icon={faTrash} /> 
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={newEventText}
                            onChange={(e) => setNewEventByDay({
                                ...newEventByDay,
                                [dayKey]: e.target.value,
                            })}
                            placeholder="New event"
                            style={{ 
                                flex: 1, 
                                marginRight: '10px',
                            }} 
                        />
                        <button onClick={() => addEvent(dayKey)}>Add Task</button>
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar">
            <div className="calendar-grid">
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;