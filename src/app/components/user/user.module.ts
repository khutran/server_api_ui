import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from './../../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from './user-routing.module';
import { PipesModule } from '../../common/pipes/pipes.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../../template/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    PipesModule,
    DirectivesModule,
    FormsModule,
    SweetAlert2Module,
    SharedModule
  ],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class UserModule { }
