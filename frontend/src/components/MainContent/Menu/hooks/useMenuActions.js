export const useHandleThemeSelect = (onThemeChange, onClose) => {
  return (themeName) => {
    onThemeChange(themeName);
    onClose();
  };
};

export const useHandlePrint = (selectedProject, tasks, onClose) => {
  return () => {
    const printContent = Array.from(document.querySelectorAll('.task'))
      .map(
        (task) => `
              <div class="task">
                  <input type="checkbox" ${task.querySelector('input').checked ? 'checked' : ''} />
                  <span>${task.querySelector('span').innerText}</span>
              </div>
          `
      )
      .join('');

    const newWindow = window.open('', '', 'width=800,height=800');
    newWindow.document.write(`
        <html>
          <head>
            <title>Друк завдань</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
              }
              h1 {
                text-align: center;
                color: #4CAF50;
              }
              h2 {
                text-align: center;
              }
              .task {
                margin: 10px 0;
                padding: 15px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .task span {
                display: inline-block;
                margin-left: 10px;
                font-size: 16px;
              }
              input[type='checkbox'] {
                margin-right: 10px;
                transform: scale(1.5);
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <h1>Список завдань</h1>
            <h2>${selectedProject}</h2>
            <div>
              ${printContent}
            </div>
          </body>
        </html>
      `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
    onClose();
  };
};

export const useHandleEmailSend = (tasks, selectedProject, onClose) => {
  return () => {
    const emailBody = tasks
      .map((task) => `${task.completed ? '[✓]' : '[ ]'} ${task.text}`)
      .join('\n');
    const emailSubject = `Завдання для проекту: ${selectedProject}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailtoLink);
    onClose();
  };
};
