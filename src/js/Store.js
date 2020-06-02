import { Subject } from 'rxjs';

import projects from './projects.js';

export default class Store {
  constructor() {
    this.subject = new Subject();
    this.projects = projects;
  }

  toggleDone(projectId, id, check) {
    const project = this.projects.find((prj) => prj.id === projectId);
    const task = project.tasks.find((tsk) => tsk.id === id);
    task.done = !task.done;
    this.subject.next({ project, task, check });
  }
}
