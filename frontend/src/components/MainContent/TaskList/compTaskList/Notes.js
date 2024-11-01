import React, { useState } from "react";

function Notes({ selectedTask, menuTask }) {
    const [note, setNote] = useState("");

    return (
        <div>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Введіть вашу нотатку..."
                rows="3"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            {menuTask[selectedTask.id]?.notes && (
                <ul className="notes-list">
                    {menuTask[selectedTask.id].notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notes;