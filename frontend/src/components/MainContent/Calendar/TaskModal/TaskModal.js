import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const TaskModal = ({ currentTasks, setCurrentTasks, selectedDay, closeModal, tasks, setTasks, editIndex, setEditIndex, editedText, setEditedText }) => {
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

    const editTask = (index) => {
        setEditIndex(index);
        setEditedText(currentTasks[index]);
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
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <h4>Tasks for {new Date().toLocaleString('default', { month: 'long' })} {selectedDay}</h4>
                {currentTasks.length > 0 ? (
                    <ul>
                        {currentTasks.map((task, index) => (
                            <li key={index} className="task">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="edit-task-input"
                                    />
                                ) : (
                                    <span>{task}</span>
                                )}
                                <button onClick={() => editTask(index)} className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => deleteTask(index)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                                {editIndex === index && (
                                    <button onClick={saveTask} className="save-button">
                                        <FontAwesomeIcon icon={faSave} />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks for this day</p>
                )}
            </div>
        </div>
    );
};

export default TaskModal;
