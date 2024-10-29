import { useState } from "react";
import TaskList from "./MainContent/TaskList/TaskList";
import AddTask from "./MainContent/AddTask";
import Calendar from './MainContent/Calendar/Calendar'; 
import CalendarWeek from './MainContent/CalendarWeek/CalendarWeek';
import Menu from './Menu';

function MainContent({ toggleImportant, tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <div className="main-content">
            <div className="header">
                <h2 className="header-title">{selectedProject}</h2>
                <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">...</button>
                <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
            {selectedProject === 'Next 7 days' ? (
                <CalendarWeek />
            ) : selectedProject === 'Calendar' ? (
                <Calendar addTask={addTask} />
            ) : (
                <>
                    <TaskList 
                        tasks={filteredTasks}
                        toggleTaskCompletion={toggleTaskCompletion}
                        deleteTask={deleteTask}
                        editingTaskId={editingTaskId}
                        setEditingTaskId={setEditingTaskId}
                        editingTaskText={editingTaskText}
                        setEditingTaskText={setEditingTaskText}
                        handleSaveEdit={handleSaveEdit}
                        toggleImportant={toggleImportant} 
                    />
                </>
            )}
            <div className="add-task-container">
                <AddTask addTask={addTask} />
            </div>
        </div>
    );
}

export default MainContent; 
