import { useEffect } from 'react';

export const useActiveTasksCount = (tasks, onActiveTasksCountChange) => {
  useEffect(() => {
    const activeTasksCount = tasks.filter((task) => !task.completed).length;
    onActiveTasksCountChange(activeTasksCount);
  }, [tasks, onActiveTasksCountChange]);
};
