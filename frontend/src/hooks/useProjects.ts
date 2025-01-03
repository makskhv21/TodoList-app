import { useState } from 'react';
import { Project } from '../types';

const useProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project>('Work 👜');
  const [projects, setProjects] = useState<Project[]>([
    'Work 👜',
    'Groceries 🛒',
    'Reading List 📚',
    'Personal 📝',
  ]);

  const addProject = (newProject: Project) => {
    if (newProject && !projects.includes(newProject)) {
      setProjects([...projects, newProject]);
    }
  };

  const editProject = (oldProject: Project, newProject: Project) => {
    if (newProject && oldProject !== newProject) {
      setProjects(
        projects.map((project) =>
          project === oldProject ? newProject : project
        )
      );

      if (selectedProject === oldProject) {
        setSelectedProject(newProject);
      }
    }
  };

  const deleteProject = (projectToDelete: Project) => {
    setProjects(projects.filter((project) => project !== projectToDelete));
    if (selectedProject === projectToDelete) {
      setSelectedProject('Work 👜');
    }
  };

  return {
    selectedProject,
    setSelectedProject,
    projects,
    addProject,
    editProject,
    deleteProject,
  };
};

export default useProjects;
