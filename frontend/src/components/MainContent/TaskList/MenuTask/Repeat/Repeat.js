import React, { useState } from "react";
import "./Repeat.css";

function Repeat({ selectedTask, setMenuTask }) {
    const [repeatOption, setRepeatOption] = useState("none");
    const [customPeriod, setCustomPeriod] = useState(1);
    const [periodType, setPeriodType] = useState("days");

    const handleSetRepeat = () => {
        if (selectedTask) {
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    repeatOption: repeatOption,
                    customPeriod: repeatOption === "custom" ? customPeriod : null,
                    periodType: repeatOption === "custom" ? periodType : null,
                },
            }));
            const message =
                repeatOption === "custom"
                    ? `${customPeriod} ${periodType}`
                    : repeatOption;
            alert(`Повторення встановлено на: ${repeatOption} ${message}`);
        }
    };

    return (
        <div className="container-repeat">
            <select
                value={repeatOption}
                onChange={(e) => setRepeatOption(e.target.value)}
                className="select-repeat-option"
            >
                <option value="none">Ніколи</option>
                <option value="daily">Щодня</option>
                <option value="weekdays">По будніх днях</option>
                <option value="weekly">Щотижня</option>
                <option value="monthly">Щомісяця</option>
                <option value="yearly">Щороку</option>
                <option value="custom">Спеціальний</option>
            </select>
            {repeatOption === "custom" && (
                <div className="custom-period-container">
                    <input
                        type="number"
                        value={customPeriod}
                        onChange={(e) => setCustomPeriod(e.target.value)}
                        placeholder="Число"
                        min="1"
                        className="custom-period-input"
                    />
                    <select
                        value={periodType}
                        onChange={(e) => setPeriodType(e.target.value)}
                        className="select-period-type"
                    >
                        <option value="days">Днів</option>
                        <option value="weeks">Тижнів</option>
                        <option value="months">Місяців</option>
                    </select>
                </div>
            )}
            <button onClick={handleSetRepeat} className="button-set-repeat">
                Повторювати
            </button>
        </div>
    );
}

export default Repeat;