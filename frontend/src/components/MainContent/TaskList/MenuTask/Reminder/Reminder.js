import React, { useState, useEffect } from "react";

function Reminder({ selectedTask, setMenuTask, menuTask, tasks }) {
    const [reminderDate, setReminderDate] = useState("");
    const [reminderTime, setReminderTime] = useState("");

    const handleSetReminder = () => {
        if (selectedTask && reminderDate && reminderTime) {
            const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    reminder: reminderDateTime
                }
            }));
            setReminderDate("");
            setReminderTime("");
            alert(`Нагадування встановлено на ${reminderDateTime}`);
        }
    };

    
    useEffect(() => {
        const intervalId = setInterval(() => {
            tasks.forEach(task => {
                const taskReminder = menuTask[task.id]?.reminder;
                if (taskReminder && new Date() >= taskReminder) {
                    alert(`Час виконати завдання: "${task.text}"!`);
                    
                    setMenuTask(prev => ({
                        ...prev,
                        [task.id]: {
                            ...prev[task.id],
                            reminder: null 
                        }
                    }));
                }
            });
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [tasks, menuTask]);

    return (
        <div>
            <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
            />
            <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
            />
            <button onClick={handleSetReminder}>Нагадати</button>
            {menuTask[selectedTask.id]?.reminder && (
                <div>
                    <p>Нагадування встановлено на: {menuTask[selectedTask.id].reminder.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default Reminder;