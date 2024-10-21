import "./App.css"
import Sidebar from "./components/Sidebar"
import MainContent from './components/MainContent';

import { useState } from 'react';

function App() {
    const [selectedProject, setSelectedProject] = useState('Work 👜');

    const projects = ['Work 👜', 'Groceries 🛒', 'Reading List 📚', 'Personal 📝'];

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id ===id ? { ...task, completed: !task.completed } : task
        ));
    };

    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return(
        <div className="app">
            <Sidebar 
                projects={projects} 
                setSelectedProject={setSelectedProject} 
            />
            <MainContent 
                tasks={tasks} 
                selectedProject={selectedProject} 
                toggleTaskCompletion={toggleTaskCompletion}
                addTask={addTask} 
            />
        </div>
    )
}

export default App;