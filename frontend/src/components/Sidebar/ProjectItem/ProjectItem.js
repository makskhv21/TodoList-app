import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './ProjectItem'

function ProjectItem({ project, onSelect, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProjectName, setEditedProjectName] = useState(project);

    const handleSaveEdit = () => {
        onEdit(project, editedProjectName);
        setIsEditing(false);
    };

    return (
        <div className="sidebar-item small">
            <span onClick={() => onSelect(project)}>
                {isEditing ? (
                    <input
                        value={editedProjectName}
                        onChange={(e) => setEditedProjectName(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    />
                ) : (
                    project
                )}
            </span>
            <div className='btn-save-edit-delete'>
                {isEditing ? (
                    <button onClick={handleSaveEdit}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
                <button onClick={() => onDelete(project)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}

export default ProjectItem;