import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

function ProjectItem({ project, onSelect, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project);

  const handleSaveEdit = () => {
    if (editedProjectName !== project) {
      onEdit(project, editedProjectName);
    }
    setIsEditing(false);
  };

  const handleInputChange = (e) => setEditedProjectName(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
  };

  return (
    <div className="sidebar-item small">
      <span onClick={() => onSelect(project)}>
        {isEditing ? (
          <input
            className="editingInput"
            value={editedProjectName}
            onChange={handleInputChange}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
          />
        ) : (
          project
        )}
      </span>
      <div className="btn-save-edit-delete">
        <button onClick={isEditing ? handleSaveEdit : () => setIsEditing(true)}>
          <FontAwesomeIcon icon={isEditing ? faSave : faEdit} />
        </button>
        <button onClick={() => onDelete(project)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default ProjectItem;
