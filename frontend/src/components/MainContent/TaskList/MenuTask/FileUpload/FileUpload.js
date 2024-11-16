import React from "react";

import "./FileUpload.css";

function FileUpload({ menuTask, setMenuTask, selectedTask }) {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        if (selectedTask) {
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    files: [...(prev[selectedTask.id]?.files || []), ...fileData],
                },
            }));
        }
    };

    const handleDeleteFile = (fileToDelete) => {
        if (selectedTask) {
            setMenuTask((prev) => ({
                ...prev,
                [selectedTask.id]: {
                    ...prev[selectedTask.id],
                    files: prev[selectedTask.id]?.files.filter((file) => file.url !== fileToDelete.url),
                },
            }));
        }
    };

    return (
        <div className="container-fileupload">
            {menuTask[selectedTask.id]?.files?.length > 0 && (
                <div className="file-list">
                    {menuTask[selectedTask.id].files.map((file, index) => (
                        <div key={index} className="file-item">
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="file-link"
                            >
                                {file.name}
                            </a>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteFile(file)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
                multiple
            />
            <button
                className="upload-button"
                onClick={() => document.getElementById("file-input").click()}
            >
                Додати файли
            </button>
        </div>
    );
}

export default FileUpload;