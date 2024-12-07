import React, { useState } from 'react';


const TaskModal = ({ 
    currentTasks, 
    setCurrentTasks, 
    selectedDay, 
    closeModal, 
    tasks, 
    setTasks, 
    editIndex, 
    setEditIndex, 
    editedText, 
    setEditedText 
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const deleteTask = (index) => {
        const dateKey = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${selectedDay}`;
        const updatedTasks = [...currentTasks];
        updatedTasks.splice(index, 1);
        setTasks((prev) => ({
            ...prev,
            [dateKey]: updatedTasks,
        }));
        setCurrentTasks(updatedTasks);
    };

    const handleDoubleClick = (index) => {
        setEditIndex(index);
        setEditedText(currentTasks[index]);
        setIsEditing(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && editedText.trim()) {
            saveTask();
        }
    };

    const saveTask = () => {
        if (editedText.trim()) {
            const dateKey = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${selectedDay}`;
            const updatedTasks = [...currentTasks];
            updatedTasks[editIndex] = editedText;
            setTasks((prev) => ({
                ...prev,
                [dateKey]: updatedTasks,
            }));
            setCurrentTasks(updatedTasks);
            setEditIndex(null);
            setEditedText('');
            setIsEditing(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <h4>Tasks for {new Date().toLocaleString('default', { month: 'long' })} {selectedDay}</h4>
                {currentTasks.length > 0 ? (
                    <div className="tasks-container">
                        <ul>
                            {currentTasks.map((task, index) => (
                                <li 
                                    key={index}
                                    className="task"
                                    onDoubleClick={() => handleDoubleClick(index)}
                                >
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className='text-task-calendar'>{task}</span>
                                    )}
                                    <button
                                        onClick={() => deleteTask(index)}
                                        style={{ color: 'white', marginLeft: '10px', marginRight: '10px' }}
                                    >
                                    ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No tasks for this day</p>
                )}
            </div>
        </div>
    );
};

export default TaskModal;