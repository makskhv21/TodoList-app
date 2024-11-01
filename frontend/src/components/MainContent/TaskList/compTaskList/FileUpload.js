import React, { useState } from "react";

function FileUpload({ menuTask, setMenuTask, selectedTask }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = () => {
        if (selectedTask && selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    file: { name: selectedFile.name, url: fileURL }
                }
            }));
            setSelectedFile(null);
            alert("Файл додано до завдання.");
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
            />
            <button onClick={() => document.getElementById("file-input").click()}>
                Додати файл
            </button>
            {selectedFile && (
                <div>
                    <p>Доданий файл: {selectedFile.name}</p>
                    <button onClick={handleFileUpload}>Зберегти файл</button>
                </div>
            )}
            {menuTask[selectedTask.id]?.file && (
                <div>
                    <p>Доданий файл: {menuTask[selectedTask.id].file.name}</p>
                    <a
                        href={menuTask[selectedTask.id].file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Переглянути файл
                    </a>
                </div>
            )}
        </div>
    );
}

export default FileUpload;