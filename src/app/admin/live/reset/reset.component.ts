import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseApp } from '@angular/fire/compat';

@Component({
  selector: 'cusc-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  dayInput: FormControl;
  btnDisabled = false;

  constructor(private fb: FormBuilder, private fba: FirebaseApp) { }

  ngOnInit() {
    this.dayInput = this.fb.control(1, [Validators.max(6), Validators.min(1)]);
  }

  reset() {
    if (this.dayInput.valid) {
      if (confirm('แน่ใจจริง ๆ หรอ มันจะลบหมดเลยนะะะะ?')) {
        const fn = this.fba.functions().httpsCallable('resetDay');
        this.btnDisabled = true;
        fn({
          day: this.dayInput.value
        }).then(res => {
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
