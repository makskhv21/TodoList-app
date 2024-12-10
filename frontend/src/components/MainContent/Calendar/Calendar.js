import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./Calendar.css";

const Calendar = ({ tasks, addTask, toggleImportant, deleteTask, editTask, toggleTaskCompletion, deleteAllTasksForDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [newTaskText, setNewTaskText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");

    const handleDateClick = (date) => setSelectedDate(date);

    const handleTaskClick = (task) => {
        setEditingTask(task);
        setEditedText(task.text);
        setShowModal(true);
    };

    const handleAddTask = () => {
        if (newTaskText.trim()) {
            const newTask = {
                id: Date.now(),
                text: newTaskText,
                createdAt: selectedDate,
                completed: false,
                important: false,
            };

            addTask(newTask);
            setNewTaskText("");
        }
    };

    const changeMonth = (offset) => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
        setCurrentMonth(newMonth);
    };

    const tasksForDate = tasks.filter(
        (task) => new Date(task.createdAt).toDateString() === selectedDate && !task.completed
    );
    const completedTasksForDate = tasks.filter(
        (task) => new Date(task.createdAt).toDateString() === selectedDate && task.completed
    );

    const renderDays = () => {
        const days = [];
        const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDayOfWeek = (startOfMonth.getDay() + 6) % 7;

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let i = 1; i <= endOfMonth.getDate(); i++) {
            const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i).toDateString();
            const taskCount = tasks.filter(
                (task) => new Date(task.createdAt).toDateString() === currentDay && !task.completed
            ).length;

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${taskCount > 0 ? "has-tasks" : ""} ${currentDay === selectedDate ? "selected" : ""}`}
                    onClick={() => handleDateClick(currentDay)}
                >
                    {i}
                    <div className="task-count" onClick={handleTaskClick}>
                        {taskCount > 0 ? `Tasks: ${taskCount}` : "No Tasks"}
                    </div>
                </div>
            );
        }

        return days;
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTask(null);
    };    

    const handleDeleteAllTasks = () => {
        if (window.confirm("Are you sure you want to delete all tasks for this date?")) {
            deleteAllTasksForDate(selectedDate);
        }
        closeModal();
    };

    const handleEditTask = () => {
        if (editedText.trim() !== "") {
            editTask(editingTask.id, editedText);
            setEditingTask(null);
        }
    };
    const handleTaskDoubleClick = (task) => {
        setEditingTask(task);
        setEditedText(task.text);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEditTask();
        }
    };

    return (
        <div className="calendar-container">
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

            <div className="calendar-week-days">
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, index) => (
                    <div key={index} className="calendar-week-day">{day}</div>
                ))}
            </div>

            <div className="calendar-grid">{renderDays()}</div>

            <div className="calendar-add-task">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Enter new task"
                    className="calendar-task-input"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTask();
                        }
                    }}
                />
                <button onClick={handleAddTask} className="calendar-add-btn">Add Task</button>
            </div>

            {showModal && (
                <div className="calendar-modal">
                    <div className="calendar-modal-content">
                        <span className="calendar-close-btn" onClick={closeModal}>×</span>
                        <h3 className="calendar-modal-title">Tasks for {selectedDate}</h3>
                        <ul className="calendar-task-list">
                        {tasksForDate.map((task) => (
                            <li
                                key={task.id}
                                className="calendar-task-item"
                                onDoubleClick={() => handleTaskDoubleClick(task)}
                            >
                                {editingTask && editingTask.id === task.id ? (
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="calendar-task-edit-input"
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                            className="calendar-task-checkbox"
                                        />
                                        <span className={`calendar-task-text ${task.important ? "important" : ""}`}>
                                            {task.text}
                                        </span>
                                    </>
                                )}
                                <button onClick={() => toggleImportant(task.id)} className="calendar-important-btn">
                                    {task.important ? "★" : "☆"}
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="calendar-delete-btn">
                                    <FaTrashAlt />
                                </button>
                            </li>
                        ))}

                            {completedTasksForDate.map((task) => (
                                <li key={task.id} className="calendar-task-item completed-task">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(task.id)}
                                        className="calendar-task-checkbox"
                                    />
                                    <span className="calendar-task-text completed">
                                        {task.text}
                                    </span>
                                    <button onClick={() => toggleImportant(task.id)} className="calendar-important-btn">
                                        {task.important ? "★" : "☆"}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="calendar-delete-btn">
                                        <FaTrashAlt />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button onClick={handleDeleteAllTasks} className="calendar-delete-all-btn">
                            Delete All Tasks
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;