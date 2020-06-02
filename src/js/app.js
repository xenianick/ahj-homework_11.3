import projects from './projects.js';
import Store from './Store.js';
import createNewElement from './createNewElement.js';
import createProjectTasksWidget from './createProjectTasksWidget.js';
import createProjectStatsWidget from './createProjectStatsWidget.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const store = new Store();

const projectStatsWidget = createProjectStatsWidget(projects);
mainContainer.appendChild(projectStatsWidget);

const projectTasksWidget = createProjectTasksWidget(projects, store);
mainContainer.appendChild(projectTasksWidget);

store.subject.subscribe((value) => {
  if (value.task.done) {
    value.check.classList.remove('hide');
  } else {
    value.check.classList.add('hide');
  }
  const activeTasks = value.project.tasks.filter((task) => !task.done);
  const lines = Array.from(document.querySelectorAll('.project-line'));
  lines.forEach((line) => {
    const projectName = line.querySelector('p').innerText;
    if (projectName === value.project.name) {
      const tasksQuantity = line.querySelector('.tasks-quantity');
      tasksQuantity.innerText = activeTasks.length;
    }
  });
});
