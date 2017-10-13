import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../core/config/config.service';

@Component({
  selector: 'cusc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mode$: Observable<string>;

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.mode$ = this.config.getConfigObject(environment.modeKey).map((v) => v.$value);
  }

}
