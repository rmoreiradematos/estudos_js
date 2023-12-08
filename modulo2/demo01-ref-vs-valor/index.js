const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter
counter2++
//?
//neste caso copiou o valor de counter para counter2, mas como counter é um tipo primitivo, o valor é copiado e não a referência
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

const item = { counter: 0 }
const item2 = item
item.counter++

//?
//neste caso copiou a referência de item para item2, como item é um objeto, o valor é copiado por referência e não por valor

deepStrictEqual(item, { counter: 1 })
item2.counter++
deepStrictEqual(item2, { counter: 2 })
