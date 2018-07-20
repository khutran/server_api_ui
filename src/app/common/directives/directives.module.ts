import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { DataTableComponent } from './data-table/data-table.component';
import { RangeComponent } from './range/range.component';
import { NotifyComponent } from './notify/notify.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { LengthAwarePaginatorComponent } from './length-aware-paginator/length-aware-paginator.component';
import { SortByFieldComponent } from './sort-by-field/sort-by-field.component';
import { PerPageComponent } from './per-page/per-page.component';
import { MultiPurposeSearchComponent } from './multi-purpose-search/multi-purpose-search.component';
import { WizardNavComponent } from './wizard-nav/wizard-nav.component';
import { OptionsTreeComponent } from './options-tree/options-tree.component';
import { InputMaskDirective } from './input-mask/input-mask.directive';
import { CountryFieldComponent } from './country-field/country-field.component';
import { InputSwitchDirective } from './input-switch/input-switch.directive';
import { NgxBarcodeModule } from 'ngx-barcode';
import { InputCheckboxDirective } from './input-checkbox/input-checkbox.directive';
import { BarcodeScannerDetectorDirective } from './barcode-scanner-detector/barcode-scanner-detector.directive';
import { BlockDirective } from './block/block.directive';
import { AutoresizeDirective } from './autoresize/autoresize.directive';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { CustomSelectionComponent } from './custom-selection/custom-selection.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicInputComponent } from './dynamic-form/dynamic-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PipesModule, NgxBarcodeModule],
  exports: [
    PaginationComponent,
    LoaderComponent,
    SearchInputComponent,
    DataTableComponent,
    RangeComponent,
    NotifyComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    WizardNavComponent,
    OptionsTreeComponent,
    InputMaskDirective,
    CountryFieldComponent,
    InputSwitchDirective,
    InputCheckboxDirective,
    BarcodeScannerDetectorDirective,
    BlockDirective,
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
    DataTableComponent,
    RangeComponent,
    NotifyComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    WizardNavComponent,
    OptionsTreeComponent,
    InputMaskDirective,
    CountryFieldComponent,
    InputSwitchDirective,
    InputCheckboxDirective,
    BarcodeScannerDetectorDirective,
    BlockDirective,
    AutoresizeDirective,
    PhoneInputComponent,
    CustomSelectionComponent,
    DynamicFormComponent,
    DynamicInputComponent
  ]
})
export class DirectivesModule {}
