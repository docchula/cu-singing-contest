import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { ConfigService } from './config/config.service';
import { CunetService } from './cunet/cunet.service';
import { UserService } from './user/user.service';
import { LiveService } from './live.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ConfigService, UserService, CunetService, LiveService]
})
export class CoreModule { }
