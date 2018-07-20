import { Directive, ElementRef, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { AppInjector } from './../../../app-injector';
import * as $ from 'jquery';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[detectBarcodeScanner]',
  providers: [NgModel]
})
export class BarcodeScannerDetectorDirective {
  @Input('detectBarcodeScanner') data: any;
  @Output('afterScan') afterScan = new EventEmitter<any>();
  private isStarted = false;
  private typed = "";
  constructor(private el: ElementRef, private notificationService: NotificationService) {
    console.log("running");
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      this.typed += event.key;
    }
    if (!this.isStarted) {
      this.isStarted = true;
      // if people can type 10 words in 300 ms means they are pro
      // also barcode scanner will emit shift in the middle
      setTimeout(() => {
        if (this.typed.length > 4) {
          if (this.typed.indexOf('Shift') > -1) {
            let typedReal = this.typed.split('Shift').map(s => s.toUpperCase()).join("");
            this.afterScan.emit(typedReal);
            this.notificationService.show('barcode-scanner', `${typedReal}`, 2000);
          }
        }
        this.typed = "";
        this.isStarted = false;
      }, 300);
    }
  }


}
