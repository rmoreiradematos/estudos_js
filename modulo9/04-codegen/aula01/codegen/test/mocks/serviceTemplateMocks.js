export default `
export default class ProductService {
  constructor({repository: productRepository}){
    this.productRepository = productRepository
  }
  async find(data) {
    return this.productRepository.find(data)
  }

  async create(data) {
    return this.productRepository.create(data)
  }

  async update(id, data) {
    return this.productRepository.update(id, data)
  }

  async delete(id) {
    return this.productRepository.delete(id)
  }
}
`