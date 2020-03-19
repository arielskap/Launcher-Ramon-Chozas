const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

  escucha() {
    this.on('event', () => {
      console.log('escuche...');
    });
  }

  emite() {
    console.log('emitee...');
    this.emit('event');
  }
}
module.exports = { MyEmitter };
