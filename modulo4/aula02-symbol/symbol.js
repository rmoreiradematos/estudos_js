const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'
console.log('getting normal Objects', user.userName)
// // sempre único em nível de endereço de memória
console.log('getting symbol', user)
console.log('symbols', Object.getOwnPropertySymbols(user))
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user['userName'], 'value for normal Objects')

// é difícil de pegar mas não é secreto
// console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// -- keys


// well known symbols

const obj = {
  //iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        //remove o último e retorna
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])
const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  *[Symbol.iterator]() {
    for (const obj of this[kItems]) {
      yield obj
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems]
      .map(item =>
        new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
          .format(item)
      )
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }
  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2019, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2019, 02, 02)
]


assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)
// coerção explicita para string
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2019')
assert.deepStrictEqual([...myDate], expectedDates);

// ; (async () => {
//   for await (const item of myDate) {
//     console.log('asyncIterator', item)
//   }
// })();

; (async () => {
  const dates = Promise.all([...myDate])
  assert.deepStrictEqual(await dates, expectedDates)
})();