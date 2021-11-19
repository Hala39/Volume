import { TestComponent } from './test/test.component';
import { SearchPageComponent } from './shared/search-page/search-page.component';
import { ContactsPageComponent } from './shared/contacts-page/contacts-page.component';
import { NotificationsPageComponent } from './shared/notifications-page/notifications-page.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { PostComponent } from './shared/post/post.component';
import { CanLoadGuard } from './guards/can-load.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'register', loadChildren: () => import('../app/account/account.module')
    .then(m => m.AccountModule)
  },
  {
    path: 'home', loadChildren: () => import('../app/home/home.module')
    .then(m => m.HomeModule),
    canLoad: [CanLoadGuard]
  },
  {
    path: 'profile', loadChildren: () => import('../app/profile/profile.module')
      .then(m => m.ProfileModule),
      canLoad: [CanLoadGuard]
  },
  {
    path: 'post/:id', component: PostComponent, canActivate: [CanActivateGuard]
  },
  {
    path: 'notifications', component: NotificationsPageComponent, canActivate: [CanActivateGuard]
  }, 
  {
    path: 'contacts', component: ContactsPageComponent, canActivate: [CanActivateGuard]
  },
  {
    path: 'search', component: SearchPageComponent, canActivate: [CanActivateGuard]
  },
  {
    path: 'facebook', component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
