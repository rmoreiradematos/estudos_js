const assert = require('assert')
const myMap = new Map()
// podem ter qualquer coisa como chave

myMap
  .set(1, 'one')
  .set('Rodrigo', { text: 'two' })
  .set(true, () => 'hello')

// usando um construtor

const myMapWithConstructor = new Map([
  [1, 'one'],
  ['Rodrigo', { text: 'two' }],
  [true, () => 'hello']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Rodrigo'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')


// Não funciona:
// const onlyReferenceWorks = { id: 1 }
// myMap.set(onlyReferenceWorks, { name: 'Rodrigo' })
// console.log('get', myMap.get({ id: 1 }))

// Em Objects a chave só pode ser string ou symbol
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Rodrigo' })
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Rodrigo' })


// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// jeito mais verboso: { a: 1 }.hasOwnProperty('a')
assert.deepStrictEqual(myMap.has(onlyReferenceWorks), true)

// para remover um item do objeto
// delete item.id
// completamente imperformático para o JS
assert.ok(myMap.delete(onlyReferenceWorks), true)

// não da para iterar objetos diretamente
// tem que transformar com Object.entries(item) primeiro
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Rodrigo", { "text": "two" }], [true, null]]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }


// Object é inseguro, pois dependendo da chave, o objeto pode ser sobrescrito
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como:
// constructor, toString, valueOf e etc

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}
// não tem restricao de nome de chave

myMap.set(actor)
assert.deepStrictEqual(myMap.has(actor), true)
assert.throws(() => myMap.get(actor).toString, TypeError)

// não da para limpar um Object sem reassinar a referencia
// sem passar undefined para cada uma das chaves
// ou dar delete em todas elas
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])


// --- WeakMap

// pode ser coletado após perder as referencias
// tem a maioria dos benefícios do map
// MAS: não é iterável
// só chaves de referência, como objetos, funções e arrays
// é muito performático, leve, preve leak de memória, pq dps de perder a referencia, ele pode ser coletado

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.has(hero)
// weakMap.delete(hero)