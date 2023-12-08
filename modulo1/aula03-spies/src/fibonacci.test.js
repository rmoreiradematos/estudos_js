//Fibonacci: o próximo número é a soma dos dois anteriores
// input 3
// 0,1,1
// input 5
// 0,1,1,2,3
const { createSandbox } = require('sinon')
const assert = require('assert')
const Fibonacci = require('./fibonacci')
const sinon = createSandbox();

; (async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    for (const sequencia of fibonacci.execute(5)) { }
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    const results = [...fibonacci.execute(3)]
    const expectedResults = [0, 1, 1]
    assert.deepStrictEqual(results, expectedResults, "os resultados da sequencia não são iguais")
  }
})()