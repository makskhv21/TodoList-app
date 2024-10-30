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
    const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
    const [isSortedByLength, setIsSortedByLength] = useState(false);
    const [isSortedByDate, setIsSortedByDate] = useState(false);
    const [isSortedByImportance, setIsSortedByImportance] = useState(false);

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


    const sortedTasks = (() => {
        let result = filteredTasks.slice();

        if (isSortedByImportance) {
            result.sort((a, b) => (b.important === a.important ? 0 : b.important ? 1 : -1));
        }

        if (isSortedByDate) {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (isSortedByLength) {
            result.sort((a, b) => b.text.length - a.text.length);
        } else if (isSortedAlphabetically) {
            result.sort((a, b) => a.text.localeCompare(b.text));
        }

        return result;
    })();

    const handleThemeChange = (themeName) => {
        setSelectedTheme(themes[themeName] || themes.light);
    };

    const toggleSortingByImportance = () => {
        setIsSortedByImportance(!isSortedByImportance);
        setIsSortedAlphabetically(false);
        setIsSortedByLength(false);
        setIsSortedByDate(false);
    };


    const toggleSortingByDate = () => {
        setIsSortedByDate(!isSortedByDate);
        setIsSortedAlphabetically(false);
        setIsSortedByLength(false);
        setIsSortedByImportance(false);
    };


    const toggleSortingByLength = () => {
        setIsSortedByLength(!isSortedByLength);
        setIsSortedAlphabetically(false); 
        setIsSortedByDate(false);
        setIsSortedByImportance(false);
    };


    const toggleSortingAlphabetically = () => {
        setIsSortedAlphabetically(!isSortedAlphabetically);
        setIsSortedByLength(false); 
        setIsSortedByDate(false); 
        setIsSortedByImportance(false);
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
                    toggleSortingAlphabetically={toggleSortingAlphabetically}
                    toggleSortingByLength={toggleSortingByLength}
                    toggleSortingByDate={toggleSortingByDate}
                    toggleSortingByImportance={toggleSortingByImportance}
                    isSortedAlphabetically={isSortedAlphabetically}
                    isSortedByLength={isSortedByLength}
                    isSortedByDate={isSortedByDate}
                    isSortedByImportance={isSortedByImportance} 
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

