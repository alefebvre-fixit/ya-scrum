import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StoryService } from '../../services/index';
import { Story } from '../../models/index';

@Component({
  selector: 'story-edit',
  templateUrl: 'story-edit.html',
  viewProviders: [],
})
export class StoryEditPage {

  public story: Story;

  public typeList: any;
  public priorityList: any;
  public statusList: any;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public storyService: StoryService
  ) {
    this.story = Story.create();
  }

  ngOnInit(): void {
    const storyId = this.params.get("storyId");
    if (storyId){
      this.storyService.findOne(storyId).subscribe(story => {
        this.story = story;
      });
    }

    this.typeList = this.storyService.getStoryTypes();
    this.priorityList = this.storyService.getStoryPriorities();
    this.statusList = this.storyService.getStoryStatus();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  create(): void {
    this.storyService.save(this.story);
    //this.sprints.push(this.sprint);
    //this.sprintService.create(this.sprint);
    this.viewCtrl.dismiss();
  }

  isNew(){
    if (this.story.$key){
      return false;
    } else {
      return true;
    }
  }

}
