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
}) {
    const [selectedTask, setSelectedTask] = useState(null);  
    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    const [showCompleted, setShowCompleted] = useState(false); 
    const [newStep, setNewStep] = useState("");  
    const [editingStepIndex, setEditingStepIndex] = useState(null); 
    const [editingStepText, setEditingStepText] = useState("");

    const handleToggleCompleted = () => {
        setShowCompleted(prevState => !prevState);
    };

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

    const handleAddStep = () => {
        if (selectedTask && newStep.trim()) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    steps: [...(prev[selectedTask.id]?.steps || []), { text: newStep, completed: false }]  // Add new step with completed state
                }
            }));
            setNewStep("");  
        }
    };

    const handleStepToggle = (index) => {
        if (selectedTask) {
            const currentSteps = menuTask[selectedTask.id]?.steps || [];
            const updatedSteps = currentSteps.map((step, i) => 
                i === index ? { ...step, completed: !step.completed } : step
            );
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    steps: updatedSteps
                }
            }));
        }
    };

    const handleEditStep = (index, text) => {
        setEditingStepIndex(index);
        setEditingStepText(text);
    };

    const handleSaveStepEdit = (index) => {
        if (selectedTask) {
            const currentSteps = menuTask[selectedTask.id]?.steps || [];
            const updatedSteps = currentSteps.map((step, i) => 
                i === index ? { ...step, text: editingStepText } : step
            );
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    steps: updatedSteps
                }
            }));
            setEditingStepIndex(null);
            setEditingStepText("");
        }
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
                        />
                    ))}
                </div>
            )}

            {selectedTask && menuTask[selectedTask.id]?.visible && (
                <div className="task-menu">
                    <h3>Дії з завданням</h3>
                    <input 
                        type="text" 
                        value={newStep} 
                        onChange={(e) => setNewStep(e.target.value)} 
                        placeholder="Введіть крок" 
                    />
                    <ul className="task-steps-list">
                        {menuTask[selectedTask.id]?.steps?.map((step, index) => (
                            <li key={index} className="task-step" style={{ textDecoration: step.completed ? 'line-through' : 'none' }}>
                                <input 
                                    type="checkbox" 
                                    checked={step.completed} 
                                    onChange={() => handleStepToggle(index)} 
                                    className="step-checkbox"
                                />
                                {editingStepIndex === index ? (
                                    <input
                                        type="text"
                                        value={editingStepText}
                                        onChange={(e) => setEditingStepText(e.target.value)}
                                        onBlur={() => handleSaveStepEdit(index)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') handleSaveStepEdit(index);
                                        }}
                                        style={{ flex: 1, marginLeft: '10px' }} 
                                    />
                                ) : (
                                    <span
                                        className="step-text"
                                        onDoubleClick={() => handleEditStep(index, step.text)} 
                                    >
                                        {step.text}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddStep}>Додати крок</button>
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