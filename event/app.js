const event = require('events');

import test from 'events';

var eventEmitter = new event.EventEmitter();

eventEmitter.on('test',() => {
    console.log('Testing event Call....');
    console.log('Event Call Test Completed');
});

eventEmitter.emit('test');