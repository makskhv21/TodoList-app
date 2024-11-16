import React, { useState } from "react";

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

    const handleDeleteStep = (index) => {
        const currentSteps = menuTask[selectedTask.id]?.steps || [];
        const updatedSteps = currentSteps.filter((_, i) => i !== index);
        updateSteps(updatedSteps);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddStep();
        }
    };

    return (
        <div className="container-taskStep">
            <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введіть крок"
            />
            <ul className="task-steps-list">
                {menuTask[selectedTask.id]?.steps?.map((step, index) => (
                    <li
                        key={index}
                        className="task-step"
                        style={{
                            textDecoration: step.completed ? "line-through" : "none",
                        }}
                    >
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
                                    if (e.key === "Enter") handleSaveStepEdit(index);
                                }}
                                style={{ flex: 1, marginLeft: "10px" }}
                            />
                        ) : (
                            <span
                                className="step-text"
                                onDoubleClick={() => handleEditStep(index, step.text)}
                                style={{
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                    display: "block",
                                    padding: "5px 0",
                                    maxWidth: "65%",
                                }}
                            >
                                {step.text}
                            </span>
                        )}
                        <button
                            onClick={() => handleDeleteStep(index)}
                            className="delete-step-button"
                            style={{
                                marginLeft: "25px",
                                position: "relative",
                                bottom: "5px",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                color: "black",
                            }}
                        >
                            ✖
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskSteps;