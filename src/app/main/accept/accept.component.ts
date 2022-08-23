
import {refCount,  map, publishReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable ,  ConnectableObservable } from 'rxjs';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'cusc-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {
  accepted: Observable<boolean>;
  acceptBox: UntypedFormControl;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.accepted = (this.userService
      .getUserObjectValue<boolean>('accepted')
      .pipe(
        map(a => !!a),
        publishReplay(1)
      ) as ConnectableObservable<boolean>).pipe(refCount());
    this.acceptBox = new UntypedFormControl(false);
  }

  accept() {
    this.userService.setUserObject('accepted', true).subscribe();
  }
}
