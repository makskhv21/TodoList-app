import React, { useState } from "react";
import Task from "../TaskList/Task";

function TaskList({ 
    toggleImportant, 
    tasks, 
    toggleTaskCompletion, 
    deleteTask, 
    editingTaskId, 
    setEditingTaskId, 
    editingTaskText, 
    setEditingTaskText, 
    handleSaveEdit, 
    menuTask, 
    setMenuTask, 
    setSelectedTask,  
}) {
    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    const [showCompleted, setShowCompleted] = useState(false); 

    const handleToggleCompleted = () => {
        setShowCompleted(prevState => !prevState);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setMenuTask(prev => !prev);
    };

    return (
        <div className="task-list">
            {/* Incomplete Tasks */}
            {incompleteTasks.map(task => (
                <Task 
                    key={task.id}
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    toggleImportant={toggleImportant}
                    onEdit={() => {
                        setEditingTaskId(task.id);
                        setEditingTaskText(task.text);
                    }}
                    onDelete={() => deleteTask(task.id)}
                    isEditing={editingTaskId === task.id}
                    editingTaskText={editingTaskText}
                    setEditingTaskText={setEditingTaskText}
                    handleSaveEdit={handleSaveEdit}
                    onClick={() => handleTaskClick(task)}
                />
            ))}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
                <div className="completed-tasks">
                    <h3 onClick={handleToggleCompleted} style={{ cursor: 'pointer' }}>
                        {showCompleted ? 'Завершені ▲' : 'Завершені ▼'}
                    </h3>
                    {showCompleted && completedTasks.map(task => (
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
            )}
            {menuTask && (
                <div className="task-menu">
                    <h3>Дії з завданням</h3>
                    <button>Кроки цього завдання</button>
                    <button>Нагадати</button>
                    <button>Додати термін</button>
                    <button>Повторювати</button>
                    <button>Додати файл</button>
                    <button>Додати нотатки</button>
                </div>
            )}
        </div>
    );
}

export default TaskList;