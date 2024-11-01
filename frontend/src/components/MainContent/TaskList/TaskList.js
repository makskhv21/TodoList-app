import React, { useState, useEffect } from "react";
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
    
    const [reminderDate, setReminderDate] = useState("");
    const [reminderTime, setReminderTime] = useState("");
    const [termDate, setTermDate] = useState("");

    const [repeatOption, setRepeatOption] = useState("none");
    const [customPeriod, setCustomPeriod] = useState(1);
    const [periodType, setPeriodType] = useState("days");

    const [selectedFile, setSelectedFile] = useState(null);


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
                    steps: [...(prev[selectedTask.id]?.steps || []), { text: newStep, completed: false }]
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

    const handleSetReminder = () => {
        if (selectedTask && reminderDate && reminderTime) {
            const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    reminder: reminderDateTime
                }
            }));

            setReminderDate("");
            setReminderTime("");
            alert(`Нагадування встановлено на ${reminderDateTime}`);
        }
    };

    const handleSetTermDate = () => {
        if (selectedTask && termDate) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    term: termDate
                }
            }));
            setTermDate("");
            alert(`Термін встановлено на ${termDate}`);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            tasks.forEach(task => {
                const taskReminder = menuTask[task.id]?.reminder;
                if (taskReminder && new Date() >= taskReminder) {
                    alert(`Час виконати завдання: "${task.text}"!`);
                    
                    setMenuTask(prev => ({
                        ...prev,
                        [task.id]: {
                            ...prev[task.id],
                            reminder: null 
                        }
                    }));
                }
            });
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [tasks, menuTask]);


    const handleSetRepeat = () => {
        if (selectedTask) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    repeatOption: repeatOption,
                    customPeriod: repeatOption === "custom" ? customPeriod : null,
                    periodType: repeatOption === "custom" ? periodType : null
                }
            }));
            alert(`Повторення встановлено на: ${repeatOption} ${repeatOption === "custom" ? `${customPeriod} ${periodType}` : ""}`);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = () => {
        if (selectedTask && selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    file: { name: selectedFile.name, url: fileURL }
                }
            }));
            setSelectedFile(null);
            alert("Файл додано до завдання.");
        }
    };

    const handleAddNote = () => {
        if (selectedTask && noteText.trim()) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    notes: [...(prev[selectedTask.id]?.notes || []), noteText]
                }
            }));
            setNoteText("");
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
                            onClick={() => handleTaskClick(task)}
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
                    
                    <div>
                        <input 
                            type="date" 
                            value={reminderDate} 
                            onChange={(e) => setReminderDate(e.target.value)} 
                        />
                        <input 
                            type="time" 
                            value={reminderTime} 
                            onChange={(e) => setReminderTime(e.target.value)} 
                        />
                        <button onClick={handleSetReminder}>Нагадати</button>
                    </div>

                    {menuTask[selectedTask.id]?.reminder && (
                        <div>
                            <p>Нагадування встановлено на: {menuTask[selectedTask.id].reminder.toLocaleString()}</p>
                        </div>
                    )}

                    <div>
                        <input 
                            type="date" 
                            value={termDate} 
                            onChange={(e) => setTermDate(e.target.value)} 
                        />
                        <button onClick={handleSetTermDate}>Додати термін</button>
                    </div>

                    {menuTask[selectedTask.id]?.term && (
                        <div>
                            <p>Термін встановлено на: {menuTask[selectedTask.id].term}</p>
                        </div>
                    )}
                    
                    <div>
                        <h4>Повторювати:</h4>
                        <select value={repeatOption} onChange={(e) => setRepeatOption(e.target.value)}>
                            <option value="none">Ніколи</option>
                            <option value="daily">Щодня</option>
                            <option value="weekdays">По будніх днях</option>
                            <option value="weekly">Щотижня</option>
                            <option value="monthly">Щомісяця</option>
                            <option value="yearly">Щороку</option>
                            <option value="custom">Спеціальний</option>
                        </select>
                        {repeatOption === "custom" && (
                            <div>
                                <input 
                                    type="number" 
                                    value={customPeriod} 
                                    onChange={(e) => setCustomPeriod(e.target.value)} 
                                    placeholder="Число" 
                                    min="1"
                                />
                                <select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
                                    <option value="days">Днів</option>
                                    <option value="weeks">Тижнів</option>
                                    <option value="months">Місяців</option>
                                </select>
                            </div>
                        )}
                        <button onClick={handleSetRepeat}>Повторювати</button>
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="file-input"
                    />
                    <button onClick={() => document.getElementById("file-input").click()}>
                        Додати файл
                    </button>
                    {selectedFile && (
                        <div>
                            <p>Доданий файл: {selectedFile.name}</p>
                            <button onClick={handleFileUpload}>Зберегти файл</button>
                        </div>
                    )}
                    {menuTask[selectedTask.id]?.file && (
                        <div>
                            <p>Доданий файл: {menuTask[selectedTask.id].file.name}</p>
                            <a
                                href={menuTask[selectedTask.id].file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Переглянути файл
                            </a>
                        </div>
                    )}
                    <button>Додати нотатки</button>
                </div>
            )}
        </div>
    );
}

export default TaskList;