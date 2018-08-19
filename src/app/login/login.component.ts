import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

import { CunetService } from '../core/cunet/cunet.service';
import { UserService } from '../core/user/user.service';
import { ConfigService } from '../core/config/config.service';

@Component({
  selector: 'cusc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  disableSubmit = false;

  constructor(
    private cunetService: CunetService,
    private router: Router,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.disableSubmit = true;
    this.cunetService
      .getToken(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(v => {
        if (v.success) {
          this.userService.signIn(v.token).subscribe(
            _ => {
              const uid = (jwtDecode(v.token) as object)['uid'];
              this.configService.getConfigObjectSnapshot(`admins/${uid}`).pipe(
                first()
              ).subscribe((snap) => {
                if (snap.payload.exists()) {
                  if (confirm('คุณมีสิทธิในการเข้าสู่หน้าผู้ดูแล ต้องการไปหน้าผู้ดูแลหรือไม่?')) {
                    this.router.navigate(['/', snap.payload.val()]);
                  } else {
                    this.router.navigate(['/main']);
                  }
                } else {
                  this.router.navigate(['/main']);
                }
              });
            },
            error => {
              alert('เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง');
              this.disableSubmit = false;
            }
          );
        } else {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
          this.disableSubmit = false;
        }
      });
  }
}
