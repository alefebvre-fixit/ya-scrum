import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../services/index';
import { User } from '../../models/index';

@Component({
  selector: 'User-edit',
  templateUrl: 'User-edit.html',
  viewProviders: [],
})
export class UserEditPage {

  public user: User;

  public roleList: Array<string>;
  public teamList: Array<string>;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public userService: UserService
  ) {
    this.user = User.create();
  }

  ngOnInit(): void {
    const userId = this.params.get("userId");
    if (userId){
      this.userService.findOne(userId).subscribe(user => {
        this.user = user;
      });
    }

    this.roleList = this.userService.getUserRoles();
    this.teamList = this.userService.getTeams();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(): void {
    this.userService.save(this.user);
    this.viewCtrl.dismiss();
  }

  isNew(){
    if (this.user.$key){
      return false;
    } else {
      return true;
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  

}
