const assert = require('assert')

// usado a maiorida das vezes para Listas de itens unicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))
// console.log('set', set)
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"])
// console.log('set.keys()', set.keys())
// console.log('set.values()', set.values())  // só existe por conta do Map

// no array comum, para saber se um item existe
// [1, 2, 3].includes(1) ou [1, 2, 3].indexOf(1) !== -1
assert.ok(set.has("3")) // retorna boolean
// mesma teoria do Map, mas você trabalha com a lista de valores
// não tem get, então você pode saber se o valor está ou não dentro do Set
// na documentação tem exemplos sobre como fazer uma interseção, union e outras operações

// tem nos dois arrays

const user01 = new Set([
  'Rodrigo',
  'Lucas',
  'João'
])

const user02 = new Set([
  'Rodrigo',
  'teste',
  'Ciclano'
])
const insersection = new Set([...user01].filter(user => user02.has(user)))
assert.deepStrictEqual(Array.from(insersection), ['Rodrigo'])

const diference = new Set([...user01].filter(user => !user02.has(user)))
assert.deepStrictEqual(Array.from(diference), ['Lucas', 'João'])


// WeakSet
// mesma ideia do WeakMap
// não é enumerável (iterável)
// só trabalha com chaves como referência

const user = { id: 123 }
const user2 = { id: 321 }
const userSet = new WeakSet([user])
console.log('has user', userSet)
userSet.add(user2)
console.log('has user', userSet)
userSet.delete(user)
console.log('has user', userSet)
userSet.has(user)
console.log('has user', userSet.has(user))

// não tem .size nem .clear por conta da caracteristica fraca da referencia
// ideal para quando você não precisa de todos os recursos do Set
// ou quando você precisa de uma lista de itens únicos
// com a vantagem de ser mais performático que o array comum
// ou quando você precisa de um objeto do tipo Set fraco
