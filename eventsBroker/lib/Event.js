var Base = require('./Base');

class Event extends Base {

    /**
     * Class constructor
     */
    constructor(config = {}) {

        // call parent constructor
        super(config);

        // TODO: remove this
        this.name = config.name;
        // TODO: process args

        // set status
        this.fired = false;

    }

    /**
     * Class destructor
     */
    destructor() {

    }

    /**
     * Return the event name
     * @returns {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Fire event for all channel subscribers
     *
     * @param {Channel} channel
     */
    fire(channel) {

        if (this.fired) {
            throw 'Event can only be fired once';
        }

        console.log('Event channel', channel);

        // mark event as fired
        this.fired = true;

        // get observers
        var observers = Event.getObservers(channel);

        console.log('Event observers', observers);

        // remaining observers
        this.remaining = observers.length;

        // observers that have processed the event
        this.processed = 0;

        if (this.remaining == 0) {

            // no observers, invoke final callback
            this.finish();

        } else {

            // notify each observer
            observers.forEach(function(observer) {
                observer.onEvent(this);
            }, this);

        }

    }

    /**
     * Decrement the remaining count by 1, when it reaches 0 the final callback is invoked
     * @param {Boolean} processed If true the processed count is incremented by 1
     */
    onObserved(processed) {

        console.log('Event observed', {processed, event: this});

        // increase the number of observers that have processed the event
        if (processed) {
            this.processed++;
        }

        // decrement number of remaining observers
        this.remaining--;

        // check if all observers are done and invoke the final callback
        if (this.remaining == 0) {
            this.finish();
        }

    }

    /**
     * Invoke the final callback based on the event status
     */
    finish() {

        console.log('Finish observing event', this);

        // assert status of event based on the event requirements and how many subscribers have processed it
        // invoke success or failure callback

    }

    /**
     * Get observers that need to process this event based on event requirements and channel subscribers
     * There are 3 scenarios for event requirements
     * - observable by all channel subscribers
     * - observable by only one subscriber
     * - observable by all channel subscribers that match a selection criteria
     * @param channel
     * @return {Observer[]}
     */
    static getObservers(channel) {

        var observers = [];

        // check if channel exists
        if (channel) {

            // get all subscribers
            // TODO: apply criteria and event requirements
            for (var subscriber of channel.getSubscribers()) {
                observers.push(subscriber);
            }

        }

        return observers;

    }

}

module.exports = Event;