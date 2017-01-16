import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { SprintService } from '../../services/index';
import { Sprint } from '../../models/index';
import { SprintEditPage } from './sprint-edit';
import { SprintViewPage } from './sprint-view';

@Component({
  selector: 'sprint-list',
  templateUrl: 'sprint-list.html'
})
export class SprintListPage {

  public sprintsProgress: Sprint[];
  public sprintsPending: Sprint[];
  public sprintsClosed: Sprint[];
  public status: string = "progress";

  public cardConfig = {right: "details"};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public sprintService: SprintService,
  ) { }

  ngOnInit(): void {
    this.sprintService.findByStatus("pending").subscribe((sprints: Sprint[]) => {
      this.sprintsPending = sprints;
    });

    this.sprintService.findByStatus("progress").subscribe((sprints: Sprint[]) => {
      this.sprintsProgress = sprints;
    });

    this.sprintService.findByStatus("closed").subscribe((sprints: Sprint[]) => {
      this.sprintsClosed = sprints;
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
