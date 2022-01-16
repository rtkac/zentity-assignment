import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './store/app.reducer';

import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

function UserServiceFactory(userService: UserService) {
  return () => userService.load();
}

@NgModule({
  declarations: [AppComponent, SpinnerComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([]), // !!! TODO - are effects really needed? (@ngrx/effects package)
  ],
  providers: [
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: UserServiceFactory,
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
