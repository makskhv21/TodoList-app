import { useState } from 'react';

function useSteps(selectedTask, menuTask, setMenuTask) {
  const [newStep, setNewStep] = useState('');
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingStepText, setEditingStepText] = useState('');

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
      setNewStep('');
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
    setEditingStepText('');
  };

  const handleDeleteStep = (index) => {
    const currentSteps = menuTask[selectedTask.id]?.steps || [];
    const updatedSteps = currentSteps.filter((_, i) => i !== index);
    updateSteps(updatedSteps);
  };

  return {
    newStep,
    setNewStep,
    handleAddStep,
    handleStepToggle,
    handleEditStep,
    handleSaveStepEdit,
    handleDeleteStep,
    editingStepIndex,
    editingStepText,
    setEditingStepText,
  };
}

export default useSteps;
