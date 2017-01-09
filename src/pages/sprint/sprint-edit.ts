import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { SprintService } from '../../services/index';
import { Sprint } from '../../models/index';

@Component({
  selector: 'sprint-edit',
  templateUrl: 'sprint-edit.html',
})
export class SprintEditPage {

  public sprint: Sprint;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public sprintService: SprintService,
  ) {
    this.sprint = Sprint.create();
  }

  ngOnInit(): void {
    const sprintId = this.params.get("sprintId");
    if (sprintId){
      this.sprintService.getSprint(sprintId).subscribe(sprint => {
        this.sprint = sprint;
      });
    }
  }

  save(): void {
    this.sprintService.save(this.sprint);
    this.close();
    //this.sprints.push(this.sprint);
    //this.sprintService.create(this.sprint);
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  isNew(){
    if (this.sprint.$key){
      return false;
    } else {
      return true;
    }
  }

}
