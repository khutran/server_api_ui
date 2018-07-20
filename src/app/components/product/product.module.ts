import { PipesModule } from './../../common/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiUrl } from '../../api/api-url.service';
import { DirectivesModule } from './../../common/directives/directives.module';
import { ListComponent } from './list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../template/shared/shared.module';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, HttpClientModule, FormsModule, DirectivesModule, PipesModule, NgSelectModule, SharedModule],
  providers: [ApiUrl],
  declarations: [ListComponent, EditComponent, DetailComponent, CreateComponent]
})
export class ProductModule {}
