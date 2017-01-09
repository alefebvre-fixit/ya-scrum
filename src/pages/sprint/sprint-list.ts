import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { SprintService } from '../../services/index';
import { Sprint } from '../../models/index';
import { SprintEditPage } from './sprint-edit';
import { SprintViewPage } from './sprint-view';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'sprint-list',
  templateUrl: 'sprint-list.html'
})
export class SprintListPage {

  public sprints: Sprint[];
  public cardConfig = {right: "details"};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public sprintService: SprintService,
  ) { }

  ngOnInit(): void {
    this.sprintService.findAllSprints().subscribe((sprints: Sprint[]) => {
      this.sprints = sprints;
    });

  }

  add() {
    let profileModal = this.modalCtrl.create(SprintEditPage, { userId: 8675309 });
    profileModal.present();
  }

  view(id: string) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SprintViewPage, {
      id: id
    });
  }

  navigateToDetails(sprint: Sprint) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SprintViewPage, {
      id: sprint.$key
    });
  }
  
}
