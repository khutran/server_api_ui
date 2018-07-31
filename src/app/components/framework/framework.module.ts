import { PipesModule } from './../../common/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FrameworkRoutingModule } from './framework-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { SharedModule } from '../../template/shared/shared.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  imports: [CommonModule, FrameworkRoutingModule, FormsModule, PipesModule, DirectivesModule, SharedModule, SweetAlert2Module],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class FrameworkModule {}
