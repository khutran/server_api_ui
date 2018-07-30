import { InputBase } from './InputBase';

export class CustomDropdown extends InputBase<string> {
  controlType = 'custom_dropdown';
  options: { key: string; value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}


