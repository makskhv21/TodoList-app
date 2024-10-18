


function MainContent({ tasks }) {
  
    return (
      <div className="main-content">
        <h2>My todoList-app</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} task={task} >
                <input 
                    type="checkbox"
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