import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { UserService, StoryService } from '../../services/index';
import { User } from '../../models/index';


@Component({
  templateUrl: 'scrum-master-selector.html',
  viewProviders: [UserService, StoryService],
})
export class ProductOwnerSelectorPage {

  public users: User[];
  public storyId: string;

  constructor(
    public viewCtrl: ViewController,
    public userService: UserService,
    public storyService: StoryService,
    private params: NavParams
  ) {
  }

  public ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
    this.storyId = this.params.get("storyId");
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public select(user: User){
    this.close();
    this.storyService.assignProductOwner(this.storyId, user.$key);
  }

  public trackUser(index, user: User) {
    return user ? user.$key : undefined;
  }


}
