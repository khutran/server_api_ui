import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodeComponent } from './product-barcode/barcode.component';
import { CollectionBarcodeComponent } from './collection-barcode/collection-barcode.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, PipesModule, NgxBarcodeModule],
  exports: [
    BarcodeComponent,
    CollectionBarcodeComponent
  ],
  declarations: [
    BarcodeComponent,
    CollectionBarcodeComponent
  ]
})
export class PrintTemplateModule {}
