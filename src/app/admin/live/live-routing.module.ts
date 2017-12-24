import { ControllerComponent } from './controller/controller.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../../admin.guard';
import { AdminPagesComponent } from '../admin-pages/admin-pages.component';
import { LiveComponent } from './live/live.component';
import { RegisterCheckComponent } from './register-check/register-check.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'live',
    canActivate: [AdminGuard],
    component: AdminPagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LiveComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register/:uid',
        component: RegisterCheckComponent
      },
      {
        path: 'controller',
        component: ControllerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRoutingModule {}
