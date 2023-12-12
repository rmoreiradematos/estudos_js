const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex } = require('../src/util')

describe('util test suite', () => {
  it('#evalueteRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
    /*
    // fica rodando em loop infinito e quebra tudo!
    // catastrophic backtracking
    time \
    node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaeeee man como vai voce e como vai?')" && console.log('legalzin')"
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `this ${unsafeRegex} is not a valid regex`)
  })
  it('#evalueteRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw()
    expect(evaluateRegex(safeRegex)).to.be.ok
  })
})