import Model from "./Model";

class Server extends Model {
    constructor(options) {
        super();
        this.bind(options);
    }
}

export default Server;