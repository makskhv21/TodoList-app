import React from "react";
import TaskSteps from "./TaskSteps/TaskSteps"
import Reminder from "./Reminder/Reminder";
import Term from "./Term/Term";
import Repeat from "./Repeat/Repeat";
import FileUpload from "./FileUpload/FileUpload"
import Notes from "./Notes/Notes"

import './MenuTask.css';

function MenuTask({ menuTask, setMenuTask, selectedTask, tasks }) {
    return (
        <div className="task-menu">
            <h3>Дії з завданням: {selectedTask.text}</h3>
            <TaskSteps menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} />
            <Reminder menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} tasks={tasks}/>
            <Term menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} />
            <Repeat menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} /> 
            <FileUpload menuTask={menuTask} setMenuTask={setMenuTask} selectedTask={selectedTask} />
            <Notes menuTask={menuTask} selectedTask={selectedTask} />
        </div>
    )
}

export default MenuTask;