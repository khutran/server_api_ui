import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  @Input() value;

  constructor() { }

  ngOnInit() {
  }

}
