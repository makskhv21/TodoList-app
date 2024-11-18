import React, { useState } from "react";
import './TaskList'

import Task from "./Task/Task";
import MenuTask from "./MenuTask/MenuTask"

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
}) { 

    const [menuTask, setMenuTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); 
    const [showCompleted, setShowCompleted] = useState(false); 

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setMenuTask(prev => ({
            ...prev,
            [task.id]: {
                ...prev[task.id],
                visible: !prev[task.id]?.visible,
                steps: prev[task.id]?.steps || []
            }
        }));
    };
    
    const handleToggleCompleted = () => {
        setShowCompleted(prevState => !prevState);
    };
    
    return (
        <div className="task-list">
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
                    isMenuVisible={selectedTask?.id === task.id && menuTask[task.id]?.visible}
                />
            ))}

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
                            onClick={() => handleTaskClick(task)}
                            isMenuVisible={selectedTask?.id === task.id && menuTask[task.id]?.visible}
                        />
                    ))}
                </div>
            )}

            {selectedTask && menuTask[selectedTask.id]?.visible && (
                <MenuTask menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} tasks={tasks} />
            )}
        </div>
    );
}

export default TaskList;