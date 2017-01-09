import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, Conversation, Message } from '../models/index';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

const SPRINTS = '/sprints';
const SPRINT_CONVERSATIONS = '/sprint-conversations';


@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase
  ) {
  }

  public findAllSprints(): Observable<Sprint[]> {
    return this.database.list(SPRINTS);
  }

  public findStoryKeysPerSprint(sprintKey: string): Observable<string[]> {
    return this.database.list('storyPerSprint/' + sprintKey).map(storiesPerSprint => storiesPerSprint
      .map(storyPerSprint => storyPerSprint.$key));
  }

  public findAllStoriesForSprint(sprintId: string): Observable<Story[]> {
    return this.findStoryKeysPerSprint(sprintId)
      .map(storiesPerSprint => storiesPerSprint.map(storyKey => this.database.object('stories/' + storyKey))).flatMap(fbos => Observable.combineLatest(fbos));
  }

  public assignToSprint(sprintId: string, storyId: string) {
    console.log("addStoryToSprint sprintId = " + sprintId + " storyId=" + storyId);

    let join = new Object();
    join[storyId] = true;

    this.database.object('/storyPerSprint/' + sprintId).update(join);
    this.database.object('/stories/' + storyId).update({sprintId: sprintId, status: "assigned"});

  }   
 
  public getSprint(sprintKey: string): Observable<Sprint> {
    return this.database.object('/sprints/' + sprintKey);
  }

  public save(sprint: Sprint) {
    if (sprint.$key) {
      this.update(sprint);
    } else {
      this.create(sprint);
    }
  }

  public create(sprint: Sprint) {
    console.log("create sprint " + sprint)
    this.database.list(SPRINTS).push(sprint);
  }

  public update(sprint: Sprint) {
    console.log("update " + sprint)
    this.database.object('/sprints/' + sprint.$key).update(Sprint.getUpdate(sprint));
  }
  /*
    findAllStoriesForSprint(sprintId: string): Observable<Story[]> {
      const storiesPerSprint$ = this.database.list('storyPerSprint/' + sprintId);
  
      return storiesPerSprint$.map(storiesPerSprint => storiesPerSprint
        .map( storyPerSprint => this.database.object('stories/' + storyPerSprint.$key)))
        .flatMap( fbos => Observable.combineLatest(fbos)) 
        .do(console.log)
        ;
    }
  */




  /*
    create(sprint: Sprint) {
      let conversation = new Conversation();
      conversation.messages = new Array<Message>();
      conversation.messages.push({"message": 'Hello World', "username": "antoinelefebvre"});
  
      const itemObservable = this.database.object('/item');
      itemObservable.set({ name: 'new name!'});
  
  
  
      this.database.list(SPRINTS).push(sprint);
      //let sprintKey = this.database.list(SPRINT_CONVERSATIONS).push(conversation).key;
  
      }
      /*
      console.log(sprint);
      console.log(conversation);
      this.angularFire.database.list(SPRINT_CONVERSATIONS).push(conversation).then(conversation => {
      console.log(conversation);
  
        sprint.conversationId = conversation.$key;
        this._sprints$.push(sprint);
      });
    }
  
    getConversationBySprint(id: string): Observable<Conversation> {
      return this.angularFire.database.object(SPRINT_CONVERSATIONS + '/' + id);
    }
  
    post(id: string) {
      this.angularFire.database.object('/sprint-conversations/' + id);
    }
      */






}
