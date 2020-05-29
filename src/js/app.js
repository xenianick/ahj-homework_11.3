import projects from './projects.js';
import createNewElement from './createNewElement.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const statsContainer = createNewElement('div', 'stats-container');
const statsHeader = createNewElement('div', 'stats-header', '<p>Stats</p>');
const projectsContainer = createNewElement('div', 'projects-container');
const projectsHeader = createNewElement('div', 'projects-header', '<p>Project</p><p>Open</p>');
const projectsWrapper = createNewElement('div', 'projects-wrapper');
projectsContainer.appendChild(projectsHeader);
projectsContainer.appendChild(projectsWrapper);
statsContainer.appendChild(statsHeader);
statsContainer.appendChild(projectsContainer);
mainContainer.appendChild(statsContainer);

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
mainContainer.appendChild(projectTasksContainer);

function createProjectLine(name, tasks) {
  const projectLine = createNewElement('div', 'project-line', `<p>${name}</p>`);
  const undoneTasksQuantity = createNewElement('div', 'tasks-quantity', `${tasks}`);
  projectLine.appendChild(undoneTasksQuantity);

  return projectLine;
}

function createTaskLine(name, done, id) {
  const checkbox = createNewElement('div', 'task-checkbox');
  const check = createNewElement('p', 'check hide', '&#10004;');
  if (done) {
    check.classList.remove('hide');
  }
  const nameHtml = createNewElement('p', 'task-name', name);
  const taskLine = createNewElement('div', 'task-line');
  checkbox.appendChild(check);
  taskLine.appendChild(checkbox);
  taskLine.appendChild(nameHtml);

  checkbox.addEventListener('click', () => {
    check.classList.toggle('hide');
    let tsk;
    const prj = projects.find((project) => {
      tsk = project.tasks.find((task) => task.id === id);
      return tsk;
    });
    if (check.classList.contains('hide')) {
      tsk.done = false;
    } else {
      tsk.done = true;
    }
    const tsks = prj.tasks.filter((task) => !task.done);
    const lines = Array.from(document.querySelectorAll('.project-line'));
    lines.forEach((line) => {
      const namer = line.querySelector('p').innerText;
      if (namer === prj.name) {
        const quant = line.querySelector('.tasks-quantity');
        quant.innerText = tsks.length;
      }
    });
  });

  return taskLine;
}

projectSelectionBtn.addEventListener('click', () => {
  const popup = createNewElement('div', 'popup');
  projects.forEach((project) => {
    if (projectSelectionBtn.innerText !== project.name) {
      const projectName = createNewElement('div', 'project-name', `${project.name}`);
      projectName.addEventListener('click', () => {
        projectSelectionBtn.innerHTML = projectName.innerText;
        tasksWrapper.innerHTML = '';
        project.tasks.forEach((task) => {
          const taskHtml = createTaskLine(task.name, task.done, task.id);
          tasksWrapper.appendChild(taskHtml);
        });
        popup.remove();
      });
      popup.appendChild(projectName);
    }
  });
  tasksContainer.appendChild(popup);
});

projects.forEach((project) => {
  const activeTasks = project.tasks.filter((item) => !item.done);
  const projectHtml = createProjectLine(project.name, activeTasks.length);
  projectsWrapper.appendChild(projectHtml);
});

projects[0].tasks.forEach((task) => {
  const taskHtml = createTaskLine(task.name, task.done, task.id);
  tasksWrapper.appendChild(taskHtml);
});
