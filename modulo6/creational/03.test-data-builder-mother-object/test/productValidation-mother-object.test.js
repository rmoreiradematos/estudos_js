const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src')
const ProductDataBuilder = require('./model/productDataBuilder')
const ProductMotherObject = require('./model/productModelObject')

describe('Teste Data Builder', () => {
  it('should not return error with a valid product', () => {
    const product = ProductMotherObject.valid()
    const result = productValidator(product)
    const expectec = {
      errors: [],
      results: true
    }
    expect(result).to.be.deep.equal(expectec)
  })

  describe('Product Validation Rules', () => {
    it('should return error when product id is invalid', () => {
      const product = ProductMotherObject.invalidId()
      const result = productValidator(product)
      const expectec = {
        errors: ['Invalid id'],
        results: false
      }
      expect(result).to.be.deep.equal(expectec)
    })
    it('should return error when product name is invalid', () => {
      const product = ProductMotherObject.invalidName()
      const result = productValidator(product)
      const expectec = {
        errors: ['Invalid name'],
        results: false
      }
      expect(result).to.be.deep.equal(expectec)
    })
    it('should return error when product price is invalid', () => {
      const product = ProductMotherObject.invalidPrice()
      const result = productValidator(product)
      const expectec = {
        errors: ['Invalid price'],
        results: false
      }
      expect(result).to.be.deep.equal(expectec)
    })
    it('should return error when product category is invalid', () => {
      const product = ProductMotherObject.invalidCategory()

      const result = productValidator(product)
      const expectec = {
        errors: ['Invalid category'],
        results: false
      }
      expect(result).to.be.deep.equal(expectec)
    })
  })
})