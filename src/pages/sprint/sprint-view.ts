import { Component } from '@angular/core';

import { NavParams, ViewController, PopoverController  } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { SprintService } from '../../services/index';
import { Sprint, Story } from '../../models/index';
import { SprintConversationPage } from './sprint-conversation';
import { SprintPopoverPage } from './sprint-popover';
import { StoryViewPage } from '../story/story-view';


@Component({
  selector: 'sprint-view',
  templateUrl: 'sprint-view.html',
})
export class SprintViewPage {

  public sprint: Sprint;
  public stories: Story[];
  public cardConfig = {right: "details"};

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public sprintService: SprintService,
    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit(): void {

    const sprintId = this.params.get("id");

    this.sprintService.getSprint(sprintId).subscribe(sprint => { 
      this.sprint = sprint;
    });

    this.sprintService.findAllStoriesForSprint(sprintId).subscribe((stories: Story[]) => {
      this.stories = stories;
    });

  }

  public openConversation(conversationId: string) {
    let profileModal = this.modalCtrl.create(SprintConversationPage, {id: conversationId});
    profileModal.present();
  }

  public test(id: string) {
    console.log(id);
  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SprintPopoverPage, { sprint: this.sprint });
    popover.present({
      ev: myEvent
    });
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
