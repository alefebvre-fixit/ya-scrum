import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { Story } from '../../models/index';
import { StoryViewPage } from './story-view';

@Component({
  selector: 'story-card',
  templateUrl: 'story-card.html',
  viewProviders: [],
})
export class StoryCard {

  @Input() stories: Story[];
  @Input() config: any = {};

  @Output() leftClick: EventEmitter<any> = new EventEmitter();
  @Output() centerClick: EventEmitter<any> = new EventEmitter();
  @Output() rightClick: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
  }

  ngOnInit(): void {
  }


  emitLeftClick(story: Story): void{
    this.leftClick.emit(story);
  }

  emitCenterClick(story: Story): void{
    this.centerClick.emit(story);
  }

  emitRightClick(story: Story): void{
    console.log("emitRightClick" + story);
    this.rightClick.emit(story);
  }

}
