import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
  faTrash,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

function TaskActions({
  task,
  toggleImportant,
  onDelete,
  isEditing,
  handleSaveEdit,
  onEdit,
}) {
  return (
    <div className="btn-container-task">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleImportant(task.id);
        }}
      >
        <FontAwesomeIcon icon={task.important ? faStar : faStarEmpty} />
      </button>
      {isEditing ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSaveEdit();
          }}
        >
          <FontAwesomeIcon icon={faSave} className="btn-task-icon" />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <FontAwesomeIcon icon={faEdit} className="btn-task-icon" />
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrash} className="btn-task-icon" />
      </button>
    </div>
  );
}

export default TaskActions;
