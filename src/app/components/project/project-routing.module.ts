import { AuthGuardService } from './../../auth/auth-guard.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvComponent } from './env/env.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'edit/:id/environment',
        component: EnvComponent
      }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
