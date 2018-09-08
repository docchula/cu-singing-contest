import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
