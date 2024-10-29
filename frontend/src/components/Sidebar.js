import { useState } from 'react'; 
import ProjectItem from './Sidebar/ProjectItem';

function Sidebar({ projects, setSelectedProject, addProject, editProject, deleteProject }) {
    const [newProject, setNewProject] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleAddProject = () => {
        addProject(newProject);
        setNewProject('');
    };

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
    };

    return (
        <div className="sidebar">
            <button 
                className='btn-theme' 
                onClick={toggleTheme}>
                {isDarkTheme ? '🌞' : '🌜'}
            </button>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Today')}>⏳ Today</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Important')}>⭐ Важливо</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Next 7 days')}>📆 Next 7 days</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Calendar')}>📖 Calendar</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Tasks')}>📝 Завдання</div>
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
                    <button onClick={handleAddProject}>+</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
