import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, Progress } from '../models/index';
import { AngularFireDatabase } from 'angularfire2';

const SPRINTS = '/sprints';

@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase
  ) {
  }

  public findAllSprints(): Observable<Sprint[]> {
    return this.database.list(SPRINTS);
  }

  public findStoryKeysPerSprint(sprintKey: string): Observable<string[]> {
    return this.database.list('storyPerSprint/' + sprintKey).map(storiesPerSprint => storiesPerSprint
      .map(storyPerSprint => storyPerSprint.$key));
  }

  public findAllStoriesForSprint(sprintId: string): Observable<Story[]> {
    return this.findStoryKeysPerSprint(sprintId)
      .map(storiesPerSprint => storiesPerSprint.map(storyKey => this.database.object('stories/' + storyKey))).flatMap(fbos => Observable.combineLatest(fbos));
  }

  public getStory(storyKey: string): Observable<Story> {
    return this.database.object('/stories/' + storyKey);
  }

  public assignToSprint(sprintId: string, storyId: string) {
    console.log("addStoryToSprint sprintId = " + sprintId + " storyId=" + storyId);

    this.getSprint(sprintId).subscribe(sprint => {
      this.getStory(storyId).subscribe(story => {

        let join = new Object();
        join[storyId] = true;

        let progress: Progress = new Progress();
        progress.day = 1
        progress.remaining = story.size;

        let history = new Array<Progress>(story.duration);
        history[0] = progress;

        this.database.object('/storyPerSprint/' + sprintId).update(join);
        this.database.object('/stories/' + storyId).update({ sprintId: sprintId, status: "assigned", progress: 0, duration: sprint.duration, history: history });

      })
    });
  }

  public getSprint(sprintKey: string): Observable<Sprint> {
    return this.database.object('/sprints/' + sprintKey);
  }

  public save(sprint: Sprint) {
    if (sprint.$key) {
      this.update(sprint);
    } else {
      this.create(sprint);
    }
  }

  public create(sprint: Sprint) {
    console.log("create sprint " + sprint)
    this.database.list(SPRINTS).push(sprint);
  }

  public update(sprint: Sprint) {
    console.log("update " + sprint)
    this.database.object('/sprints/' + sprint.$key).update(Sprint.getUpdate(sprint));
  }


}
