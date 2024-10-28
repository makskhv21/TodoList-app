import { useState } from "react";
import TaskList from "./MainContent/TaskList";
import AddTask from "./MainContent/AddTask";
import CalendarWeek from './CalendarWeek';

function MainContent({ tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    const handleSaveEdit = () => {
        if (editingTaskText.trim()) {
            editTask(editingTaskId, editingTaskText);
            setEditingTaskId(null);
            setEditingTaskText('');
        }
    };

    return (
        <div className="main-content">
            <h2>{selectedProject}</h2>
            {selectedProject === 'Next 7 days' ? (
                <CalendarWeek /> 
            ) : (
                <>
                    <TaskList 
                        tasks={tasks}
                        toggleTaskCompletion={toggleTaskCompletion}
                        deleteTask={deleteTask}
                        editingTaskId={editingTaskId}
                        setEditingTaskId={setEditingTaskId}
                        editingTaskText={editingTaskText}
                        setEditingTaskText={setEditingTaskText}
                        handleSaveEdit={handleSaveEdit}
                    />
                    <AddTask addTask={addTask} />
                </>
            )}
        </div>
    );
}

export default MainContent;
