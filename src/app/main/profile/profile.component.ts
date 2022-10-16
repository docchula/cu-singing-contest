import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  profileForm: UntypedFormGroup;
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
    this.profileForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      fname: new UntypedFormControl('', Validators.required),
      lname: new UntypedFormControl('', Validators.required),
      nname: new UntypedFormControl('', Validators.required),
      facebook: new UntypedFormControl('', Validators.required),
      line: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      mobile: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      faculty: new UntypedFormControl('', Validators.required),
      education: new UntypedFormControl('', Validators.required)
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
