import { DirectivesModule } from './../../common/directives/directives.module';
import { PipesModule } from './../../common/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AclRoutingModule } from './acl-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    AclRoutingModule,
    FormsModule,
    PipesModule,
    DirectivesModule,
    SweetAlert2Module,
  ],
  declarations: [RolesComponent]
})
export class AclModule { }
