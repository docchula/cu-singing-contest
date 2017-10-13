import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cusc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() checked: boolean;

  constructor() { }

  ngOnInit() {
  }

}
