import createNewElement from './createNewElement.js';
import createTaskLine from './createTaskLine.js';

function renderTask(projectId, taskName, taskStatus, taskId, container, store) {
  const taskHtml = createTaskLine(projectId, taskName, taskStatus, taskId, store);
  container.appendChild(taskHtml);
}

export default function createProjectTasksWidget(projects, store) {
  const projectTasksContainer = createNewElement('div', 'project-tasks-container');
  const projectTasksHeader = createNewElement('div', 'project-tasks-header', '<p>Tasks</p>');
  const tasksContainer = createNewElement('div', 'tasks-container');
  const projectSelectionBtn = createNewElement('div', 'project-selection-btn', `${projects[0].name}`);
  const tasksHeader = createNewElement('div', 'tasks-header', '<p>Project:</p>');
  tasksHeader.appendChild(projectSelectionBtn);
  const tasksWrapper = createNewElement('div', 'tasks-wrapper');
  tasksContainer.appendChild(tasksHeader);
  tasksContainer.appendChild(tasksWrapper);
  projectTasksContainer.appendChild(projectTasksHeader);
  projectTasksContainer.appendChild(tasksContainer);

  projectSelectionBtn.addEventListener('click', () => {
    const popup = createNewElement('div', 'popup');
    projects.forEach((project) => {
      if (projectSelectionBtn.innerText !== project.name) {
        const projectName = createNewElement('div', 'project-name', `${project.name}`);
        projectName.addEventListener('click', () => {
          projectSelectionBtn.innerHTML = projectName.innerText;
          tasksWrapper.innerHTML = '';
          project.tasks.forEach((task) => {
            renderTask(project.id, task.name, task.done, task.id, tasksWrapper, store);
          });
          popup.remove();
        });
        popup.appendChild(projectName);
      }
    });
    tasksContainer.appendChild(popup);
  });

  projects[0].tasks.forEach((task) => {
    renderTask(projects[0].id, task.name, task.done, task.id, tasksWrapper, store);
  });

  return projectTasksContainer;
}
