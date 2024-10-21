import "./App.css"
import Sidebar from "./components/Sidebar"
import MainContent from './components/MainContent';

import { useState } from 'react';

function App() {
    const [selectedProject, setSelectedProject] = useState('Work 👜');

    const projects = ['Work 👜', 'Groceries 🛒', 'Reading List 📚', 'Personal 📝'];
    const [tasks, setTasks] = useState([
        { id: 1, text: 'work 1', completed: false },
        { id: 2, text: 'work 2', completed: false },
        { id: 3, text: 'work 3', completed: false },
    ]);

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id ===id ? { ...task, completed: !task.completed } : task
        ))
    }

    return(
        <div className="app">
            <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
            <MainContent tasks={tasks} selectedProject={selectedProject} toggleTaskCompletion={toggleTaskCompletion}/>
        </div>
    )
}

export default App;