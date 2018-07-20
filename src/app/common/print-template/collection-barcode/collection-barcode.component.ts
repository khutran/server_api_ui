import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-barcode',
  templateUrl: './collection-barcode.component.html',
  styleUrls: ['./collection-barcode.component.scss']
})
export class CollectionBarcodeComponent implements OnInit {

  @Input() value;
  public bags = [1, 2, 3, 4, 5];
  public address;
  constructor() { }

  ngOnInit() {
    if (this.value) {
      if (this.value.user) {
        this.address = this.value.user.getMainAddress();
      }
    }
  }

}
