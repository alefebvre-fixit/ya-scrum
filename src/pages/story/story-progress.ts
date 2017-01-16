import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StoryService } from '../../services/index';
import { SprintService } from '../../services/index';

import { Story, StoryProgress } from '../../models/index';

@Component({
  selector: 'story-progress',
  templateUrl: 'story-progress.html',
  viewProviders: [],
})
export class StoryProgressPage {

  public story: Story;
  public progress: StoryProgress;

  public day: number = 1;

  // Doughnut
  public doughnutChartLabels: string[] = ['previous', 'daily', 'remaining'];
  public doughnutChartData: number[] = [0, 0, 1];
  public doughnutChartType: string = 'doughnut';
  public colors: any = [{ backgroundColor: ["#15B7B9", "#10DDC2", "#F5F5F5"] }];
  public options = {
    tooltips: {
      enabled: false
    }
  };

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

      this.displayProgressForDay(1);

    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  nextDay() {
    if (this.story.duration > this.day) {
      this.day++;
      this.storyService.calculateProgress(this.story);
      this.displayProgressForDay(this.day);
    }
  }

  previousDay() {
    if (this.day > 1) {
      this.day--;
      this.storyService.calculateProgress(this.story);
      this.displayProgressForDay(this.day);
    }
  }

  displayProgressForDay(day: number) {
    let progress: StoryProgress = Story.getProgress(this.story, day);

    if (progress == undefined) {
      progress = Story.createProgress(this.story, day);
      Story.setProgress(this.story, progress);

      console.log("Applying progress to story");
      console.log(this.story);
      
      this.storyService.calculateProgress(this.story);
    }

    this.progress = progress;
    this.updateChart(progress);
  }

  addProgress(increment: number) {
    this.incerementProgress(+increment);
  }

  removeProgress(increment: number) {
    this.incerementProgress(-increment);
  }

  incerementProgress(increment: number) {

    this.storyService.increment(this.story, this.progress, increment);

    this.updateChart(this.progress);

  }

  public updateChart(progress: StoryProgress) {
    this.doughnutChartData = [progress.previous, progress.daily, progress.remaining];
  }

  apply(): void {

    this.storyService.calculateProgress(this.story);
    this.storyService.saveProgress(this.story);

    this.sprintService.updateSprintProgress(this.story);

    this.presentToast();

    this.viewCtrl.dismiss();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Progess updated',
      duration: 3000
    });
    toast.present();
  }

}
