var LazyObserver = require('../../../lib/LazyObserver');
var Singleton = require('../../../lib/Mixins/Singleton');

class SecurityManager extends Singleton(LazyObserver) {

    getClass() {

        this.clazz = require('./Class').getInstance();
        this.onClassLoaded();

    }

}

module.exports = SecurityManager;