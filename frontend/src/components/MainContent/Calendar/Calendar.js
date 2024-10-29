import React, { useState } from 'react';
import './Calendar.css';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import TaskInput from './TaskInput';
import TaskModal from './TaskModal';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState('');

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