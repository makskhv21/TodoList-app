import React, { useState } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState('');

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

    const handleTaskSubmit = () => {
        if (taskText.trim() && selectedDay !== null) {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
            setTasks((prev) => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), taskText],
            }));
            setTaskText('');
        }
    };

    const changeMonth = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const openModal = (day) => {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        setCurrentTasks(tasks[dateKey] || []);
        setSelectedDay(day);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentTasks([]);
        setEditIndex(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const deleteTask = (index) => {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
        const updatedTasks = [...currentTasks];
        updatedTasks.splice(index, 1);
        setTasks((prev) => ({
            ...prev,
            [dateKey]: updatedTasks,
        }));
        setCurrentTasks(updatedTasks);
    };

    const editTask = (index) => {
        setEditIndex(index);
        setEditedText(currentTasks[index]);
    };

    const saveTask = () => {
        if (editedText.trim()) {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
            const updatedTasks = [...currentTasks];
            updatedTasks[editIndex] = editedText;
            setTasks((prev) => ({
                ...prev,
                [dateKey]: updatedTasks,
            }));
            setCurrentTasks(updatedTasks);
            setEditIndex(null);
            setEditedText('');
        }
    };

    const selectDayForTask = (day) => {
        setSelectedDay(day);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)} className="month-button">Previous</button>
                <h3 className="calendar-title">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h3>
                <button onClick={() => changeMonth(1)} className="month-button">Next</button>
            </div>
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
            <div className="task-input-container">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Enter your task"
                    className="task-input"
                />
                <button onClick={handleTaskSubmit} className="add-task-button">Add Task</button>
            </div>

            {modalVisible && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h4>Tasks for {currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}</h4>
                        {currentTasks.length > 0 ? (
                            <ul>
                                {currentTasks.map((task, index) => (
                                    <li key={index} className="task">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                            />
                                        ) : (
                                            <span>{task}</span>
                                        )}
                                        <div className="task-actions">
                                            <button onClick={() => deleteTask(index)} className="delete-task-button">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                            {editIndex === index ? (
                                                <button onClick={saveTask} className="save-task-button">
                                                    <FontAwesomeIcon icon={faSave} />
                                                </button>
                                            ) : (
                                                <button onClick={() => editTask(index)} className="edit-task-button">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tasks for this day.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;