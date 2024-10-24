import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ projects, setSelectedProject, addProject, editProject, deleteProject }) {
    const [newProject, setNewProject] = useState('');
    const [editedProjectName, setEditedProjectName] = useState('');

    const handleAddProject = () => {
        addProject(newProject);
        setNewProject('');
    };

    const handleEditProject = (project) => {
        setEditedProjectName(project);
    };

    const handleSaveEdit = (project) => {
        editProject(project, editedProjectName);
        setEditedProjectName('');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-item">📋 Inbox</div>
            <div className="sidebar-item">📅 Today</div>
            <div className="sidebar-item">🗓️ Next 7 days</div>
            <hr />
            <div className="projects">
                {projects.map((project, index) => (
                    <div key={index} className="sidebar-item">
                        <span onClick={() => setSelectedProject(project)}>
                            {project === editedProjectName ? (
                                <input
                                    value={editedProjectName}
                                    onChange={(e) => setEditedProjectName(e.target.value)}
                                    onBlur={() => handleSaveEdit(project)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(project)}
                                />
                            ) : (
                                project
                            )}
                        </span>
                        <div className='btn-save-edit-delete'>
                            {project === editedProjectName ? (
                                <button onClick={() => handleSaveEdit(project)}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            ) : (
                                <button onClick={() => handleEditProject(project)}>
                                    <FontAwesomeIcon icon={faEdit} /> 
                                </button>
                            )}
                            <button onClick={() => deleteProject(project)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="sidebar-item">
                    <input
                        type="text"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        placeholder="New project name"
                    />
                    <button onClick={handleAddProject}>+ Add Project</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
