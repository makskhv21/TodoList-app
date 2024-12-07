import React, { useState } from 'react';
import "./App.css"

import Sidebar from "./components/Sidebar/Sidebar"
import MainContent from './components/MainContent/MainContent';


function App({ onLogout }) {
    const [selectedProject, setSelectedProject] = useState('Work 👜');
    const [projects, setProjects] = useState(['Work 👜', 'Groceries 🛒', 'Reading List 📚', 'Personal 📝']);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [tasks, setTasks] = useState([]);

    const handleActiveTasksCount = (count) => setActiveTasksCount(count);

    const addProject = (newProject) => {
        if ( newProject && !projects.includes(newProject)) {
            setProjects([...projects, newProject])
        }
    }

    const editProject = (oldProject, newProject) => {
        if (newProject && oldProject !== newProject) {
            setProjects(
                projects.map(project => 
                    project === oldProject ? newProject : project
                )
            );
            
            if (selectedProject === oldProject) {
                setSelectedProject(newProject)
            }
        }
    }

    const deleteProject = (projectToDelete) => {
        setProjects(projects.filter(project => project !== projectToDelete));
        if (selectedProject === projectToDelete) {
            setSelectedProject('Work 👜'); 
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id ===id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addTask = (newTask) => setTasks(prevTasks => [...prevTasks, newTask]);

    const editTask = (id, newText) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleImportant = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, important: !task.important } : task
        ));
    };

    return(
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
            />
        </div>
    )
}

export default App;