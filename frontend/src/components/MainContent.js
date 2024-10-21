import { useState } from "react";

function MainContent({ tasks, selectedProject, toggleTaskCompletion, addTask }) {
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
                {task.text}
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