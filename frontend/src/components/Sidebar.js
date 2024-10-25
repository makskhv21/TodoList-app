import { useState } from 'react'; 
import ProjectItem from './Sidebar/ProjectItem';

function Sidebar({ projects, setSelectedProject, addProject, editProject, deleteProject }) {
    const [newProject, setNewProject] = useState('');

    const handleAddProject = () => {
        addProject(newProject);
        setNewProject('');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={() => setSelectedProject('Inbox')}>📋 Inbox</div>
            <div className="sidebar-item" onClick={() => setSelectedProject('Today')}>📅 Today</div>
            <div className="sidebar-item" onClick={() => setSelectedProject('Next 7 days')}>🗓️ Next 7 days</div>
            <hr />
            <div className="projects">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                        onSelect={setSelectedProject}
                        onEdit={editProject}
                        onDelete={deleteProject}
                    />
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