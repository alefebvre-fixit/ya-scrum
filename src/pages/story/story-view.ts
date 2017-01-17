import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { StoryService, SprintService } from '../../services/index';
import { Story, Sprint } from '../../models/index';
import { StoryPopoverPage } from './story-popover';


@Component({
  selector: 'story-view',
  templateUrl: 'story-view.html',
  viewProviders: [],
})
export class StoryViewPage {

  public story: Story;
  public sprint: Sprint;

  constructor(
    public params: NavParams,
    public storyService: StoryService,
    public sprintService: SprintService,
    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit(): void {
    const storyId = this.params.get("id");
    this.storyService.findOne(storyId).subscribe(story => {
      console.log("StoryViewPage:: assign story");
      this.story = story;
      if (story.sprintId){
        this.sprintService.findOne(story.sprintId).subscribe(sprint => {
          console.log("StoryViewPage:: assign sprint");
          this.sprint = sprint
        });
      }
    });
  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(StoryPopoverPage, { story: this.story });
    popover.present({
      ev: myEvent
    });
  }

}
