import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBarcodeComponent } from './collection-barcode.component';

describe('CategoryTreeComponent', () => {
  let component: CollectionBarcodeComponent;
  let fixture: ComponentFixture<CollectionBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
