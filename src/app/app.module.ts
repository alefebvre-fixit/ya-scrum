import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';

import { ChartsModule } from 'ng2-charts/ng2-charts';


import { StoryListPage } from '../pages/story/story-list';
import { StoryEditPage } from '../pages/story/story-edit';
import { StoryViewPage } from '../pages/story/story-view';
import { StoryPopoverPage } from '../pages/story/story-popover';
import { StoryCard } from '../pages/story/story-card';
import { StoryProgressPage } from '../pages/story/story-progress';


import { SprintListPage } from '../pages/sprint/sprint-list';
import { SprintEditPage } from '../pages/sprint/sprint-edit';
import { SprintViewPage } from '../pages/sprint/sprint-view';
import { SprintConversationPage } from '../pages/sprint/sprint-conversation';
import { SprintPopoverPage } from '../pages/sprint/sprint-popover';
import { SprintCard } from '../pages/sprint/sprint-card';

import { StorySelectorPage } from '../pages/sprint/story-selector';


import { UserListPage } from '../pages/user/user-list';
import { UserEditPage } from '../pages/user/user-edit';
import { UserViewPage } from '../pages/user/user-view';
import { UserPopoverPage } from '../pages/user/user-popover';
import { ScrumMasterSelectorPage } from '../pages/user/scrum-master-selector';
import { ProductOwnerSelectorPage } from '../pages/user/product-owner-selector';

import { UserService } from '../services/index';
import { SprintService } from '../services/index';
import { StoryService } from '../services/index';
import { YaAvatar } from '../common/ya-avatar';
import {NgxChartsModule} from "@swimlane/ngx-charts";


// YOUR SETTINGS GOES HERE!
export const firebaseConfig = {
    apiKey: "AIzaSyBRVBLO8VXkurLDQR1eVcVXOmNXyt8SCoc",
    authDomain: "ya-scrum.firebaseapp.com",
    databaseURL: "https://ya-scrum.firebaseio.com",
    storageBucket: "ya-scrum.appspot.com",
    messagingSenderId: "873493349647"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,

    StoryListPage,
    StoryEditPage,
    StoryViewPage,
    StoryPopoverPage,
    StorySelectorPage,
    StoryCard,
    StoryProgressPage,

    SprintListPage,
    SprintEditPage,
    SprintViewPage,
    SprintConversationPage,
    SprintPopoverPage,
    SprintCard,

    UserListPage,
    UserEditPage,
    UserViewPage,
    UserPopoverPage,
    ScrumMasterSelectorPage,
    ProductOwnerSelectorPage,

    YaAvatar,


    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule,
    NgxChartsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,

    StoryListPage,
    StoryEditPage,
    StoryViewPage,
    StoryPopoverPage,
    StorySelectorPage,
    StoryCard,
    StoryProgressPage,

    SprintListPage,
    SprintEditPage,
    SprintViewPage,
    SprintConversationPage,
    SprintPopoverPage,
    SprintCard,

    UserListPage,
    UserEditPage,
    UserViewPage,
    UserPopoverPage,
    ScrumMasterSelectorPage,
    ProductOwnerSelectorPage,

    YaAvatar,

    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SprintService, StoryService, UserService]
})
export class AppModule {}
