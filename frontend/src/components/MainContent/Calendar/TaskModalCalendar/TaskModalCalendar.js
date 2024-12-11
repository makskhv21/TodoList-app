import React from "react";
import { FaTrashAlt } from "react-icons/fa";


const TaskModalCalendar = ({
    tasksForDate,
    handleTaskDoubleClick,
    editingTask,
    editedText,
    setEditedText,
    handleKeyDown,
    toggleTaskCompletion,
    toggleImportant,
    deleteTask,
    completedTasksForDate,
}) => {
    return (
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
    )
};

export default TaskModalCalendar;