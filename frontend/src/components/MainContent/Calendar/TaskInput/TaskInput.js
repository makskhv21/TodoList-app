import React from 'react';

const TaskInput = ({ taskText, setTaskText, handleTaskSubmit }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTaskSubmit();
        }
    };
    
    return (
        <div className="task-input-container">
            <input
                type="text"
                value={taskText}
                onKeyDown={handleKeyDown}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter your task"
                className="task-input"
            />
            <button onClick={handleTaskSubmit} className="add-task-button">Add Task</button>
        </div>
    );
};

export default TaskInput;
