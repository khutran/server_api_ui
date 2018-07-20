import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardNavComponent } from './wizard-nav.component';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
describe('WizardNavComponent', () => {
  let component: WizardNavComponent;
  let fixture: ComponentFixture<WizardNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipesModule, CommonModule, RouterTestingModule.withRoutes([])],
      declarations: [ WizardNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardNavComponent);
    component = fixture.componentInstance;
  });

  fit('should create wizard with 2 steps', () => {
    fixture.whenStable().then(() => {
      component.currentStep = 0;
      component.wizardSteps = [
        {
          "name": "hans",
          "icon": "hans.jpg",
          "redirect": ""
        },
        {
          "name": "frans",
          "icon": "frans.jpg",
          "redirect": ""
        }
      ];
      fixture.detectChanges();
      let inputs = fixture.debugElement.queryAll(By.css('li'));
      expect(inputs.length).toEqual(2);
    });
  });

});
