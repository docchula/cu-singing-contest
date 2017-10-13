import 'rxjs/add/operator/publishReplay';

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { UserService } from './core/user/user.service';

@Component({
  selector: 'cusc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authState$: Observable<firebase.User>;
  navOpen: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.authState$ = this.userService.authState.publishReplay(1).refCount();
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  signOut() {
    this.userService.signOut().subscribe();
  }
}
