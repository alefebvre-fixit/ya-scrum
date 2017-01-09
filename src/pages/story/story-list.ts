import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { Story } from '../../models/index';
import { StoryEditPage } from './story-edit';
import { StoryViewPage } from './story-view';

@Component({
  templateUrl: 'story-list.html',
  viewProviders: [StoryService],
})
export class StoryListPage {

  public stories: Story[];
  public cardConfig = {right: "details"};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storyService: StoryService
  ) {
  }

  ngOnInit(): void {
    this.storyService.findAllStories().subscribe((stories: Story[]) => {
      this.stories = stories;
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


}
