import Model from "./Model";

class <%= classify(name) %> extends Model {
    constructor(options) {
        super();
        this.bind(options);
    }
}

export default <%= classify(name) %>;