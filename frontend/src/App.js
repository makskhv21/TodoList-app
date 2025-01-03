import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';

import useTasks from './hooks/useTasks';
import useProjects from './hooks/useProjects';
import useAuth from './hooks/useAuth';

function App({ onLogout }) {
  const [user, setUser] = useState(null);
  const { selectedProject, setSelectedProject, projects, addProject, editProject, deleteProject } = useProjects();
  const { tasks, addTask, toggleTaskCompletion, editTask, deleteTask, toggleImportant, deleteAllTasksForDate } = useTasks(user);
  
  useAuth(setUser); 

  const [activeTasksCount, setActiveTasksCount] = useState(0);

  const calculateActiveTasksCount = useCallback(() => {
    const activeCount = tasks.filter(task => !task.completed).length;
    setActiveTasksCount(activeCount);
  }, [tasks]);

  useEffect(() => {
    calculateActiveTasksCount();
  }, [tasks, calculateActiveTasksCount]);

  return (
    <div className="app">
      <Sidebar
        projects={projects}
        setSelectedProject={setSelectedProject}
        addProject={addProject}
        editProject={editProject}
        deleteProject={deleteProject}
        onLogout={onLogout}
        activeTasksCount={activeTasksCount}
      />
      <MainContent
        tasks={tasks}
        selectedProject={selectedProject}
        toggleTaskCompletion={toggleTaskCompletion}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleImportant={toggleImportant}
        onActiveTasksCountChange={setActiveTasksCount}
        deleteAllTasksForDate={deleteAllTasksForDate}
      />
    </div>
  );
}

export default App;
