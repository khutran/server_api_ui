import { PipesModule } from './../../common/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { DirectivesModule } from '../../common/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    <%= classify(name) %>RoutingModule,
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
export class <%= classify(name) %>Module { }
