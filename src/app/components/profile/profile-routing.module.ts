import { AuthGuardService } from './../../auth/auth-guard.service';
import { DetailComponent } from './detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DetailComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
