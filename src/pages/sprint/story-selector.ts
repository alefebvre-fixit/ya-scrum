import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { SprintService } from '../../services/index';

import { Story } from '../../models/index';

@Component({
  selector: 'story-selector',
  templateUrl: 'story-selector.html',
  viewProviders: [],
})
export class StorySelectorPage {

  public stories: Story[];
  public cardConfig = {right: "assign"};

  public sprintId: string;

  constructor(
    public storyService: StoryService,
    public sprintService: SprintService,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private params: NavParams
  ) {
  }

  ngOnInit(): void {
    this.sprintId = this.params.get("sprintId");
    this.storyService.findAllStories().subscribe((stories: Story[]) => {
      this.stories = stories;
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  assignToSprint(story: Story){
    this.close();
    this.sprintService.assignToSprint(this.sprintId, story.$key);
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Story un-assigned successfully',
      duration: 3000
    });
    toast.present();
  }


}
