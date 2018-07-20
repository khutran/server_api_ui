import { AuthGuardService } from './../../auth/auth-guard.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
// import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      // {
      //   path: 'detail/:id',
      //   component: DetailComponent
      // },
      {
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: 'create',
        component: CreateComponent
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
export class CategoryRoutingModule { }
