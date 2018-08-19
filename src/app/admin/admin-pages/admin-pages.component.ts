import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { ConfigService } from '../../core/config/config.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'cusc-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  token$: Observable<string>;

  constructor(private userService: UserService, private configService: ConfigService) { }

  ngOnInit() {
    this.token$ = this.userService.authState.pipe(
      first(),
      switchMap((u) => {
        return this.configService.getConfigObjectValue<string>(`admins/${u.uid}`);
      })
    );
  }

}
