import projects from './projects.js';
import Store from './Store.js';
import createNewElement from './createNewElement.js';
import ProjectTasksWidget from './ProjectTasksWidget.js';
import ProjectStatsWidget from './ProjectStatsWidget.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const store = new Store(projects);

const projectStatsWidget = new ProjectStatsWidget(store);
const projectStatsWidgetHtml = projectStatsWidget.createHtml();
projectStatsWidget.init();
mainContainer.appendChild(projectStatsWidgetHtml);

const projectTasksWidget = new ProjectTasksWidget(store);
const projectTasksWidgetHtml = projectTasksWidget.createHtml();
projectTasksWidget.init();
mainContainer.appendChild(projectTasksWidgetHtml);
