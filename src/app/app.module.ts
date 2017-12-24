import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminGuard } from './admin.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModeGuard } from './mode.guard';
import { SharedModule } from './shared/shared.module';
import { UserGuard } from './user.guard';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ShowBoardComponent } from './show-board/show-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    WrapperComponent,
    ShowBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [UserGuard, ModeGuard, AdminGuard],
  bootstrap: [WrapperComponent]
})
export class AppModule { }
