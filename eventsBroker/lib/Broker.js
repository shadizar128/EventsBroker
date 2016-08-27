var Base = require('./Base');
var Channel = require('./Channel');
var Singleton = require('./Mixins/Singleton');

class Broker extends Singleton(Base) {

    /**
     * Class constructor
     */
    constructor(config = {}) {

        // call parent constructor
        super(config);

        // init channels
        this.channels = new Map();

    }

    /**
     * Class destructor
     */
    destructor() {

        // clear channels
        this.channels.clear();

    }

    /**
     * Add a subscriber to a channel
     * @param {String} channelName
     * @param {Observer} subscriber
     * @returns {Broker}
     */
    subscribe(channelName, subscriber) {

        console.log('Subscribe to channel', {channelName, subscriber});

        // TODO: check if subscriber has processing method

        // get channel
        var channel = this.channels.get(channelName);

        // check if channel was found
        if (!channel) {

            // create new channel if it does not exist
            channel = new Channel();

            // store channel
            this.channels.set(channelName, channel);


        }

        // add subscriber
        channel.addSubscriber(subscriber);

        // return self for chaining
        return this;

    }

    /**
     * Remove a subscriber from a channel
     * @param {String} channelName
     * @param {Observer} subscriber
     * @returns {Broker}
     */
    unsubscribe(channelName, subscriber) {

        console.log('Unsubscribe from channel', {channelName, subscriber});

        // get channel
        var channel = this.channels.get(channelName);

        // check if channel was found
        if (channel) {

            // remove subscriber
            channel.unsubscribe(subscriber);

            // check if channel has any subscribers left
            if (!channel.hasSubscribers()) {

                // call channel destructor
                channel.destructor();

                // remove channel
                this.channels.delete(channelName);

            }

        }

        // return self for chaining
        return this;

    }

    /**
     * Fire event
     * @param {Event} event
     */
    fireEvent(event) {

        console.log('Event received', {broker: this, event});

        // fire event
        event.fire(this.channels.get(event.getName()));

        // return self for chaining
        return this;

    };

}

module.exports = Broker;
