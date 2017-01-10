import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';


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

import { SprintService } from '../services/index';
import { StoryService } from '../services/index';
import { YaAvatar } from '../common/ya-avatar';

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

    YaAvatar,


    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
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

    YaAvatar,


    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SprintService, StoryService]
})
export class AppModule {}
