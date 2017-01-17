import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { Sprint } from '../../models/index';

@Component({
  selector: 'sprint-card',
  templateUrl: 'sprint-card.html',
  viewProviders: [],
})
export class SprintCard {

  @Input() sprints: Sprint[];
  @Input() config: any = {};

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() centerClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
  }

  trackSprint(index, sprint: Sprint) {
    return sprint ? sprint.$key : undefined;
  }

  ngOnInit(): void {
  }

  emitLeftClick(sprint: Sprint): void{
    this.leftClick.emit(sprint);
  }

  emitCenterClick(sprint: Sprint): void{
    this.centerClick.emit(sprint);
  }

  emitRightClick(sprint: Sprint): void{
    console.log("emitRightClick" + sprint);
    this.rightClick.emit(sprint);
  }

}
