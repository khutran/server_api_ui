import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { PipesModule } from './../../common/pipes/pipes.module';
import { DirectivesModule } from './../../common/directives/directives.module';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    DirectivesModule,
    PipesModule,
    SweetAlert2Module
  ],
  declarations: [ListComponent, CreateComponent, EditComponent, DetailComponent]
})
export class OrderModule { }
