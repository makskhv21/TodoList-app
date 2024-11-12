import React, { useState, useEffect } from 'react';
import './Calendar.css';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarGrid from './CalendarGrid/CalendarGrid';
import TaskInput from './TaskInput/TaskInput';
import TaskModal from './TaskModal/TaskModal';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        // Load tasks from localStorage
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        // Save tasks to localStorage whenever tasks change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

    const handleTaskSubmit = () => {
        if (taskText.trim() && selectedDay !== null) {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
            setTasks((prev) => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), taskText],
            }));
            setTaskText('');
        }
    };

    const changeMonth = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const openModal = (day) => {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        setCurrentTasks(tasks[dateKey] || []);
        setSelectedDay(day);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentTasks([]);
        setEditIndex(null);
    };

    return (
        <div className="calendar">
            <CalendarHeader 
                currentDate={currentDate} 
                changeMonth={changeMonth} 
            />
            <CalendarGrid 
                currentDate={currentDate} 
                adjustedFirstDay={adjustedFirstDay} 
                daysInMonth={daysInMonth} 
                tasks={tasks} 
                openModal={openModal} 
                selectDayForTask={setSelectedDay} 
            />
            <TaskInput 
                taskText={taskText} 
                setTaskText={setTaskText} 
                handleTaskSubmit={handleTaskSubmit} 
            />
            {modalVisible && (
                <TaskModal 
                    currentTasks={currentTasks} 
                    setCurrentTasks={setCurrentTasks} 
                    selectedDay={selectedDay} 
                    closeModal={closeModal} 
                    tasks={tasks}
                    setTasks={setTasks}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                    editedText={editedText}
                    setEditedText={setEditedText}
                />
            )}
        </div>
    );
};

export default Calendar;