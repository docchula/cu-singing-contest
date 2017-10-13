import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SongPipe } from './song.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    CheckboxComponent,
    SongPipe
  ],
  declarations: [CheckboxComponent, SongPipe]
})
export class SharedModule { }
