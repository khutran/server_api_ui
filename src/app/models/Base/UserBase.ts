import Model from '../Model';

interface UserInterface {
  roles?: any[];
}

export default class UserBase extends Model implements UserInterface {
  public roles;
  constructor(options) {
    super();

    this.bind(options);
  }
}
