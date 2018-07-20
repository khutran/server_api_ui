import { AuthGuardService } from './../../auth/auth-guard.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
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
            path: 'create',
            component: CreateComponent
        }
    ],
    canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule { }
