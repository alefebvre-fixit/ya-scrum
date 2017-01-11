import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { SprintService } from '../../services/index';

import { Story } from '../../models/index';

@Component({
  selector: 'story-progress',
  templateUrl: 'story-progress.html',
  viewProviders: [],
})
export class StoryProgressPage {

  public story: Story;
  public day: number = 0;

  public initialProgress = 0;
  public dailyProgress = 0;
  public remaining = 0;

    // Doughnut
  public doughnutChartLabels:string[] = ['progress', 'daily', 'remaining'];
  public doughnutChartData:number[] = [0, 0, 1];
  public doughnutChartType:string = 'doughnut';


  //https://github.com/valor-software/ng2-charts/issues/251
  //http://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js
  public colors = [
                "#FF6384",
            ];

  constructor(
    public storyService: StoryService,
    public sprintService: SprintService,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private params: NavParams
  ) {
  }

  ngOnInit(): void {
    let storyId = this.params.get("storyId");
    this.storyService.getStory(storyId).subscribe((story: Story) => {
      this.story = story;

      this.initialProgress = story.progress;
      if (this.initialProgress == undefined){
        this.initialProgress = 0;
        story.progress = 0;
      }
      
      this.dailyProgress = 0;
      this.story.size - this.story.progress;
      this.updateChart(this.initialProgress, this.dailyProgress, this.remaining);

    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  nextDay(){
    this.day++;
  }

  previousDay(){
    this.day--;
  }

  addProgress(){
    this.progress(+1);
  }
 
  removeProgress(){
    this.progress(-1);
  }

  progress(increment: number){
    this.dailyProgress =  this.dailyProgress + increment ;

    let daily = this.dailyProgress++
    let remaining = this.story.size - this.story.progress;

    if (daily > remaining){
      daily = remaining;
    }

    this.dailyProgress = daily;
    this.remaining = this.story.size - this.story.progress - daily;
    
    this.updateChart(this.initialProgress, this.dailyProgress, this.remaining);
 
 }

 updateChart(progress: number, daily: number, remaining: number){
    this.doughnutChartData= [progress, daily, remaining];
 }






  apply(){

  }


    // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
