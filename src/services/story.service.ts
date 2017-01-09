import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Story } from '../models/index';
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
    console.log("update " + story)
    this.database.object('/stories/' + story.$key).update(Story.getUpdate(story));
  }

  public unassignStory(story: Story) {
    
    let storyId = story.$key;
    let sprintId = story.sprintId;

    let join = new Object();
    join[storyId] = false;

    this.database.object(`/storyPerSprint/${sprintId}/${storyId}`).remove();
    this.database.object(`/stories/${storyId}/sprintId`).remove();
    this.database.object(`/stories/${storyId}`).update({status: "new"});

  }

  public incrementProgress(story: Story){
    
    let storyId = story.$key;

    let progress = story.progress;

    if (progress == undefined){
      progress = 1;
      console.log('incrementProgress::undefined' + progress);
    }
    else if (progress < story.size){
      progress = story.progress + 1;
      console.log('incrementProgress::add' + progress);
    } else{
      console.log('incrementProgress::nothing' + progress);
    }


    this.database.object(`/stories/${storyId}`).update({progress: progress});

  }

  public decrementProgress(story: Story){
    let storyId = story.$key;
    let progress = story.progress;
    if (progress == undefined){
      progress = 0;
    }
    else if (story.progress > 0){
      let progress = story.progress - 1;
      this.database.object(`/stories/${storyId}`).update({progress: progress});
    }
  }


}
