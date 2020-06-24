/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { BehaviorSubject } from 'rxjs';

export default class Store {
  constructor(projects) {
    this.state$ = new BehaviorSubject();
    this.projects = projects;
    this.selectedProject = projects[0];
    this.state$.next({ projects: this.projects, selectedProject: this.selectedProject });
  }

  selectProject(project) {
    this.selectedProject = project;
    this.state$.next({ projects: this.projects, selectedProject: this.selectedProject });
  }

  toggleDone(task) {
    task.done = !task.done;
    this.state$.next({ projects: this.projects, selectedProject: this.selectedProject });
  }
}
