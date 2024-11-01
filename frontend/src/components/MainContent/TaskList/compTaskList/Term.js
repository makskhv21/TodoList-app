import React, { useState } from "react";

function Term({ selectedTask, setMenuTask, menuTask }) {
    const [termDate, setTermDate] = useState("");

    const handleSetTermDate = () => {
        if (selectedTask && termDate) {
            setMenuTask(prev => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    term: termDate
                }
            }));
            setTermDate("");
            alert(`Термін встановлено на ${termDate}`);
        }
    };

    return (
        <div>
            <input
                type="date"
                value={termDate}
                onChange={(e) => setTermDate(e.target.value)}
            />
            <button onClick={handleSetTermDate}>Додати термін</button>
            {menuTask[selectedTask.id]?.term && (
                <div>
                    <p>Термін встановлено на: {menuTask[selectedTask.id].term}</p>
                </div>
            )}
        </div>
    );
}

export default Term;