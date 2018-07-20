import Model from "../Model";

class ProductBase extends Model {
    constructor(options) {
        super();

        this.bind(options);
    }
}

export default ProductBase;