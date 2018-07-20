import { PipesModule } from './../../common/pipes/pipes.module';
import { DesignerRoutingModule } from './designer-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../common/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    FormsModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [
    ListComponent,
    EditComponent,
    CreateComponent
  ]
})
export class DesignerModule { }
