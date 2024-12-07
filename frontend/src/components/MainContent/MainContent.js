import React, { useState, useEffect } from "react";
import "./MainContent.css"
import TaskList from "./TaskList/TaskList";
import AddTask from "./AddTask/AddTask";
import Calendar from './Calendar/Calendar'; 
import CalendarWeek from './CalendarWeek/CalendarWeek';
import Menu from './Menu/Menu';
import themes from './Menu/themes';

function MainContent({ toggleImportant, tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask, onActiveTasksCountChange }) {
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

    const activeTasksCount = filteredTasks.filter(task => !task.completed).length;
    useEffect(() => {
        onActiveTasksCountChange(activeTasksCount);
    }, [activeTasksCount, onActiveTasksCountChange]);
        
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

    const addEventToTaskList = (event) => addTask(event); 

    return (
        <div 
            className="main-content" 
            style={
                selectedProject === 'Calendar' || selectedProject === 'Next 7 days'
                    ? {}
                    : { background: selectedTheme.background, color: selectedTheme.color }
            }
        >
            <div className="header">
                <h2 className="header-title">{selectedProject}</h2>
                {selectedProject !== 'Calendar' && selectedProject !== 'Next 7 days' && (
                    <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">...</button>
                )}
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
                <CalendarWeek 
                    tasks={tasks} 
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    addEventToTaskList={addEventToTaskList}
                    toggleTaskCompletion={toggleTaskCompletion}
                    toggleImportant={toggleImportant}
                />
            ) : selectedProject === 'Calendar' ? (
                <Calendar />
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
            {selectedProject !== 'Calendar' && selectedProject !== 'Next 7 days' && (
                <div className="add-task-container">
                    <AddTask addTask={addTask} />
                </div>
            )}
        </div>
    );
}

export default MainContent;