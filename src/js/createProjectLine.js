import createNewElement from './createNewElement.js';

export default function createProjectLine(name, tasks) {
  const projectLine = createNewElement('div', 'project-line', `<p>${name}</p>`);
  const undoneTasksQuantity = createNewElement('div', 'tasks-quantity', `${tasks}`);
  projectLine.appendChild(undoneTasksQuantity);

  return projectLine;
}
