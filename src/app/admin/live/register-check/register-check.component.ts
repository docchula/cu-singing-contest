import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from '../../../core/config/config.service';
import { LiveService } from '../../../core/live.service';
import { User } from '../../../shared/user';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'cusc-register-check',
  templateUrl: './register-check.component.html',
  styleUrls: ['./register-check.component.css']
})
export class RegisterCheckComponent implements OnInit {
  userData$: Observable<User>;
  uid$: Observable<string>;
  form: FormGroup;
  stringMode = ['standard', 'custom', 'live'];
  day: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private liveService: LiveService,
    private configService: ConfigService,
    private fba: FirebaseApp
  ) { }

  ngOnInit() {
    this.uid$ = this.userData$ = this.activatedRoute.params.pipe(
      map(params => {
        return params['uid'];
      })
    );
    this.userData$ = this.uid$.pipe(
      switchMap(uid => {
        return this.adminService.getUser(uid);
      })
    );
    this.form = new FormGroup({
      mobile: new FormControl(''),
      nameReading: new FormControl(''),
      songMode: new FormControl(''),
      songName: new FormControl(''),
      songArtist: new FormControl('')
    });
    this.configService
      .getConfigObjectValue<number>('liveDay')
      .pipe(first())
      .subscribe((liveDay) => {
        this.day = liveDay;
        this.userData$.pipe(first()).subscribe(data => {
          const selectedSong = liveDay === 6 ? data.selectedSong2 : data.selectedSong;
          console.log(selectedSong);
          this.form.get('mobile').setValue(data.profile.mobile);
          this.form.get('songMode').setValue(selectedSong.mode);
          if (selectedSong.song) {
            this.form.get('songName').setValue(selectedSong.song.name);
            this.form.get('songArtist').setValue(selectedSong.song.artist);
          }
        });
      });
  }

  register() {
    this.uid$
      .pipe(
        first(),
        switchMap(uid => {
          return this.liveService.registerDetails(this.form.value, uid, this.day);
        })
      )
      .subscribe(() => {
        const fn = this.fba.functions().httpsCallable('registerContestant');
        this.uid$
          .pipe(
            first(),
            switchMap(uid => {
              return fn({ uid });
            })
          )
          .subscribe(({ data: result }) => {
            if (result.success) {
              alert(
                `ลงทะเบียนเรียบร้อย หมายเลขผู้เข้าแข่งขัน ${result.contestantId} รหัสไฟล์ ${result.fileId}`
              );
              this.router.navigate(['../'], {
                relativeTo: this.activatedRoute
              });
            } else {
              alert(`เกิดข้อผิดพลาด ${result.reason}`);
            }
          });
      });
  }
}
