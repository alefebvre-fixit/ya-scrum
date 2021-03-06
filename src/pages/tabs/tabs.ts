import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { StoryListPage } from '../story/story-list';
import { SprintListPage } from '../sprint/sprint-list';
import { UserListPage } from '../user/user-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = SprintListPage;
  tab4Root: any = StoryListPage;
  tab5Root: any = UserListPage;

  constructor() {

  }
}
