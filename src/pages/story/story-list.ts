import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { Story } from '../../models/index';
import { StoryEditPage } from './story-edit';
import { StoryViewPage } from './story-view';
import { StoryProgressPage } from './story-progress';

@Component({
  templateUrl: 'story-list.html',
  viewProviders: [StoryService],
})
export class StoryListPage {

  public storiesPending: Story[];
  public storiesClosed: Story[];
  public storiesInProgress: Story[];
  public status: string = "progress";
  
  public cardConfig = {right: "details", left:"progress"};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storyService: StoryService
  ) {
  }

  ngOnInit(): void {
    this.storyService.findByStatus("progress").subscribe((stories: Story[]) => {
      this.storiesInProgress = stories;
    });

    this.storyService.findByStatus("pending").subscribe((stories: Story[]) => {
      this.storiesPending = stories;
    });

    this.storyService.findByStatus("closed").subscribe((stories: Story[]) => {
      this.storiesClosed = stories;
    });

  }

  add() {
    let profileModal = this.modalCtrl.create(StoryEditPage, { userId: 8675309 });
    profileModal.present();
  }

  navigateToDetails(story: Story) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(StoryViewPage, {
      id: story.$key
    });
  }

  progress(story: Story) {
    if (story) {
      let progressModal = this.modalCtrl.create(StoryProgressPage, { storyId: story.$key });
      progressModal.present();
    }
  }


}
