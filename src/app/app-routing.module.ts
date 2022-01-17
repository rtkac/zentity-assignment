import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { AuthGuard } from './guards/auth.guard';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./containers/introduction/introduction.module').then((m) => m.IntroductionModule),
        canActivate: [ProfileGuard],
      },
      {
        path: 'username',
        loadChildren: () => import('./containers/set-username/set-username.module').then((m) => m.SetUsernameModule),
        canActivate: [ProfileGuard],
      },
      {
        path: 'password',
        loadChildren: () => import('./containers/set-password/set-password.module').then((m) => m.SetPasswordModule),
        canActivate: [ProfileGuard],
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./containers/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '**',
        loadChildren: () => import('./containers/not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
