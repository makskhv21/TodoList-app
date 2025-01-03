import { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebaseConfig';
import { Task } from '../types';

const useTasks = (user: { uid: string } | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const fetchUserTasks = async () => {
        const tasksRef = ref(db, 'tasks/' + user.uid);
        const snapshot = await get(tasksRef);
        if (snapshot.exists()) {
          const tasksData = snapshot.val();
          const tasksArray = Object.keys(tasksData).map((key) => ({
            id: key,
            ...tasksData[key],
          }));
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
      };

      fetchUserTasks();
    }
  }, [user]);

  const saveTasksToDatabase = (tasks: Task[]) => {
    if (user) {
      const tasksRef = ref(db, 'tasks/' + user.uid);
      set(tasksRef, tasks);
    }
  };

  const addTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  const editTask = (id: string, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  const toggleImportant = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  const deleteAllTasksForDate = (date: string) => {
    const updatedTasks = tasks.filter(
      (task) => new Date(task.createdAt).toDateString() !== date
    );
    setTasks(updatedTasks);
    saveTasksToDatabase(updatedTasks);
  };

  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    editTask,
    deleteTask,
    toggleImportant,
    deleteAllTasksForDate,
  };
};

export default useTasks;
