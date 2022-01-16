import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./containers/introduction/introduction.module').then((m) => m.IntroductionModule),
      },
      {
        path: 'username',
        loadChildren: () => import('./containers/set-username/set-username.module').then((m) => m.SetUsernameModule),
      },
      {
        path: 'password',
        loadChildren: () => import('./containers/set-password/set-password.module').then((m) => m.SetPasswordModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./containers/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
      },
      {
        path: '**',
        loadChildren: () => import('./containers/not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
