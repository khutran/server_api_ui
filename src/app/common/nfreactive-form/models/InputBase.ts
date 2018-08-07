import { ValidatorFn } from '@angular/forms';
export class InputBase<T> {
  label: string;
  key: string;
  value: T;
  classes: string[];
  group: number;
  group_classes: string[];
  validators: ValidatorFn[];
  controlType: string;

  constructor(
    options: {
      label?: string;
      key?: string;
      value?: T;
      classes?: string[];
      group?: number;
      group_classes?: string[];
      validators?: ValidatorFn[];
      controlType?: string;
    } = {}
  ) {
    this.label = options.label || '';
    this.key = options.key || '';
    this.value = options.value;
    this.classes = options.classes || [];
    this.group = options.group === undefined ? 1 : options.group;
    this.group_classes = options.group_classes || ['col-12'];
    this.validators = Array.isArray(options.validators) ? options.validators : [];
    this.controlType = options.controlType || '';
  }
}
