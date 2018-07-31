import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { NFReactiveFormModule } from './nfreactive-form/nfreactive-form.module';

@NgModule({
  imports: [AngularCommonModule, DirectivesModule, ServicesModule, PipesModule, NFReactiveFormModule],
  exports: [],
  declarations: []
})
export class AppCommonModule {}
