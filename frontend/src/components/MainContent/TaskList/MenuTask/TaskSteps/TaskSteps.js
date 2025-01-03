import React from 'react';
import TaskStep from './TaskStep';
import useSteps from './hooks/useSteps';

function TaskSteps({ menuTask, setMenuTask, selectedTask }) {
  const {
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
  } = useSteps(selectedTask, menuTask, setMenuTask);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
          <TaskStep
            key={index}
            step={step}
            index={index}
            handleStepToggle={handleStepToggle}
            handleEditStep={handleEditStep}
            handleSaveStepEdit={handleSaveStepEdit}
            editingStepIndex={editingStepIndex}
            editingStepText={editingStepText}
            setEditingStepText={setEditingStepText}
            handleDeleteStep={handleDeleteStep}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskSteps;
