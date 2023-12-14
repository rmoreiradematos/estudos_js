const Product = require('../../src/entities/product')

class ProductDataBuilder {
  constructor() {
    //o default são os casos corretos, de sucesso.
    this.productData = {
      id: '000001',
      name: 'valid name',
      price: 1,
      category: 'eletronic'
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidId() {
    this.productData.id = ''
    return this
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this
  }
  withInvalidPrice() {
    this.productData.price = -1
    return this
  }
  withInvalidCategory() {
    this.productData.category = 'invalid category'
    return this
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}

module.exports = ProductDataBuilder