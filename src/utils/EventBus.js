'use strict';

var TinyEmitter = require('tiny-emitter');

class EventBus extends TinyEmitter {
    emit(name) {
        // uncomment lines below for debug info
        // var data = [].slice.call(arguments, 1);
        // console.log("Event: [" + name + "]" + (data !== undefined ? " -> " + JSON.stringify(data) : ""));

        super.emit.apply(this, arguments);
    }
}

export default (new EventBus())