import { Component } from '@angular/core';

import { NavParams, ViewController, PopoverController } from 'ionic-angular';
import { ModalController, NavController } from 'ionic-angular';

import { SprintService, StoryService, UserService } from '../../services/index';
import { Sprint, Story, User } from '../../models/index';
import { SprintPopoverPage } from './sprint-popover';
import { StoryViewPage } from '../story/story-view';
import { ScrumMasterSelectorPage } from '../user/scrum-master-selector';
import { UserViewPage } from '../user/user-view';
import { StoryProgressPage } from '../story/story-progress';

@Component({
  selector: 'sprint-view',
  templateUrl: 'sprint-view.html',
})
export class SprintViewPage {

  public sprint: Sprint;
  public stories: Story[];
  public scrumMaster: User;
  public cardConfig = { left: "track progress", right: "details" };
  public status = "backlog";
  
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,

    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit(): void {

    const sprintId = this.params.get("id");

    this.sprintService.findOne(sprintId).subscribe(sprint => {

      console.log('SprintViewPage::this.sprintService.findOne(sprintId).subscribe');

      this.sprint = sprint;
      if (sprint.scrumMasterId) {
        this.userService.findOne(sprint.scrumMasterId).subscribe(user => {
          console.log('SprintViewPage::this.userService.findOne(sprint.scrumMasterId).subscribe');
          this.scrumMaster = user;
        });
      }

      let burndown = this.sprintService.generateBurndowData(sprint);
      this.lineChartData = burndown.datas;
      this.lineChartLabels = burndown.labels;

    });

    this.sprintService.findStoryBySprint(sprintId).subscribe((stories: Story[]) => {
      console.log('this.sprintService.findStoryBySprint(sprintId).subscribe');
      this.stories = this.storyService.sortByPriority(stories);
    });

  }

  public presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SprintPopoverPage, { sprint: this.sprint });
    popover.present({
      ev: myEvent
    });
  }

  assignScrumMaster() {
    let selectorModal = this.modalCtrl.create(ScrumMasterSelectorPage, { sprintId: this.sprint.$key });
    selectorModal.present();
  }

  navigateTocrumMaster(user: User) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(UserViewPage, {
      id: user.$key
    });
  }


  public navigateToDetails(story: Story) {
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(StoryViewPage, {
      id: story.$key
    });
  }


  public trackProgress(story: Story) {
    if (story) {
      let progressModal = this.modalCtrl.create(StoryProgressPage, { storyId: story.$key });
      progressModal.present();
    }
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
