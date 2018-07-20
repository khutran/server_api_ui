import Model from "./Model";

class Currency extends Model {
    constructor(options) {
        super();
        this.bind(options);
    }
}

export default Currency;