import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AcceptGuard } from './accept.guard';
import { AcceptComponent } from './accept/accept.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DayGuard } from './day.guard';
import { MainRoutingModule } from './main-routing.module';
import { PayGuard } from './pay.guard';
import { PayComponent } from './pay/pay.component';
import { ProfileGuard } from './profile.guard';
import { EducationLevelComponent } from './profile/education-level/education-level.component';
import { ProfileComponent } from './profile/profile.component';
import { TitleComponent } from './profile/title/title.component';
import { SelectDayComponent } from './select-day/select-day.component';
import { SelectSongComponent } from './select-song/select-song.component';
import { SongSearcherComponent } from './select-song/song-searcher/song-searcher.component';
import { PostRegisterGuard } from './post-register.guard';
import { ViewDayComponent } from './view-day/view-day.component';
import { SongNameInputComponent } from './select-song/song-name-input/song-name-input.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, SharedModule],
  declarations: [
    DashboardComponent,
    AcceptComponent,
    ProfileComponent,
    TitleComponent,
    EducationLevelComponent,
    SelectDayComponent,
    PayComponent,
    SelectSongComponent,
    SongSearcherComponent,
    ViewDayComponent,
    SongNameInputComponent
  ],
  providers: [AcceptGuard, ProfileGuard, DayGuard, PayGuard, PostRegisterGuard]
})
export class MainModule {}
