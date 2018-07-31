import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ReactiveFormComponent, DynamicInputComponent],
  exports: [ReactiveFormComponent]
})
export class NFReactiveFormModule {}
