import React, { useState } from 'react';
import './MainContent.css';
import Header from './componentMain/Header';
import TaskRenderer from './componentMain/TaskRenderer';
import AddTask from './AddTask/AddTask';
import { useFilteredTasks } from './hooks/useTaskFiltering';
import { useSortedTasks } from './hooks/useTaskSorting';
import { useActiveTasksCount } from './hooks/useActiveTasksCount';
import themes from './Menu/utils/themes';

function MainContent({
  deleteAllTasksForDate,
  toggleImportant,
  tasks,
  selectedProject,
  toggleTaskCompletion,
  addTask,
  editTask,
  deleteTask,
  onActiveTasksCountChange,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes.light);
  const [sortOptions, setSortOptions] = useState({
    alphabetically: false,
    byLength: false,
    byDate: false,
    byImportance: false,
  });

  const filteredTasks = useFilteredTasks(tasks, selectedProject);
  const sortedTasks = useSortedTasks(filteredTasks, sortOptions);

  useActiveTasksCount(filteredTasks, onActiveTasksCountChange);

  const handleThemeChange = (themeName) => {
    setSelectedTheme(themes[themeName] || themes.light);
  };

  const toggleSortingOption = (option) => {
    setSortOptions((prev) => ({
      alphabetically:
        option === 'alphabetically' ? !prev.alphabetically : false,
      byImportance: option === 'byImportance' ? !prev.byImportance : false,
      byDate: option === 'byDate' ? !prev.byDate : false,
      byLength: option === 'byLength' ? !prev.byLength : false,
    }));
  };

  return (
    <div
      className="main-content"
      style={
        selectedProject === 'Calendar' || selectedProject === 'Next 7 days'
          ? {}
          : { background: selectedTheme.background, color: selectedTheme.color }
      }
    >
      <Header
        selectedProject={selectedProject}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleThemeChange={handleThemeChange}
        sortedTasks={sortedTasks}
        toggleSortingOption={toggleSortingOption}
        sortOptions={sortOptions}
      />
      <TaskRenderer
        selectedProject={selectedProject}
        tasks={tasks}
        sortedTasks={sortedTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        editingTaskText={editingTaskText}
        setEditingTaskText={setEditingTaskText}
        handleSaveEdit={() => {
          if (editingTaskText.trim()) {
            editTask(editingTaskId, editingTaskText);
            setEditingTaskId(null);
            setEditingTaskText('');
          }
        }}
        toggleImportant={toggleImportant}
        addTask={addTask}
        editTask={editTask}
        deleteAllTasksForDate={deleteAllTasksForDate}
        addEventToTaskList={addTask}
      />
      {selectedProject !== 'Calendar' &&
        selectedProject !== 'Next 7 days' &&
        selectedProject !== 'Missed goals' && (
          <div className="add-task-container">
            <AddTask addTask={addTask} />
          </div>
        )}
    </div>
  );
}

export default MainContent;
