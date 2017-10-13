import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModeGuard } from './mode.guard';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ModeGuard]
  },
  {
    path: 'main',
    loadChildren: './main/main.module.ts#MainModule'
  },
  {
    path: ':token',
    loadChildren: './admin/admin.module.ts#AdminModule',
    canLoad: [UserGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
