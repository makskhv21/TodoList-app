


function MainContent({ tasks, selectedProject, toggleTaskCompletion   }) {
  
    return (
      <div className="main-content">
        <h2>{selectedProject}</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} task={task} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                <input 
                    type="checkbox"
                    checked={task.completed} 
                    onChange={() => toggleTaskCompletion(task.id)} 
                />
                {task.text}
            </div>
          ))}
          <div className="add-task">+ Add Task</div>
        </div>
      </div>
    );
}
  
export default MainContent;