import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { SprintService } from '../../services/index';

import { Story, Progress } from '../../models/index';

@Component({
  selector: 'story-progress',
  templateUrl: 'story-progress.html',
  viewProviders: [],
})
export class StoryProgressPage {

  public story: Story;
  public progress: Progress;

  public day: number = 1;

  public initialProgress = 0;
  public dailyProgress = 0;
  public remaining = 0;

    // Doughnut
  public doughnutChartLabels:string[] = ['previous', 'daily', 'remaining'];
  public doughnutChartData:number[] = [0, 0, 1];
  public doughnutChartType:string = 'doughnut';
  public colors:any = [{ backgroundColor: ["#15B7B9", "#10DDC2", "#F5F5F5"] }];


  //https://github.com/valor-software/ng2-charts/issues/251
  //http://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js

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
      this.progress = this.getCurrentProgress(story);
      this.updateChart(this.progress);

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

  addProgress(increment: number){
    this.incerementProgress(+increment);
  }
 
  removeProgress(increment: number){
    this.incerementProgress(-increment);
  }



  incerementProgress(increment: number){

    let value = increment;

    if (increment > 0 && increment > this.progress.remaining){
      value = this.progress.remaining;
    } else if (increment < 0 && -increment > this.progress.daily){
      value = -this.progress.daily;
    }

    this.progress.daily =  this.progress.daily + value;
    this.progress.total = this.progress.previous + this.progress.daily;
    this.progress.remaining = this.story.size - this.progress.total;
    
    this.updateChart(this.progress);
 
 }

  public updateChart(progress: Progress){
    this.doughnutChartData= [progress.previous, progress.daily, progress.remaining];
 }


 public getCurrentProgress(story: Story): Progress {

   let result = new Progress();

   result.day = 1;
   result.date = new Date();
   result.previous = 0;
   result.daily = 0;
   result.total = 0;
   result.remaining = story.size;

   return result;
   
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
