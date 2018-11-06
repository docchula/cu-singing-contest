import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../admin.guard';
import { AdminComponent } from './admin/admin.component';
import { SlipCheckComponent } from './slip-check/slip-check.component';
import { SongCheckComponent } from './song-check/song-check.component';
import { SetDayBatchComponent } from './set-day-batch/set-day-batch.component';
import { ChangeDayComponent } from './change-day/change-day.component';
import { SetSongSecondRoundComponent } from './set-song-second-round/set-song-second-round.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminComponent
      },
      {
        path: '',
        component: AdminPagesComponent,
        children: [
          {
            path: 'slip_check',
            component: SlipCheckComponent
          },
          {
            path: 'song_check',
            component: SongCheckComponent
          },
          {
            path: 'contestant_list',
            component: ContestantListComponent
          },
          {
            path: 'set_day_batch',
            component: SetDayBatchComponent
          },
          {
            path: 'change_day',
            component: ChangeDayComponent
          },
          {
            path: 'set_second_round',
            component: SetSongSecondRoundComponent
          }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
