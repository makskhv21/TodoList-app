const MonthNavigation = ({ currentMonth, changeMonth }) => {
    return (
        <div className="calendar-month-nav">
            <button onClick={() => changeMonth(-1)} className="calendar-nav-btn">❮</button>
            <span className="calendar-month-title">
                {currentMonth
                    .toLocaleString("default", { month: "long", year: "numeric" })
                    .split(" ")
                    .map((part, index) =>
                        index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
                    )
                    .join(" ")}
            </span>
            <button onClick={() => changeMonth(1)} className="calendar-nav-btn">❯</button>
        </div>
    );
};

export default MonthNavigation;