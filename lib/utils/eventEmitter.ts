import Emitter from "tiny-emitter";

const eventEmitter = new Emitter();

const emitter = {
    on: (event, fn) => eventEmitter.on(event, fn),
    once: (event, fn) => eventEmitter.once(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload)
  }

  Object.freeze(emitter);

  export default emitter;

