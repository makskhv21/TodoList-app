import React, { useState } from "react";
import TaskList from "./MainContent/TaskList/TaskList";
import AddTask from "./MainContent/AddTask";
import Calendar from './MainContent/Calendar/Calendar'; 
import CalendarWeek from './MainContent/CalendarWeek/CalendarWeek';
import Menu from './Menu';
import themes from './themes';

function MainContent({ toggleImportant, tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(themes.light);
    const [sortOptions, setSortOptions] = useState({
        alphabetically: false,
        byLength: false,
        byDate: false,
        byImportance: false
    });

    const handleSaveEdit = () => {
        if (editingTaskText.trim()) {
            editTask(editingTaskId, editingTaskText);
            setEditingTaskId(null);
            setEditingTaskText('');
        }
    };

    const filteredTasks = selectedProject === 'Important'
        ? tasks.filter(task => task.important)
        : tasks;

    const handleThemeChange = (themeName) => {
        setSelectedTheme(themes[themeName] || themes.light);
    };    

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOptions.alphabetically) return a.text.localeCompare(b.text);
        if (sortOptions.byImportance) return b.important - a.important;
        if (sortOptions.byDate) return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOptions.byLength) return b.text.length - a.text.length;
        return 0;
    });

    const toggleSortingOption = (option) => {
        setSortOptions(prev => ({
            alphabetically: option === 'alphabetically' ? !prev.alphabetically : false,
            byImportance: option === 'byImportance' ? !prev.byImportance : false,
            byDate: option === 'byDate' ? !prev.byDate : false,
            byLength: option === 'byLength' ? !prev.byLength : false,
        }));
    };

    return (
        <div className="main-content" style={{ background: selectedTheme.background, color: selectedTheme.color }}>
            <div className="header">
                <h2 className="header-title">{selectedProject}</h2>
                <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">...</button>
                <Menu 
                    selectedProject={selectedProject}
                    isOpen={menuOpen} 
                    onClose={() => setMenuOpen(false)} 
                    onThemeChange={handleThemeChange}
                    tasks={sortedTasks}
                    toggleSortingOption={toggleSortingOption}
                    sortOptions={sortOptions} 
                />
            </div>
            <div id="printable-area" style={{ display: 'none' }}>
                {sortedTasks.map((task, index) => (
                    <div key={index} className="task">
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span>{task.text}</span>
                    </div>
                ))}
            </div>
            {selectedProject === 'Next 7 days' ? (
                <CalendarWeek />
            ) : selectedProject === 'Calendar' ? (
                <Calendar addTask={addTask} />
            ) : (
                <TaskList 
                    tasks={sortedTasks}
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                    editingTaskId={editingTaskId}
                    setEditingTaskId={setEditingTaskId}
                    editingTaskText={editingTaskText}
                    setEditingTaskText={setEditingTaskText}
                    handleSaveEdit={handleSaveEdit}
                    toggleImportant={toggleImportant} 
                />
            )}
            <div className="add-task-container">
                <AddTask addTask={addTask} />
            </div>
        </div>
    );
}

export default MainContent;

