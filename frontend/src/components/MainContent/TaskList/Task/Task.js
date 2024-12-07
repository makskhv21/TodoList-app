import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';


function Task({ 
    task, 
    toggleTaskCompletion, 
    onEdit, 
    onDelete, 
    isEditing, 
    editingTaskText, 
    setEditingTaskText, 
    handleSaveEdit, 
    toggleImportant, 
    onClick, 
    isMenuVisible
}) {
    const handleTaskClick = (e) => {
        if (e.target.tagName === 'INPUT' ||   e.target.tagName === 'BUTTON' || 
            e.target.tagName === 'svg'   ||   e.target.tagName === 'path'
        ) {
            return;
        }
        onClick();
    };

    return (
        <div 
            className={`task-container ${isMenuVisible ? 'task-expanded' : ''}`} 
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
            onClick={handleTaskClick}
        >
            <input 
                className="input-check"
                type="checkbox"
                checked={task.completed} 
                onChange={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(task.id);
                }} 
            />
            {isEditing ? (
                <input
                    style={{ width: '65%', marginLeft: '5px', marginBottom: '8px', marginRight: '10px'}}
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => {
                        e.stopPropagation();
                        setEditingTaskText(e.target.value);
                    }}
                />
            ) : (                
                <span onDoubleClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                }}>
                    {task.text}
                </span>
            )}
            <div className="btn-container-task">
                <button onClick={(e) => {
                    e.stopPropagation();
                    toggleImportant(task.id);
                }}>
                    <FontAwesomeIcon icon={task.important ? faStar : faStarEmpty} />
                </button>
                {isEditing ? (
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleSaveEdit();
                    }}>
                        <FontAwesomeIcon icon={faSave} className='btn-task-icon' />
                    </button>
                ) : (
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}>
                        <FontAwesomeIcon icon={faEdit} className='btn-task-icon'/> 
                    </button> 
                )}
                <button onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}>
                    <FontAwesomeIcon icon={faTrash} className='btn-task-icon' /> 
                </button>
            </div>
        </div>
    );
}

export default Task;