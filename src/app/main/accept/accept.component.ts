import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'cusc-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  accepted: Observable<boolean>;
  acceptBox: FormControl;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.accepted = this.userService.getUserObject('accepted').map((v) => v.$value).map((a) => !!a).publishReplay(1).refCount();
    this.acceptBox = new FormControl(false);
  }

  accept() {
    this.userService.setUserObject('accepted', true).subscribe();
  }

}
