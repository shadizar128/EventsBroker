var Observer = require('../../../lib/Observer');
var Singleton = require('../../../lib/Mixins/Singleton');

class SecurityManager extends Singleton(Observer) {

    /**
     * Event listener
     * @param {Event} event
     */
    onEvent(event) {

        console.log('Event received', this, event);

        event.onObserved(true);
    }

}

module.exports = SecurityManager;