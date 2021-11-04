import { CanLoadGuard } from './guards/can-load.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'register', loadChildren: () => import('../app/account/account.module')
    .then(m => m.AccountModule)
  },
  {path: 'home', loadChildren: () => import('../app/home/home.module')
    .then(m => m.HomeModule),
    canLoad: [CanLoadGuard]
  },
  {
    path: 'chat', loadChildren: () => import('../app/messaging/messaging.module')
      .then(m => m.MessagingModule),
      canLoad: [CanLoadGuard]
  },
  {
    path: 'profile', loadChildren: () => import('../app/profile/profile.module')
      .then(m => m.ProfileModule),
      canLoad: [CanLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
