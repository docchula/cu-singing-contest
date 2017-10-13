import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CunetService } from '../core/cunet/cunet.service';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'cusc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  disableSubmit = false;

  constructor(private cunetService: CunetService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.disableSubmit = true;
    this.cunetService.getToken(this.loginForm.value.username, this.loginForm.value.password).subscribe((v) => {
      if (v.success) {
        this.userService.signIn(v.token).subscribe((_) => {
          this.router.navigate(['/main']);
        }, (error) => {
          alert('เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง');
          this.disableSubmit = false;
        });
      } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        this.disableSubmit = false;
      }
    });
  }

}
