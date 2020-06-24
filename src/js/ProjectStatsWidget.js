import { pluck } from 'rxjs/operators';

import createNewElement from './createNewElement.js';
import createProjectLine from './createProjectLine.js';

export default class ProjectStatsWidget {
  constructor(store) {
    this.store = store;
  }

  createHtml() {
    this.statsContainer = createNewElement('div', 'stats-container');
    this.statsHeader = createNewElement('div', 'stats-header', '<p>Stats</p>');
    this.projectsContainer = createNewElement('div', 'projects-container');
    this.projectsHeader = createNewElement('div', 'projects-header', '<p>Project</p><p>Open</p>');
    this.projectsWrapper = createNewElement('div', 'projects-wrapper');
    this.projectsContainer.appendChild(this.projectsHeader);
    this.projectsContainer.appendChild(this.projectsWrapper);
    this.statsContainer.appendChild(this.statsHeader);
    this.statsContainer.appendChild(this.projectsContainer);

    return this.statsContainer;
  }

  init() {
    this.store.state$
      .pipe(
        pluck('projects'),
      )
      .subscribe((projects) => this.render(projects));
  }

  render(projects) {
    this.projectsWrapper.innerHTML = '';
    projects.forEach((project) => {
      const activeTasks = project.tasks.filter((item) => !item.done);
      const projectHtml = createProjectLine(project.name, activeTasks.length);
      this.projectsWrapper.appendChild(projectHtml);
    });
  }
}
