import { useState } from 'react';

export const useCalendarLogic = (
  tasks,
  addTask,
  editTask,
  deleteAllTasksForDate
) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [newTaskText, setNewTaskText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  const changeMonth = (offset) => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + offset, 1)
    );
  };

  const filterTasksByDate = (completed) => {
    return tasks.filter(
      (task) =>
        new Date(task.createdAt).toDateString() === selectedDate &&
        task.completed === completed
    );
  };

  const createNewTask = (text) => ({
    id: Date.now(),
    text,
    createdAt: selectedDate,
    completed: false,
    important: false,
  });

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = createNewTask(newTaskText);
      addTask(newTask);
      setNewTaskText('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const openTaskModal = (task) => {
    setEditingTask(task);
    setEditedText(task.text);
    setShowModal(true);
  };

  const handleEditTask = () => {
    if (editedText.trim()) {
      editTask(editingTask.id, editedText);
      setEditingTask(null);
    }
  };

  const handleDeleteAllTasks = () => {
    if (
      window.confirm('Are you sure you want to delete all tasks for this date?')
    ) {
      deleteAllTasksForDate(selectedDate);
    }
    closeModal();
  };

  return {
    currentMonth,
    selectedDate,
    setSelectedDate,
    newTaskText,
    setNewTaskText,
    showModal,
    editingTask,
    editedText,
    setEditedText,
    changeMonth,
    filterTasksByDate,
    handleAddTask,
    closeModal,
    openTaskModal,
    handleEditTask,
    handleDeleteAllTasks,
  };
};
