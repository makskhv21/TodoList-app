import React, { useState } from "react";

function Repeat({ selectedTask, setMenuTask }) {
    const [repeatOption, setRepeatOption] = useState("none");
    const [customPeriod, setCustomPeriod] = useState(1);
    const [periodType, setPeriodType] = useState("days");

    const handleSetRepeat = () => {
        if (selectedTask) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    repeatOption: repeatOption,
                    customPeriod: repeatOption === "custom" ? customPeriod : null,
                    periodType: repeatOption === "custom" ? periodType : null
                }
            }));
            alert(`Повторення встановлено на: ${repeatOption} ${repeatOption === "custom" ? `${customPeriod} ${periodType}` : ""}`);
        }
    };

    return (
        <div>
            <h4>Повторювати:</h4>
            <select value={repeatOption} onChange={(e) => setRepeatOption(e.target.value)}>
                <option value="none">Ніколи</option>
                <option value="daily">Щодня</option>
                <option value="weekdays">По будніх днях</option>
                <option value="weekly">Щотижня</option>
                <option value="monthly">Щомісяця</option>
                <option value="yearly">Щороку</option>
                <option value="custom">Спеціальний</option>
            </select>
            {repeatOption === "custom" && (
                <div>
                    <input 
                        type="number" 
                        value={customPeriod} 
                        onChange={(e) => setCustomPeriod(e.target.value)} 
                        placeholder="Число" 
                        min="1"
                    />
                    <select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
                        <option value="days">Днів</option>
                        <option value="weeks">Тижнів</option>
                        <option value="months">Місяців</option>
                    </select>
                </div>
            )}
            <button onClick={handleSetRepeat}>Повторювати</button>
        </div>
    );
}

export default Repeat;