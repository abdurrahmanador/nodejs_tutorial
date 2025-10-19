const logEvents = require('./logEvents');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => {
    logEvents(msg)
});

setInterval(() => {
    myEmitter.emit('log', `Log event emitted at ${new Date().toLocaleTimeString()}`)
}, 2000);
