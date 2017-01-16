import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SprintService, StoryService } from '../../services/index';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public sprintService: SprintService,
    public storyService: StoryService
  ) {

  }

  indexSprints(): void {
    this.sprintService.index();
  }

  indexStories(): void {
    this.storyService.index();
  }


}
