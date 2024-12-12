export const handleEmailSend = (selectedProject, tasks, onClose) => {
  const emailBody = tasks
    .map((task) => `${task.completed ? '[✓]' : '[ ]'} ${task.text}`)
    .join('\n');
  const emailSubject = `Завдання для проекту: ${selectedProject}`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  window.open(mailtoLink);
  onClose();
};
