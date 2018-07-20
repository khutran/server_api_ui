import { InputBase } from './InputBase';

export class Dropdown extends InputBase<string> {
  controlType = 'dropdown';
  options: { key: string; value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
