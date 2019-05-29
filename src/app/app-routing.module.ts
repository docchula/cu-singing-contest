import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModeGuard } from './mode.guard';
import { ShowBoardComponent } from './show-board/show-board.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: 'show_board',
    component: ShowBoardComponent
  },
  {
    path: '',
    component: AppComponent,
    children: [
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
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
      {
        path: ':token',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canLoad: [UserGuard, AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
