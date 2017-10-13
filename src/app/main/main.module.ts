import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AcceptGuard } from './accept.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { AcceptComponent } from './accept/accept.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './profile.guard';
import { TitleComponent } from './profile/title/title.component';
import { EducationLevelComponent } from './profile/education-level/education-level.component';
import { SelectDayComponent } from './select-day/select-day.component';
import { DayGuard } from './day.guard';
import { PayComponent } from './pay/pay.component';
import { SelectSongComponent } from './select-song/select-song.component';
import { PayGuard } from './pay.guard';
import { SongSearcherComponent } from './select-song/song-searcher/song-searcher.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, AcceptComponent, ProfileComponent, TitleComponent, EducationLevelComponent, SelectDayComponent, PayComponent, SelectSongComponent, SongSearcherComponent],
  providers: [AcceptGuard, ProfileGuard, DayGuard, PayGuard]
})
export class MainModule { }
