import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'cusc-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  dayInput: UntypedFormControl;
  btnDisabled = false;

  constructor(private fb: UntypedFormBuilder, private fns: AngularFireFunctions) { }

  ngOnInit() {
    this.dayInput = this.fb.control(1, [Validators.max(6), Validators.min(1)]);
  }

  reset() {
    if (this.dayInput.valid) {
      if (confirm('แน่ใจจริง ๆ หรอ มันจะลบหมดเลยนะะะะ?')) {
        const fn = this.fns.httpsCallable('resetDay');
        this.btnDisabled = true;
        lastValueFrom(fn({
          day: this.dayInput.value
        })).then(res => {
          if (res.data.success) {
            alert('Reset เรียบร้อย');
          } else {
            alert(`Reset ไม่ได้ เนื่องจาก ${res.data.reason}`);
          }
          this.btnDisabled = false;
        });
      }
    }
  }

}
