import React, { useState, useEffect } from 'react';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

function App({ onLogout }) {
  const [selectedProject, setSelectedProject] = useState('Work 👜');
  const [projects, setProjects] = useState([
    'Work 👜',
    'Groceries 🛒',
    'Reading List 📚',
    'Personal 📝',
  ]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserTasks(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserTasks = async (userId) => {
    const tasksRef = ref(db, 'tasks/' + userId);
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasksData = snapshot.val();
      const tasksArray = Object.keys(tasksData).map((key) => ({
        id: key,
        ...tasksData[key],
      }));
      setTasks(tasksArray);
    } else {
      setTasks([]);
    }
  };

  const saveTasksToDatabase = (userId, tasks) => {
    const tasksRef = ref(db, 'tasks/' + userId);
    set(tasksRef, tasks);
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

  const handleActiveTasksCount = (count) => setActiveTasksCount(count);

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

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

  const toggleImportant = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

  const deleteAllTasksForDate = (date) => {
    const updatedTasks = tasks.filter(
      (task) => new Date(task.createdAt).toDateString() !== date
    );
    setTasks(updatedTasks);
    if (user) {
      saveTasksToDatabase(user.uid, updatedTasks);
    }
  };

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
        onActiveTasksCountChange={handleActiveTasksCount}
        deleteAllTasksForDate={deleteAllTasksForDate}
      />
    </div>
  );
}

export default App;
