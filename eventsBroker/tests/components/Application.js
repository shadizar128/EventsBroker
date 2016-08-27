var broker = require('../../lib/Broker').getInstance();

class Application {

    static run(config = {observers: []}) {

        config.observers.forEach(function(observer) {

            observer.events.forEach(function(event) {
                broker.subscribe(event, observer.instance);
            });

        });

        broker.fireEvent(new Event({name: 'postInit'}));

    }

}

module.exports = Application;