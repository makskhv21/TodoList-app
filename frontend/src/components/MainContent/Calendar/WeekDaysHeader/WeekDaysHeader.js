import React from "react";

const WeekDaysHeader = () => {
    return (
        <div className="calendar-week-days">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, index) => (
                <div key={index} className="calendar-week-day">{day}</div>
            ))}
        </div>
    );
};

export default WeekDaysHeader;