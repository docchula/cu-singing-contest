import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../core/config/config.service';
import { UserService } from '../../core/user/user.service';
import { Faculty } from '../../shared/faculty';

@Component({
  selector: 'cusc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  faculties$: Observable<Faculty[]>;
  disableSubmit = false;
  profile$: Observable<any>;
  profileDone$: Observable<boolean>;
  currentFaculty$: Observable<Faculty>;

  constructor(private configService: ConfigService, private userService: UserService) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      title: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      nname: new FormControl('', Validators.required),
      facebook: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      faculty: new FormControl('', Validators.required),
      education: new FormControl(null, Validators.required)
    });
    this.faculties$ = this.configService.getConfigList<Faculty>('faculties');
    this.profile$ = this.userService.getUserObject('profile');
    this.profileDone$ = this.profile$.map((v) => v.$exists());
    this.profile$.first().subscribe((profile) => {
      if (profile.$exists()) {
        this.profileForm.setValue(profile);
      }
    });
    this.currentFaculty$ = this.profile$.map((p) => p.faculty);
  }

  submit() {
    if (this.profileForm.valid) {
      this.disableSubmit = true;
      this.userService.setUserObject('profile', this.profileForm.value).subscribe(() => {
        this.disableSubmit = false;
      });
    }
  }

}
