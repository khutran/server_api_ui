import { PipesModule } from './../../common/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { SharedModule } from '../../template/shared/shared.module';

@NgModule({
  imports: [CommonModule, CurrencyRoutingModule, FormsModule, PipesModule, DirectivesModule, SharedModule],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class CurrencyModule {}
