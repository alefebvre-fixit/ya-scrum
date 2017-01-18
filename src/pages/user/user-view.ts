import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { UserService } from '../../services/index';
import { User } from '../../models/index';
import { UserPopoverPage } from './user-popover';


@Component({
  selector: 'user-view',
  templateUrl: 'user-view.html',
  viewProviders: [],
})
export class UserViewPage {

  public user: User;

  constructor(
    public params: NavParams,
    public userService: UserService,
    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit(): void {
    const userId = this.params.get("id");
    this.userService.findOne(userId).subscribe(user => {
      this.user = user;
    });
  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserPopoverPage, { user: this.user });
    popover.present({
      ev: myEvent
    });
  }

}
