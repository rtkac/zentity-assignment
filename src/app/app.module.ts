import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './store/app.reducer';
import { UserEffects } from './store/user/user.effects';

import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([UserEffects]),
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => () => userService.loadUser(),
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
