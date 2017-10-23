import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { publishReplay } from 'rxjs/operators';

import { UserService } from './core/user/user.service';

@Component({
  selector: 'cusc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authState$: Observable<firebase.User>;
  navOpen: boolean;
  languageLinks: {[key: string]: {
    text: string;
    path: string;
  }} = {
    th: {
      text: 'English',
      path: '/en'
    },
    en: {
      text: 'ภาษาไทย',
      path: '/'
    }
  };

  constructor(private userService: UserService, @Inject(LOCALE_ID) public localeId: string) { }

  ngOnInit() {
    this.authState$ = (this.userService.authState.pipe(
      publishReplay(1)
    ) as ConnectableObservable<firebase.User>).refCount();
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  signOut() {
    this.userService.signOut().subscribe();
  }
}
