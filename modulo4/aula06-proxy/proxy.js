'use strict';

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, property, newValue) => {
    event.emit(eventName, { newValue, key: target[property] })
    target[property] = newValue
    return true
  },
  get: (object, prop) => {
    // console.log("chamou", { object, prop })
    return object[prop]
  }
})

// jájá e sempre
setInterval(function () {
  proxy.counter += 1
  if (proxy.counter === 10) clearInterval(this)
  console.log('[3]: setInterval')
}, 2000)

// futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: setTimeout')
}, 100)

// se quer executar agora
setImmediate(() => {
  console.log('[1]: setImmediate')
})

// executa agora, agorinha, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: process.nextTick')
})