import { PipesModule } from './../../common/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { SharedModule } from '../../template/shared/shared.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NFReactiveFormModule } from '../../common/nfreactive-form/nfreactive-form.module';

@NgModule({
  imports: [CommonModule, ProjectRoutingModule, FormsModule, PipesModule, DirectivesModule, SweetAlert2Module, SharedModule, NFReactiveFormModule],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class ProjectModule {}
