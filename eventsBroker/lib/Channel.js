var Base = require('./Base');

class Channel extends Base {

    /**
     * Class constructor
     */
    constructor(config = {}) {

        // call parent constructor
        super(config);

        // init subscribers
        this.subscribers = new Map();

    }

    /**
     * Class destructor
     */
    destructor() {

        // clear subscribers
        this.subscribers.clear();

    }

    /**
     * Add subscriber
     * @param {Observer} subscriber
     */
    addSubscriber(subscriber) {

        // add subscriber
        if (!this.subscribers.has(subscriber)) {
            this.subscribers.set(subscriber, subscriber)
        }

    }

    /**
     * Remove subscriber
     * @param {Observer} subscriber
     */
    removeSubscriber(subscriber) {
        this.subscribers.delete(subscriber);
    }

    /**
     * Returns true if at least one subscriber
     * @returns {boolean}
     */
    hasSubscribers() {
        return this.subscribers.size > 0;
    }

    /**
     * Get channel subscribers
     * @returns {Iterator.<Observer>}
     */
    getSubscribers() {
        return this.subscribers.values();
    }

}

module.exports = Channel;