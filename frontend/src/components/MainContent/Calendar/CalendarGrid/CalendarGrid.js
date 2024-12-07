import React from 'react';

const CalendarGrid = ({ currentDate, adjustedFirstDay, daysInMonth, tasks, openModal, selectDayForTask }) => {
    return (
        <div className="calendar-grid">
            <div className="calendar-header-days">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div className="calendar-day-header" key={day}>{day}</div>
                ))}
            </div>
            <div className="calendar-body">
                {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                    <div key={i} className="calendar-cell empty-cell"></div>
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
                    const hasTasks = tasks[dateKey]?.length > 0;

                    return (
                        <div key={day} className="calendar-cell" onClick={() => selectDayForTask(day)}>
                            <div className="day-number">{day}</div>
                            <div
                                className="task-list-calendar"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(day);
                                }}
                            >
                                {hasTasks ? (
                                    <div className="task-count">Tasks: {tasks[dateKey].length}</div>
                                ) : (
                                    <div className="no-tasks">No tasks</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;