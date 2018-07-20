import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WizardStep } from '../../types/WizardStep';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wizard-nav',
  templateUrl: './wizard-nav.component.html',
  styleUrls: ['./wizard-nav.component.scss']
})
export class WizardNavComponent implements OnInit {
  @Input() wizardSteps: WizardStep[];
  @Input() currentStep: number;
  @Output() onNextStep: EventEmitter<any> = new EventEmitter();
  @Output() onPrevStep: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {

  }

}
