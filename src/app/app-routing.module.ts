import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AccountComponent } from './account/account/account.component';

const routes: Routes = [
  {path: '', component: AccountComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'chat', loadChildren: () => import('../app/messaging/messaging.module')
      .then(m => m.MessagingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
