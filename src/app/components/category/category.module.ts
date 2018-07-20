import { DirectivesModule } from './../../common/directives/directives.module';
import { PipesModule } from './../../common/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../template/shared/shared.module';

@NgModule({
  imports: [CommonModule, CategoryRoutingModule, FormsModule, PipesModule, DirectivesModule, SharedModule],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class CategoryModule {}
