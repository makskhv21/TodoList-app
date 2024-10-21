import { useState } from 'react';


function Sidebar( { projects, setSelectedProject, addProject, editProject } ) {
    
    const [newProject, setNewProject] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedProject, setEditedProject] = useState(null);
    const [editedProjectName, setEditedProjectName] = useState('');

    const handleAddProject = () => {
        addProject(newProject);
        setNewProject('');
    };

    const handleEditProject = (project) => {
        setEditMode(true);
        setEditedProject(project);
        setEditedProjectName(project);
    };

    const handleSaveEdit = () => {
        editProject(editedProject, editedProjectName);
        setEditMode(false);
        setEditedProject(null);
        setEditedProjectName('');
    };


    return(
            <div className="sidebar">
                <div className="sidebar-item">📋 Inbox</div>
                <div className="sidebar-item">📅 Today</div>
                <div className="sidebar-item">🗓️ Next 7 days</div>
                <hr />
                <div className="projects">
                    {projects.map((project, index) => (
                    <div key={index} className="sidebar-item">
                        <span onClick={() => setSelectedProject(project)}>{project}</span>
                        <button onClick={() => handleEditProject(project)}>Edit</button>
                    </div>
                    ))}
                    {editMode && (
                        <div className="sidebar-item">
                            <input 
                                value={editedProjectName} 
                                onChange={(e) => setEditedProjectName(e.target.value)} 
                            />
                            <button onClick={handleSaveEdit}>Save</button>
                        </div>
                    )}
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
    )
}

export default Sidebar;