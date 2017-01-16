import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Story, Progress } from '../models/index';
import { AngularFireDatabase } from 'angularfire2';

const STORIES = 'stories';


@Injectable()
export class StoryService {

  constructor(
    private database: AngularFireDatabase
  ) { }

  private storyTypes = [
    { key: "feature", value: "Feature" },
    { key: "quality", value: "Quality" },
    { key: "performance", value: "Performance" },
    { key: "documentation", value: "Documentation" },
    { key: "design", value: "Design" },
  ];

  private storyStatus = [
    { key: "new", value: "New" },
    { key: "assigned", value: "Assigned" },
    { key: "started", value: "Started" },
    { key: "closed", value: "Closed" },
  ];

  private storyPriorities = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "4", value: "5" },
  ];

  public getStoryTypes(): any {
    return this.storyTypes;
  }

  public getStoryStatus(): any {
    return this.storyStatus;
  }

  public getStoryPriorities(): any {
    return this.storyPriorities;
  }

  public findAllStories(): Observable<Story[]> {
    return this.database.list(STORIES);
  }

  public getStory(storyKey: string): Observable<Story> {
    return this.database.object('/stories/' + storyKey);
  }

  public save(story: Story) {
    if (story.$key) {
      this.update(story);
    } else {
      this.create(story);
    }
  }

  public create(story: Story) {
    console.log("create story " + story)
    this.database.list(STORIES).push(story);
  }

  public update(story: Story) {
    this.database.object('/stories/' + story.$key).update(Story.getUpdate(story));
  }

  public unassignStory(story: Story) {

    let storyId = story.$key;
    let sprintId = story.sprintId;

    let join = new Object();
    join[storyId] = false;

    this.database.object(`/storyPerSprint/${sprintId}/${storyId}`).remove();
    this.database.object(`/stories/${storyId}/sprintId`).remove();
    this.database.object(`/stories/${storyId}`).update({ status: "new" });

  }

  public increment(story: Story, progress: Progress, increment: number) {

    let value = increment;

    if (increment > 0 && increment > progress.remaining) {
      value = progress.remaining;
    } else if (increment < 0 && -increment > progress.daily) {
      value = - progress.daily;
    }

    progress.daily = progress.daily + value;
    progress.total = progress.previous + progress.daily;
    progress.remaining = story.size - progress.total;
  }

  public calculateProgress(story: Story) {
    console.log("calculateProgress=");
    if (story.history) {
      story.progress = story.history.reduce(function (sum: number, progress: Progress) {
        progress.previous = sum;
        progress.remaining = story.size - progress.previous - progress.daily;
        return progress.previous + progress.daily;
      }, 0);

      if (story.progress > 0) {
        if (story.progress >= story.size) {
          story.status = "closed"
        } else {
          story.status = "started"
        }
      } else {
        story.status = "assigned";
      }

    }
    console.log(story);
  }

  public saveProgress(story: Story) {
    this.save(story);
  }

}
