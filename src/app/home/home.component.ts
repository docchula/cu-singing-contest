import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
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
    this.mode$ = this.config.getConfigObjectValue<string>(environment.modeKey);
  }

}
