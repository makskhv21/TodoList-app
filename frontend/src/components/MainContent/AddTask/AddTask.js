import React, { useState } from "react";

function AddTask({ addTask }) {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            const newTaskObject = {
                id: Date.now(),
                text: newTask, 
                completed: false,
                important: false,
                createdAt: new Date().toISOString(),
            };
            addTask(newTaskObject);
            setNewTask('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder="Enter a new task" 
            />
            <button onClick={handleAddTask}>+ Add Task</button>
        </div>
    );
}

export default AddTask;