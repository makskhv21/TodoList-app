import { useState } from "react";
import TaskList from "./MainContent/TaskList/TaskList";
import AddTask from "./MainContent/AddTask";
import Calendar from './Calendar'; 
import CalendarWeek from './MainContent/CalendarWeek/CalendarWeek';

function MainContent({ toggleImportant, tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

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
            <h2>{selectedProject}</h2>
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

