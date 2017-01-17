import { Component } from '@angular/core';

import { NavParams, ViewController, PopoverController } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { SprintService, StoryService } from '../../services/index';
import { Sprint, Story } from '../../models/index';
import { SprintConversationPage } from './sprint-conversation';
import { SprintPopoverPage } from './sprint-popover';
import { StoryViewPage } from '../story/story-view';


@Component({
  selector: 'sprint-view',
  templateUrl: 'sprint-view.html',
})
export class SprintViewPage {

  public sprint: Sprint;
  public stories: Story[];
  public cardConfig = { right: "details" };

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public sprintService: SprintService,
    public storyService: StoryService,

    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit(): void {

    const sprintId = this.params.get("id");

    this.sprintService.findOne(sprintId).subscribe(sprint => {
      this.sprint = sprint;
      let burndown = this.sprintService.generateBurndowData(sprint);
      this.lineChartData = burndown.datas;
      this.lineChartLabels = burndown.labels;
      
    });

    this.sprintService.findStoryBySprint(sprintId).subscribe((stories: Story[]) => {
      this.stories = stories;
    });

  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SprintPopoverPage, { sprint: this.sprint });
    popover.present({
      ev: myEvent
    });
  }

  navigateToDetails(story: Story) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(StoryViewPage, {
      id: story.$key
    });
  }

  public lineChartData: Array<any> = [
    { data: [], label: 'Actual' },
    { data: [], label: 'Ideal' },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';


}
