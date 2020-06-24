import { fromEvent } from 'rxjs';

import createNewElement from './createNewElement.js';
import createTaskLine from './createTaskLine.js';

export default class ProjectTasksWidget {
  constructor(store) {
    this.store = store;
  }

  createHtml() {
    this.projectTasksContainer = createNewElement('div', 'project-tasks-container');
    this.projectTasksHeader = createNewElement('div', 'project-tasks-header', '<p>Tasks</p>');
    this.tasksContainer = createNewElement('div', 'tasks-container');
    this.projectSelectionBtn = createNewElement('div', 'project-selection-btn');
    this.tasksHeader = createNewElement('div', 'tasks-header', '<p>Project:</p>');
    this.tasksHeader.appendChild(this.projectSelectionBtn);
    this.tasksWrapper = createNewElement('div', 'tasks-wrapper');
    this.tasksContainer.appendChild(this.tasksHeader);
    this.tasksContainer.appendChild(this.tasksWrapper);
    this.projectTasksContainer.appendChild(this.projectTasksHeader);
    this.projectTasksContainer.appendChild(this.tasksContainer);
    this.popup = createNewElement('div', 'popup');

    return this.projectTasksContainer;
  }

  init() {
    this.store.state$.subscribe((data) => this.render(data));
  }

  render(data) {
    const { projects, selectedProject } = data;
    this.projectSelectionBtn.innerHTML = selectedProject.name;
    this.tasksWrapper.innerHTML = '';
    selectedProject.tasks.forEach((task) => {
      const taskHtml = createTaskLine(task, this.store);
      this.tasksWrapper.appendChild(taskHtml);
    });
    fromEvent(this.projectSelectionBtn, 'click').subscribe(() => {
      this.popup.innerHTML = '';
      projects.forEach((project) => {
        if (this.projectSelectionBtn.innerText !== project.name) {
          const projectName = createNewElement('div', 'project-name', `${project.name}`);
          fromEvent(projectName, 'click').subscribe(() => {
            this.store.selectProject(project);
            this.popup.remove();
          });
          this.popup.appendChild(projectName);
        }
      });
      this.tasksContainer.appendChild(this.popup);
    });
  }
}
