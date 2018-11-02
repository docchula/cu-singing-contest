import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live/live.component';
import { RegisterCheckComponent } from './register-check/register-check.component';
import { RegisterComponent } from './register/register.component';
import { ControllerComponent } from './controller/controller.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  imports: [
    CommonModule,
    LiveRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LiveComponent, RegisterComponent, RegisterCheckComponent, ControllerComponent, ResetComponent]
})
export class LiveModule { }
