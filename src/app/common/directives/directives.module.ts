import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { RangeComponent } from './range/range.component';
import { NotifyComponent } from './notify/notify.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { LengthAwarePaginatorComponent } from './length-aware-paginator/length-aware-paginator.component';
import { SortByFieldComponent } from './sort-by-field/sort-by-field.component';
import { PerPageComponent } from './per-page/per-page.component';
import { MultiPurposeSearchComponent } from './multi-purpose-search/multi-purpose-search.component';
import { InputMaskDirective } from './input-mask/input-mask.directive';
import { CountryFieldComponent } from './country-field/country-field.component';
import { InputSwitchDirective } from './input-switch/input-switch.directive';
import { InputCheckboxDirective } from './input-checkbox/input-checkbox.directive';
import { BarcodeScannerDetectorDirective } from './barcode-scanner-detector/barcode-scanner-detector.directive';
import { AutoresizeDirective } from './autoresize/autoresize.directive';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { CustomSelectionComponent } from './custom-selection/custom-selection.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicInputComponent } from './dynamic-form/dynamic-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PipesModule],
  exports: [
    PaginationComponent,
    LoaderComponent,
    SearchInputComponent,
    RangeComponent,
    NotifyComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    InputMaskDirective,
    CountryFieldComponent,
    InputSwitchDirective,
    InputCheckboxDirective,
    BarcodeScannerDetectorDirective,
    AutoresizeDirective,
    PhoneInputComponent,
    CustomSelectionComponent,
    DynamicFormComponent,
    DynamicInputComponent
  ],
  declarations: [
    PaginationComponent,
    LoaderComponent,
    SearchInputComponent,
    RangeComponent,
    NotifyComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    InputMaskDirective,
    CountryFieldComponent,
    InputSwitchDirective,
    InputCheckboxDirective,
    BarcodeScannerDetectorDirective,
    AutoresizeDirective,
    PhoneInputComponent,
    CustomSelectionComponent,
    DynamicFormComponent,
    DynamicInputComponent
  ]
})
export class DirectivesModule {}
