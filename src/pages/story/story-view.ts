import { Component } from '@angular/core';
import { NavParams, ViewController, PopoverController } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { StoryService, SprintService, UserService } from '../../services/index';
import { Story, Sprint, User } from '../../models/index';
import { StoryPopoverPage } from './story-popover';
import { ProductOwnerSelectorPage } from '../user/product-owner-selector';
import { UserViewPage } from '../user/user-view';

@Component({
  selector: 'story-view',
  templateUrl: 'story-view.html',
  viewProviders: [],
})
export class StoryViewPage {

  public story: Story;
  public sprint: Sprint;
  public productOwner: User;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public storyService: StoryService,
    public sprintService: SprintService,
    public popoverCtrl: PopoverController,
    public userService: UserService
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
      if (story.productOwnerId) {
        this.userService.findOne(story.productOwnerId).subscribe(user => {
          this.productOwner = user;
          console.log(this.productOwner);
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

  assignProductOwner() {
    let selectorModal = this.modalCtrl.create(ProductOwnerSelectorPage, { storyId: this.story.$key });
    selectorModal.present();
  }

  navigateToProductOwner(user: User) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(UserViewPage, {
      id: user.$key
    });
  }

}
