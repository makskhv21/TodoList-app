import React from "react";
import Task from "./Task";

function TaskList({ tasks, toggleTaskCompletion, editTask, deleteTask, editingTaskId, setEditingTaskId, editingTaskText, setEditingTaskText, handleSaveEdit }) {
    return(
        <div className="task-list">
            {tasks.map(task => (
                <Task 
                    key={task.id}
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    onEdit={() => {
                        setEditingTaskId(task.id);
                        setEditingTaskText(task.text);
                    }}
                    onDelete={() => deleteTask(task.id)}
                    isEditing={editingTaskId === task.id}
                    editingTaskText={editingTaskText}
                    setEditingTaskText={setEditingTaskText}
                    handleSaveEdit={handleSaveEdit}
                />
            ))}
        </div>
    )
}

export default TaskList;