import Model from "./Model";

class Redirect {
  public page: string;
  public defaultValue: object;
  constructor(_page: string = '', _defaultValue: object = {}) {
    this.page = _page;
    this.defaultValue = _defaultValue;
  }
  toObject() {
    return {
      page: this.page,
      defaultValue: this.defaultValue
    };
  }
  clone() {
    return new Redirect(this.page, this.defaultValue);
  }
  pageContain(str: string) {
    return this.page ? this.page.indexOf(str) > -1 : false;
  }
}

export default Redirect;
