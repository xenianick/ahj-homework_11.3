import { fromEvent } from 'rxjs';

import createNewElement from './createNewElement.js';

export default function createTaskLine(projectId, name, done, id, store) {
  const checkbox = createNewElement('div', 'task-checkbox');
  const check = createNewElement('p', 'check', '&#10004;');
  if (!done) {
    check.classList.add('hide');
  }
  const nameHtml = createNewElement('p', 'task-name', name);
  const taskLine = createNewElement('div', 'task-line');
  checkbox.appendChild(check);
  taskLine.appendChild(checkbox);
  taskLine.appendChild(nameHtml);

  fromEvent(checkbox, 'click').subscribe(() => {
    store.toggleDone(projectId, id, check);
  });

  return taskLine;
}
