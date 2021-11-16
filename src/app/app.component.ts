import { refCount, publishReplay } from 'rxjs/operators';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, ConnectableObservable } from 'rxjs';

import { UserService } from './core/user/user.service';
import appInfo from '../environments/version';
import { Router } from '@angular/router';

@Component({
  selector: 'cusc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authState$: Observable<firebase.User>;
  navOpen: boolean;
  languageLinks: {
    [key: string]: {
      text: string;
      path: string;
    };
  } = {
    th: {
      text: 'English',
      path: '/en'
    },
    en: {
      text: 'ภาษาไทย',
      path: '/'
    }
  };

  appInfo = appInfo;

  constructor(
    private userService: UserService,
    @Inject(LOCALE_ID) public localeId: string,
    private router: Router
  ) {}

  ngOnInit() {
    this.authState$ = (this.userService.authState.pipe(
      publishReplay(1)
    ) as ConnectableObservable<firebase.User>).pipe(refCount());
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  signOut() {
    this.userService.signOut().subscribe(_ => {
      this.router.navigate(['/']);
    });
  }
}
