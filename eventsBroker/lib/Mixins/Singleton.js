const Singleton = superclass => class extends superclass {

    /**
     * Singleton pattern
     * @return {Object}
     */
    static getInstance(config = {}) {

        if (!this.instance) {
            this.instance = new this(config);
        }

        return this.instance;

    }

};

module.exports = Singleton;