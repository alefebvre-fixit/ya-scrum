import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { SprintService } from '../../services/index';
import { Conversation } from '../../models/index';

@Component({
  selector: 'sprint-conversation',
  templateUrl: 'sprint-conversation.html',
  
})
export class SprintConversationPage {

  public conversation: Conversation;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public sprintService: SprintService,
  ) {
    this.conversation = new Conversation();
  }

  ngOnInit(): void {
    //this.sprintService.getConversationBySprint(this.params.get("id")).subscribe(conversation => { this.conversation = conversation });
  }

  create(): void {
    //this.sprintService.create(this.sprint);



    //this.sprints.push(this.sprint);
    //this.sprintService.create(this.sprint);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  testMessage() {
    this.viewCtrl.dismiss();
  }


}
