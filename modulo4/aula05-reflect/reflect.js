'use strict'
// garantir semantica e segurança em objetos

const assert = require('assert')

// --- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// myObj.add.apply = function () { throw new Error('Vixx') }
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

/// essa aqui pode acontecer!

myObj.add.apply = function () { throw new TypeError('Vixx') }

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixx'
  }
)
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// -- apply


// --- defineProperty
// questoes semanticas

function MyDate() { }

// feio pra kct!, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

// agora faz sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })
assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')
// --- defineProperty

// --- deleteProperty

const withDelete = { user: 'ErickWendel' }
// imperformático, evitar ao máximo
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'xuxa da silva' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- deleteProperty

// --- get

// deveriamos fazer um get somante em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// --- get

// --- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// --- has

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'Rodrigo'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
// com reflection
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])