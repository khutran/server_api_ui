import Model from "../Model";

export default class UserBase extends Model {
    constructor(options) {
        super();

        this.bind(options);
    }
}
