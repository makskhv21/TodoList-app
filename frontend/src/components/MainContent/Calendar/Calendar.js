import React, { useState } from "react";

import MonthNavigation from "./MonthNavigation/MonthNavigation";
import WeekDaysHeader from "./WeekDaysHeader/WeekDaysHeader";
import TaskModalCalendar from "./TaskModalCalendar/TaskModalCalendar";
import AddTaskCalendar from "./AddTaskCalendar/AddTaskCalendar";
import RenderDays from "./RenderDays/RenderDays";

import "./Calendar.css";

const Calendar = ({ tasks, addTask, toggleImportant, deleteTask, editTask, toggleTaskCompletion, deleteAllTasksForDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [newTaskText, setNewTaskText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");

    const handleDateClick = (date) => setSelectedDate(date);
    const handleTaskClick = (task) => openTaskModal(task);
    const handleTaskDoubleClick = (task) => openTaskModal(task);

    const handleAddTask = () => {
        if (newTaskText.trim()) {
            const newTask = createNewTask(newTaskText);
            addTask(newTask);
            setNewTaskText("");
        }
    };
    
    const changeMonth = (offset) => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + offset, 1));
    
    const filterTasksByDate = (completed) => tasks.filter(
        (task) => new Date(task.createdAt).toDateString() === selectedDate && task.completed === completed
    );
    
    const tasksForDate = filterTasksByDate(false);
    const completedTasksForDate = filterTasksByDate(true);
    
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
        if (editedText.trim()) {
            editTask(editingTask.id, editedText);
            setEditingTask(null);
        }
    };
        
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleEditTask();
    };
    
    const createNewTask = (text) => ({
        id: Date.now(),
        text,
        createdAt: selectedDate,
        completed: false,
        important: false,
    });
    
    const openTaskModal = (task) => {
        setEditingTask(task);
        setEditedText(task.text);
        setShowModal(true);
    };    

    return (
        <div className="calendar-container">
            <MonthNavigation currentMonth={currentMonth} changeMonth={changeMonth} />
            <WeekDaysHeader />

            <div className="calendar-grid">
                <RenderDays
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    tasks={tasks}
                    handleDateClick={handleDateClick}
                    handleTaskClick={handleTaskClick}
                />
            </div>

            <AddTaskCalendar newTaskText={newTaskText} setNewTaskText={setNewTaskText} handleAddTask={handleAddTask} />

            {showModal && (
                <div className="calendar-modal">
                    <div className="calendar-modal-content">
                        <span className="calendar-close-btn" onClick={closeModal}>×</span>
                        <h3 className="calendar-modal-title">Tasks for {selectedDate}</h3>

                        <TaskModalCalendar
                            tasksForDate={tasksForDate}
                            handleTaskDoubleClick={handleTaskDoubleClick}
                            editingTask={editingTask}
                            editedText={editedText}
                            setEditedText={setEditedText}
                            handleKeyDown={handleKeyDown}
                            toggleTaskCompletion={toggleTaskCompletion}
                            toggleImportant={toggleImportant}
                            deleteTask={deleteTask}
                            completedTasksForDate={completedTasksForDate}
                        />

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