export class InputBase<T> {
  value: T;
  key: string;
  icon: string;
  classes: string[];
  group_classes: string[];
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(
    options: {
      value?: T;
      key?: string;
      icon?: string;
      label?: string;
      classes?: string[];
      group_classes?: string[];
      required?: boolean;
      order?: number;
      controlType?: string;
    } = {}
  ) {
    this.value = options.value;
    this.icon = options.icon;
    this.key = options.key || '';
    this.label = options.label || '';
    this.classes = options.classes || [];
    this.group_classes = options.group_classes || ['col-12'];
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
