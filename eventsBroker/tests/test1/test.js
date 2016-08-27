//
// const Singleton = Sup => class extends Sup {
//
//     static getInstance() {
//
//         if (!this.instance) {
//             this.instance = new this();
//         }
//
//         return this.instance;
//
//     }
//
// };
//
// const Observable = Sup => class extends Sup {
//
//     fireEvent() {
//
//     }
//
// };
//
// class Base {}
//
// class A extends Observable(Singleton(Base)) {
//     test() {
//         console.log('a');
//     }
// }
//
// var a = A.getInstance();
// a.test();


var Application = require('../components/Application');
var Event = require('../../lib/Event');
var broker = require('../../lib/Broker').getInstance();

Application.run({
    observers: [
        {
            instance: require('../components/SecurityManager/Observer').getInstance(),
            events: [
                'login',
                'logout'
            ]
        }
    ]
});

broker.fireEvent(new Event({name: 'login'}));

/*

// instantiate events manager
var manager = new EventsManager();

// load default observers
var observers = require('./config/server/observers.js');
for (var i in observers) {

    if (!observers.hasOwnProperty(i)) {
        continue;
    }

    // register each observer event
    observers[i].getEvents().forEach(function(eventName) {
        manager.register(eventName, observers[i]);
    });

}

// fire event to initialize components
manager.fireEvent('init', new Context());

// fire event after initialization is done
manager.fireEvent('afterInit', new Context());

console.log('done');
*/