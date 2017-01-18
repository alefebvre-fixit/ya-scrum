import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { UserEditPage } from './user-edit';
import { User } from '../../models/index';
import { UserService } from '../../services/index';
import { ToastController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>User</ion-list-header>
      <button ion-item (click)="edit()">Edit</button>
      <button ion-item (click)="delete()">Delete</button>
      <button ion-item (click)="close()">Close</button>

    </ion-list>
  `
})
export class UserPopoverPage {

  public user: User;

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private params: NavParams,
    private modalCtrl: ModalController,
    public userService: UserService
    ) {
  }

  ngOnInit(): void {
    this.user = this.params.get("user");
  }

  close() {
    this.viewCtrl.dismiss();
  }

  delete(){
    //TODO 
    this.close();
  }

  edit() {
    if (this.user) {
      let editModal = this.modalCtrl.create(UserEditPage, { userId: this.user.$key });
      this.close();
      editModal.present();
    }
  }

}


