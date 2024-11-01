import React, {useState } from "react";


function TaskSteps({ menuTask, setMenuTask, selectedTask }) {
    const [newStep, setNewStep] = useState("");
    const [editingStepIndex, setEditingStepIndex] = useState(null);
    const [editingStepText, setEditingStepText] = useState("");
    
    const updateSteps = (steps) => {
        if (selectedTask) {
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    steps,
                },
            }));
        }
    };
    
    const handleAddStep = () => {
        if (selectedTask && newStep.trim()) {
            const updatedSteps = [
                ...(menuTask[selectedTask.id]?.steps || []),
                { text: newStep, completed: false },
            ];
            updateSteps(updatedSteps);
            setNewStep("");
        }
    };
    
    const handleStepToggle = (index) => {
        const currentSteps = menuTask[selectedTask.id]?.steps || [];
        const updatedSteps = currentSteps.map((step, i) =>
            i === index ? { ...step, completed: !step.completed } : step
        );
        updateSteps(updatedSteps);
    };
    
    const handleEditStep = (index, text) => {
        setEditingStepIndex(index);
        setEditingStepText(text);
    };
    
    const handleSaveStepEdit = (index) => {
        const currentSteps = menuTask[selectedTask.id]?.steps || [];
        const updatedSteps = currentSteps.map((step, i) =>
            i === index ? { ...step, text: editingStepText } : step
        );
        updateSteps(updatedSteps);
        setEditingStepIndex(null);
        setEditingStepText("");
    };

    return(
        <>
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
        </>
    )
}

export default TaskSteps;