import Model from './Model';
import * as _ from 'lodash';

interface CategoryInterface {
  getFullPath(): String;
  hasParentCategory(): Boolean;
  getName(): String;
  getParentCategory(): CategoryInterface;
}

class Category extends Model implements CategoryInterface {
  constructor(options) {
    super();
    (this as any).categories = d => {
      return _.map(d.data, item => new Category(item));
    };
    (this as any).parent_category = d => {
      return new Category(d.data);
    };
    this.bind(options);
  }

  getParentCategory(): CategoryInterface {
    return (this as any).parent_category;
  }

  getName(): String {
    return (this as any).name;
  }

  hasParentCategory(): Boolean {
    return !_.isNil((this as any).parent_category);
  }

  getFullPath(): String {
    if (!this.hasParentCategory()) {
      return this.getName();
    } else {
      return `${this.getParentCategory().getFullPath()} - ${this.getName()}`;
    }
  }
}

export default Category;
