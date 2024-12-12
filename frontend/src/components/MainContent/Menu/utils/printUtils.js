export const handlePrint = (selectedProject, tasks, onClose) => {
  const printContent = tasks
    .map(
      (task) => `
        <div class="task">
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span>${task.text}</span>
        </div>
    `,
    )
    .join('');

  const newWindow = window.open('', '', 'width=800,height=800');
  newWindow.document.write(`
        <html>
            <head>
                <title>Друк завдань</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h1 { text-align: center; color: #4CAF50; }
                    .task { margin: 10px 0; padding: 15px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9; }
                    .task span { margin-left: 10px; font-size: 16px; }
                    input[type='checkbox'] { margin-right: 10px; transform: scale(1.5); cursor: pointer; }
                </style>
            </head>
            <body>
                <h1>Список завдань</h1>
                <h2>${selectedProject}</h2>
                <div>${printContent}</div>
            </body>
        </html>
    `);
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
  onClose();
};
