import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [AngularCommonModule, DirectivesModule, ServicesModule, PipesModule],
  exports: [],
  declarations: []
})
export class AppCommonModule {}
