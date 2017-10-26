import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { AdminComponent } from './admin/admin.component';
import { ContestantDetailComponent } from './contestant-detail/contestant-detail.component';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { SlipCheckComponent } from './slip-check/slip-check.component';
import { SongCheckComponent } from './song-check/song-check.component';
import { SongPipe } from './song.pipe';
import { StatusPipe } from './status.pipe';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [
    AdminComponent,
    SlipCheckComponent,
    SongCheckComponent,
    ContestantListComponent,
    ContestantDetailComponent,
    AdminPagesComponent,
    StatusPipe,
    SongPipe
  ],
  providers: [AdminService]
})
export class AdminModule {}
