import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { UserService, SprintService } from '../../services/index';
import { User } from '../../models/index';


@Component({
  templateUrl: 'scrum-master-selector.html',
  viewProviders: [UserService, SprintService],
})
export class ScrumMasterSelectorPage {

  public searchTerm: string = '';
  public users: User[];
  public filteredUsers: User[];
  public sprintId: string;

  constructor(
    public viewCtrl: ViewController,
    public userService: UserService,
    public sprintService: SprintService,
    private params: NavParams
  ) {
  }

  public ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = this.userService.filterUsers(this.searchTerm, users);
    });
    this.sprintId = this.params.get("sprintId");
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public select(user: User){
    this.close();
    this.sprintService.assignScrumMaster(this.sprintId, user.$key);
  }

  public trackUser(index, user: User) {
    return user ? user.$key : undefined;
  }

  public setFilteredItems(even: any) {
    this.filteredUsers = this.userService.filterUsers(this.searchTerm, this.users);
  }


}
