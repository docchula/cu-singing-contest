import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
  facultyNameKey: string;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(LOCALE_ID) private localeId: string
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      title: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      nname: new FormControl('', Validators.required),
      facebook: new FormControl('', Validators.required),
      line: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      faculty: new FormControl('', Validators.required),
      education: new FormControl(null, Validators.required)
    });
    this.faculties$ = this.configService.getConfigListValue<Faculty>('faculties');
    this.profile$ = this.userService.getUserObjectValue('profile');
    this.profileDone$ = this.profile$.pipe(map(v => !!v));
    this.profile$.pipe(first()).subscribe(profile => {
      if (profile) {
        this.profileForm.setValue(profile);
      }
    });
    this.currentFaculty$ = this.profile$.pipe(map(p => {
      if (p) {
        return p.faculty;
      } else {
        return null;
      }
    }));
    this.facultyNameKey = this.localeId === 'th' ? 'name' : 'nameEn';
  }

  submit() {
    if (this.profileForm.valid) {
      this.disableSubmit = true;
      this.userService
        .setUserObject('profile', this.profileForm.value)
        .subscribe(() => {
          this.disableSubmit = false;
        });
    }
  }
}
