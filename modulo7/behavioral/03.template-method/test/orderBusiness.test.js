import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/business/base/util/exceptions'
import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'
describe('Test suite for Template Method', () => {
  beforeEach(() => jest.clearAllMocks())
  describe('#OrderBusiness', () => {
    test('excecution Order Business without Template Method', () => {
      const order = new Order({
        costumerId: 1,
        amout: 1000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()
      // todos os devs devem obrigatoriamente lembrar de seguir a risca este fluxo de execucao
      //se algum esquecer de chamar a função de validação, pode quebrar todo o sistema
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()
      const createdOrder = orderBusiness._create(order)
      expect(createdOrder).toBeTruthy()
    })
    test('execution Order Business with Template Method', () => {
      const order = new Order({
        costumerId: 1,
        amout: 1000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )
      // com template method,a sequencia de passos é sempre executada 
      // evita a replicação de lógica
      const createdOrder = orderBusiness.create(order)
      expect(createdOrder).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })

  })
})