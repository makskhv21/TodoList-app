import { useState } from "react";

function MainContent({ tasks, selectedProject, toggleTaskCompletion, addTask, editTask, deleteTask }) {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
      if(newTask.trim()) {
        const newTaskObject = {
          id: Date.now(),
          text: newTask, 
          completed: false,
        };
        addTask(newTaskObject); 
        setNewTask(''); 
      }
    }

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    const handleEditTask = (id) => {
      const taskToEdit = tasks.find(task => task.id === id);
      setEditingTaskId(id);
      setEditingTaskText(taskToEdit.text);
    }

    const handleSaveEdit = () => {
      if(editingTaskText.trim()) {
        editTask(editingTaskId, editingTaskText);
        setEditingTaskId(null);
        setEditingTaskText('')
      }
    }

    return (
      <div className="main-content">
        <h2>{selectedProject}</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                <input 
                    type="checkbox"
                    checked={task.completed} 
                    onChange={() => toggleTaskCompletion(task.id)} 
                />
                {editingTaskId === task.id ? (
                  <input
                      type="text"
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      onBlur={handleSaveEdit}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                  />
                ) : (
                  <span onDoubleClick={() => handleEditTask(task.id)}>
                    {task.text}
                  </span>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>               
            </div>
          ))}
          <div className="add-task">
              <input 
                  type="text" 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)} 
                  placeholder="Enter a new task" 
              />
              <button onClick={handleAddTask}>+ Add Task</button>
          </div>
        </div>
      </div>
    );
}

export default MainContent;