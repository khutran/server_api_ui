import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../../models/InputBase';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {
  @Input() input: InputBase<any>;
  @Input() form: FormGroup;
  @Input() submitted: Boolean;

  get isValid() {
    return this.submitted && this.form.controls[this.input.key].valid;
  }
}
