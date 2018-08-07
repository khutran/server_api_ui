import { InputBase } from './InputBase';

export class Radio extends InputBase<string> {
  controlType = 'radio';
  style: string;
  options: { key: string; value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.style = options['style'] || '';
    this.options = options['options'] || [];
  }

  isInlineStyle() {
    return this.style === 'inline';
  }
}
