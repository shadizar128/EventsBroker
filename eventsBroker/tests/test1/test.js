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