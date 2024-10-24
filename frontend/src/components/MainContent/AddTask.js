import React, { useState } from "react";

function AddTask({ addTask }) {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            const newTaskObject = {
                id: Date.now(),
                text: newTask, 
                completed: false,
            };
            addTask(newTaskObject);
            setNewTask('');
        }
    };

    return (
        <div className="add-task">
            <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="Enter a new task" 
            />
            <button onClick={handleAddTask}>+ Add Task</button>
        </div>
    );
}

export default AddTask;