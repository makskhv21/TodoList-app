import { useMemo } from 'react';

export const useFilteredTasks = (tasks, selectedProject) => {
  const isToday = (dateString) => {
    const taskDate = new Date(dateString);
    const today = new Date();

    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  };

  const isMissedGoal = (task) => {
    const taskDate = new Date(task.createdAt);
    const today = new Date();
    return taskDate < today && !task.completed;
  };

  return useMemo(() => {
    if (selectedProject === 'Missed goals') {
      return tasks.filter(
        (task) => isMissedGoal(task) && !isToday(task.createdAt)
      );
    }
    if (selectedProject === 'Important') {
      return tasks.filter((task) => task.important);
    }
    return tasks.filter((task) => isToday(task.createdAt));
  }, [tasks, selectedProject]);
};
