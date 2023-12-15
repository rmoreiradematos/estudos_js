import OrderBusines from './business/orderBusiness.js'
import Order from './entities/order.js'

const order = new Order({
  costumerId: 1,
  amout: 1000,
  products: [{ description: 'ferrari' }]
})

const orderBusiness = new OrderBusines()
const createdOrder = orderBusiness.create(order)
console.log('createdOrder', createdOrder)