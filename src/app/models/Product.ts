import Model from './Model';
import Category from './Category';
import Designer from './Designer';
import Status from './Status';
import Style from './Style';
import Size from './Size';
import User from './User';
import Media from './Media';
import Currency from './Currency';
import ArrayList from './ArrayList';
import OrderProduct from './OrderProduct';
import ProductBase from './Base/ProductBase';
import * as _ from 'lodash';

interface ProductInterface {
  id: Number;
  sku: Number;
  name: any;
  description: String;
  color: any;
  size: any;
  categories: any;
  provider: any;
  designer: any;
  process_type: any;
  user: any;
  styles: any;
  destination: any;
  location: any;
  currency: any;
  getOriginalPrice(): any;
  hasImage(): Boolean;
  getImageUrl(): String;
}

class Product extends ProductBase implements ProductInterface {
  styles: any;
  id: Number;
  sku: Number;
  name: any;
  description: String;
  color: any;
  size: any;
  categories: any;
  provider: any;
  designer: any;
  process_type: any;
  currency: any;
  user: any;
  destination: any;
  location: any;
  constructor(options) {
    super(options);
    (this as any).categories = d => {
      return new ArrayList<Category>(Category, d.data);
    };
    (this as any).designer = d => {
      return new Designer(d.data);
    };
    (this as any).process_status = d => {
      return new Status(d.data);
    };
    (this as any).media = d => {
      return new ArrayList<Media>(Media, d.data);
    };
    (this as any).styles = d => {
      return new ArrayList<Style>(Style, d.data);
    };
    (this as any).size = d => {
      return new Size(d.data);
    };
    (this as any).user = d => {
      return new User(d.data);
    };
    (this as any).currency = d => {
      return new Currency(d.data);
    };

    (this as any).order_product = d => {
      return new OrderProduct(d.data);
    };

    this.bind(options);
  }
  getOriginalPrice(): any {
    if (!_.isUndefined((this as any).original_price)) {
      return Number((this as any).original_price);
    } else {
      return '';
    }
  }
  saveChanged() {
    this._backup(['destination_id', 'location_id']);
  }

  hasImage(): Boolean {
    return !_.isNil((this as any).image) && !_.isNil((this as any).image.file);
  }

  getImageUrl(): String {
    if (this.hasImage()) {
      return (this as any).image.file;
    } else {
      return '';
    }
  }

  getImageBackgroundStyle(): String {
    return `url("${this.getImageUrl()}")`;
  }
}

export default Product;
