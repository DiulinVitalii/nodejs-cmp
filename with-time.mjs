import EventEmitter from './event-emitter.mjs';

export default class WithTime extends EventEmitter {
  async execute(asyncFunc, options) {
    try {
      super.emit('begin');
      const startDate = Date.now();
      const data = await asyncFunc(options);
      const endDate = Date.now();
      const executionTime = (endDate - startDate) / 1000;
      super.emit('end', executionTime);
      super.emit('data', data);
    } catch (e) {
      console.error(e);
    }
  }
}
