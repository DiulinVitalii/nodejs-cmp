export default class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(f => f !== fn);
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      fn.apply(null, args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    this.listeners[eventName]?.forEach(fn => fn.apply(null, args));
  }

  listenerCount(eventName) {
    return this.rawListeners(eventName).length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}
