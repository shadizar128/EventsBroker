var Base = require('./Base');

class Observer extends Base {

    /**
     * Event listener
     * @param {Event} event
     */
    onEvent(event) {throw 'Abstract method must be implemented';}

}

module.exports = Observer;
