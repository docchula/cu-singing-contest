import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SongPipe } from './song.pipe';
import { SongModePipe } from './song-mode.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    CheckboxComponent,
    SongPipe,
    SongModePipe
  ],
  declarations: [CheckboxComponent, SongPipe, SongModePipe]
})
export class SharedModule { }
