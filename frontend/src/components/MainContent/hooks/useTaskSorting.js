import { useMemo } from 'react';

export const useSortedTasks = (tasks, sortOptions) => {
  return useMemo(() => {
    const sortedTasks = [...tasks];
    if (sortOptions.alphabetically) {
      return sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
    }
    if (sortOptions.byImportance) {
      return sortedTasks.sort((a, b) => b.important - a.important);
    }
    if (sortOptions.byDate) {
      return sortedTasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortOptions.byLength) {
      return sortedTasks.sort((a, b) => b.text.length - a.text.length);
    }
    return sortedTasks;
  }, [tasks, sortOptions]);
};
