import { useState } from 'react';

const useProjects = () => {
  const [selectedProject, setSelectedProject] = useState('Work 👜');
  const [projects, setProjects] = useState([
    'Work 👜',
    'Groceries 🛒',
    'Reading List 📚',
    'Personal 📝',
  ]);

  const addProject = (newProject) => {
    if (newProject && !projects.includes(newProject)) {
      setProjects([...projects, newProject]);
    }
  };

  const editProject = (oldProject, newProject) => {
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

  const deleteProject = (projectToDelete) => {
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
