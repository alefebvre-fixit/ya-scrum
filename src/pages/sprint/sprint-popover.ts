import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { StorySelectorPage } from './story-selector';
import { SprintEditPage } from './sprint-edit';

import { Sprint } from '../../models/index';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Sprint</ion-list-header>
      <button ion-item (click)="edit()">Edit</button>
      <button ion-item (click)="assignStory()">Assign Story</button>
      <button ion-item (click)="close()">Close</button>
    </ion-list>
  `
})
export class SprintPopoverPage {

  constructor(private viewCtrl: ViewController, private params: NavParams, private modalCtrl: ModalController) {
    console.log(params);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  edit() {
    let sprint: Sprint = this.params.get("sprint");
    console.log(sprint);
    if (sprint) {
      let editModal = this.modalCtrl.create(SprintEditPage, { sprintId: sprint.$key });
      this.viewCtrl.dismiss();
      editModal.present();
    }
  }

  assignStory() {

    let sprint: Sprint = this.params.get("sprint");
    console.log(sprint);

    
    if (sprint) {
      let selectorModal = this.modalCtrl.create(StorySelectorPage, { sprintId: sprint.$key });
      this.close();
      selectorModal.present();
    }
    

    this.close();
  }

}


