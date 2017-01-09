import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { StoryEditPage } from './story-edit';
import { Story } from '../../models/index';
import { StoryService } from '../../services/index';
import { ToastController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Story</ion-list-header>
      <button ion-item (click)="edit()">Edit</button>
      <button ion-item (click)="unassign()">Un-Assign</button>
      <button ion-item (click)="close()">Close</button>
    </ion-list>
  `
})
export class StoryPopoverPage {

  public story: Story;

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private params: NavParams,
    private modalCtrl: ModalController,
    public storyService: StoryService
    ) {
  }

  ngOnInit(): void {
    this.story = this.params.get("story");
  }

  close() {
    this.viewCtrl.dismiss();
  }

  unassign() {
    this.viewCtrl.dismiss();
    this.storyService.unassignStory(this.story);
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Story has been un-assigned successfully',
      duration: 3000
    });
    toast.present();
  }


  edit() {
    if (this.story) {
      let editModal = this.modalCtrl.create(StoryEditPage, { storyId: this.story.$key });
      this.close();
      editModal.present();
    }
  }

}


