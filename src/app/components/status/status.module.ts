import { PipesModule } from './../../common/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { StatusRoutingModule } from './status-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { SharedModule } from '../../template/shared/shared.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  imports: [CommonModule, StatusRoutingModule, FormsModule, PipesModule, DirectivesModule, SweetAlert2Module, SharedModule],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class StatusModule {}
