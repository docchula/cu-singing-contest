import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { first, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ConfigService } from '../core/config/config.service';
import { CunetService } from '../core/cunet/cunet.service';
import { UserService } from '../core/user/user.service';


@Component({
  selector: 'cusc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private cunetService: CunetService,
    private router: Router,
    private userService: UserService,
    private configService: ConfigService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        map(pm => pm.get('ticket')),
        first()
      )
      .subscribe(s => {
        if (s) {
          this.submitTicket(s);
        } else {
          this.document.location.href = `https://account.it.chula.ac.th/login?service=${
            environment.redirectUrl
          }&serviceName=CU+Singing+Contest`;
        }
      });
  }

  submitTicket(ticket: string) {
    this.cunetService
      .getTokenFromTicket(ticket)
      .subscribe(v => {
        if (v.success) {
          this.userService.signIn(v.token).subscribe(
            _ => {
              const uid = (jwtDecode(v.token) as object)['uid'];
              this.configService
                .getConfigObjectSnapshot(`admins/${uid}`)
                .pipe(first())
                .subscribe(snap => {
                  if (snap.payload.exists()) {
                    if (
                      confirm(
                        'คุณมีสิทธิในการเข้าสู่หน้าผู้ดูแล ต้องการไปหน้าผู้ดูแลหรือไม่?'
                      )
                    ) {
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
            }
          );
        } else {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      });
  }
}
