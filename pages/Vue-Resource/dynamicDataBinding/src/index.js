


function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    ...require('./instance/bindings'),
    observer: {...require('./observer/observer')}
};

module.exports = Bue;