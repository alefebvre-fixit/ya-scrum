import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress } from '../models/index';
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
    console.log("assignToSprint sprintId = " + sprintId + " storyId=" + storyId);

    this.getSprint(sprintId).take(1).subscribe(sprint => {
      this.getStory(storyId).take(1).subscribe(story => {

        console.log("assignToSprint after subscribe");

        let join = new Object();
        join[storyId] = true;

        let progress: StoryProgress = Story.createProgress(story, 1);
        Story.setProgress(story, progress);
        sprint.size += story.size;

        this.database.object('/storyPerSprint/' + sprintId).update(join);
        this.database.object('/stories/' + storyId).update({ sprintId: sprintId, status: "assigned", progress: 0, duration: sprint.duration, history: story.history });
        this.database.object('/sprints/' + sprintId).update({ size: sprint.size });

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

  public updateSprintProgress(story: Story) {

    this.getSprint(story.sprintId).take(1).subscribe(sprint => {
      console.log("Step0");

      for (let storyProgress of story.history) {
        //find sprintProgress for that day
        let sprintProgress: SprintProgress = Sprint.getProgress(sprint, storyProgress.day);
        if (sprintProgress == undefined) {
          sprintProgress = Sprint.createProgress(sprint, storyProgress.day);
          Sprint.setProgress(sprint, sprintProgress);
        }
        SprintProgress.setProgress(sprintProgress, storyProgress);
      }

      //calculate progress for each day
      console.log("Step1");

      if (sprint.history == undefined) {
        sprint.history = new Array<SprintProgress>();
      }
      console.log("Step2");

      for (let sprintProgress of sprint.history) {
        let stories = sprintProgress.storiesProgress;

        if (stories != undefined) {
          console.log("Before reset Progress");
          console.log(sprint);

          SprintProgress.reset(sprintProgress);
          console.log("After reset Progress");
          console.log(sprint);
          for (let story of stories) {
            sprintProgress.daily += story.daily;
            sprintProgress.previous += story.previous;
            sprintProgress.total += story.total;
            sprintProgress.remaining += story.remaining;
          }
        }
      }
      console.log("Before Calculate Overall Progress");
      console.log(sprint);

      //finaly calculate the overall progress
      this.calculateProgress(sprint);
      console.log("After Calculate Overall Progress");
      console.log(sprint);
      console.log("Before Saving");

      this.database.object('/sprints/' + sprint.$key).update({ status: sprint.status, progress: sprint.progress, duration: sprint.duration, history: sprint.history });

    });
  }

  public calculateProgress(sprint: Sprint) {
    if (sprint.history) {
      //TODO Do a sort first
      console.log("calculateProgress(sprint: Sprint)");
      console.log(sprint);

      sprint.progress = sprint.history.reduce(function (sum: number, progress: SprintProgress) {
        return progress.total;
      }, 0);

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.size) {
          sprint.status = "closed"
        } else {
          sprint.status = "started"
        }
      } else {
        sprint.status = "new";
      }
    }
  }


}
