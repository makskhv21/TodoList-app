


function Sidebar( { projects, setSelectedProject } ) {
    return(
            <div className="sidebar">
                <div className="sidebar-item">📋 Inbox</div>
                <div className="sidebar-item">📅 Today</div>
                <div className="sidebar-item">🗓️ Next 7 days</div>
                <hr />
                <div className="projects">
                    {projects.map((project, index) => (
                    <div key={index} className="sidebar-item" onClick={() => setSelectedProject(project)}>
                        {project}
                    </div>
                    ))}
                    <div className="sidebar-item">+ Add Project</div>
                </div>
            </div>
    )
}

export default Sidebar;