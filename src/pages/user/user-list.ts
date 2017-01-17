import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { UserService } from '../../services/index';
import { User } from '../../models/index';
import { UserEditPage } from './user-edit';
import { UserViewPage } from './user-view';

@Component({
  templateUrl: 'user-list.html',
  viewProviders: [UserService],
})
export class UserListPage {

  public users: User[];
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  add() {
    let profileModal = this.modalCtrl.create(UserEditPage, {});
    profileModal.present();
  }

  navigateToDetails(user: User) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(UserViewPage, {
      id: user.$key
    });
  }


}
