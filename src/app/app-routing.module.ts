import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, IsLoggedInGuard } from '@core/guards';

import { LayoutComponent } from '@layout/components/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@pages/login/login.module').then(m => m.LoginModule),
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'registrar',
    loadChildren: () => import('@pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'chat' },
      {
        path: 'chat',
        loadChildren: () => import('@pages/chat/chat.module').then(m => m.ChatModule),
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
