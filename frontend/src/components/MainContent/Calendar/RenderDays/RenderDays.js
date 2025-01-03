import React from 'react';

const RenderDays = ({
  currentMonth,
  selectedDate,
  tasks,
  handleDateClick,
  handleTaskClick,
}) => {
  const days = [];
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const startDayOfWeek = (startOfMonth.getDay() + 6) % 7;

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    const currentDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    ).toDateString();
    const tasksForThisDay = tasks.filter(
      (task) => new Date(task.createdAt).toDateString() === currentDay
    );
    const taskCount = tasksForThisDay.filter((task) => !task.completed).length;
    const allCompleted = tasksForThisDay.length && taskCount === 0;

    days.push(
      <div
        key={i}
        className={`calendar-day ${taskCount > 0 ? 'has-tasks' : ''} ${currentDay === selectedDate ? 'selected' : ''} ${allCompleted ? 'completed-tasks' : ''}`} // Додаємо клас для завершених завдань
        onClick={() => handleDateClick(currentDay)}
      >
        {i}
        <div className="task-count" onClick={() => handleTaskClick(currentDay)}>
          {taskCount > 0 ? `Tasks: ${taskCount}` : 'No Tasks'}
        </div>
      </div>
    );
  }

  return <>{days}</>;
};

export default RenderDays;
