import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { SprintService } from '../../services/index';

import { Story } from '../../models/index';

@Component({
  selector: 'story-progress',
  templateUrl: 'story-progress.html',
  viewProviders: [],
})
export class StoryProgressPage {

  public story: Story;
  public day: number = 0;
  public dailyProgress = 0;

  constructor(
    public storyService: StoryService,
    public sprintService: SprintService,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private params: NavParams
  ) {
  }

  ngOnInit(): void {
    let storyId = this.params.get("storyId");
    this.storyService.getStory(storyId).subscribe((story: Story) => {
      this.story = story;
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  nextDay(){
    this.day++;
  }

  previousDay(){
    this.day--;
  }

  addProgress(){
    this.dailyProgress++;
  }

  removeProgress(){
    this.dailyProgress--;
  }

  apply(){

  }


}
