var Observer = require('./Observer');

class LazyObserver extends Observer {

    /**
     * Class constructor
     */
    constructor(config = {}) {

        // call parent constructor
        super(config);

        // set loading status
        this.loading = false;

        // init queue
        this.queue = [];

        // store class instance
        this.clazz = null;

    }

    /**
     * Class destructor
     */
    destructor() {

    }

    /**
     * Event listener
     * @param {Event} event
     */
    onEvent(event) {

        console.log('Event received', {observer: this, event});

        if (this.clazz) {

            console.log('Class already loaded for observer', this);

            // process event
            this.clazz.onEvent(event);

        } else {

            console.log('Loading class for observer', this);

            // add to list of events waiting to be processed
            this.queue.push(event);

            // check if instance is already loading
            if (!this.loading) {

                // set loading state
                this.loading = true;

                // get instance
                this.getClass();

            }

        }

    }

    onClassLoaded() {

        console.log('Class loaded', this.clazz);

        // remove loading state
        this.loading = false;

        // process all pending events
        this.queue.forEach(function(event) {
            this.clazz.onEvent(event);
        }, this);

        // clear queue
        this.queue = [];

    }

    /**
     * @type {Function} Get implementing class
     */
    getClass() {throw 'Abstract method must be implemented';};

}

module.exports = LazyObserver;
