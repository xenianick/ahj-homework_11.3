import createNewElement from './createNewElement.js';
import createProjectLine from './createProjectLine.js';


export default function createProjectStatsWidget(projects) {
  const statsContainer = createNewElement('div', 'stats-container');
  const statsHeader = createNewElement('div', 'stats-header', '<p>Stats</p>');
  const projectsContainer = createNewElement('div', 'projects-container');
  const projectsHeader = createNewElement('div', 'projects-header', '<p>Project</p><p>Open</p>');
  const projectsWrapper = createNewElement('div', 'projects-wrapper');
  projectsContainer.appendChild(projectsHeader);
  projectsContainer.appendChild(projectsWrapper);
  statsContainer.appendChild(statsHeader);
  statsContainer.appendChild(projectsContainer);

  projects.forEach((project) => {
    const activeTasks = project.tasks.filter((item) => !item.done);
    const projectHtml = createProjectLine(project.name, activeTasks.length);
    projectsWrapper.appendChild(projectHtml);
  });

  return statsContainer;
}
