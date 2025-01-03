import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProjectItem from '../ProjectItem/ProjectItem';

const SidebarProjects = ({
  projects,
  onSelectProject,
  onEditProject,
  onDeleteProject,
  newProject,
  setNewProject,
  onAddProject,
  onKeyDown,
}) => (
  <div className="projects">
    {projects.map((project, index) => (
      <ProjectItem
        key={index}
        project={project}
        onSelect={onSelectProject}
        onEdit={onEditProject}
        onDelete={onDeleteProject}
      />
    ))}
    <div className="sidebar-item newProject">
      <input
        type="text"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        placeholder="New list"
        onKeyDown={onKeyDown}
      />
      <button onClick={onAddProject}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
);

export default SidebarProjects;
