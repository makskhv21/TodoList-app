import React from 'react';

const CalendarHeader = ({ currentDate, changeMonth }) => {
    return (
        <div className="calendar-header">
            <button onClick={() => changeMonth(-1)} className="month-button">Previous</button>
            <h3 className="calendar-title">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h3>
            <button onClick={() => changeMonth(1)} className="month-button">Next</button>
        </div>
    );
};

export default CalendarHeader;
