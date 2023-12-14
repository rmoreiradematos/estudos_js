/*
  ProductId: shoudl be between 2 and 20 characters
  Name: should be only words
  Price: should be 0 to a thousand
  Category: should be eletronic or organic
*/

function productValidator(product) {
  const errors = []
  if (!(product.id.length >= 2 && product.id.length <= 20)) errors.push('Invalid id')
  if (!/\W/.test(product.name)) errors.push('Invalid name')
  if (!(product.price >= 0 && product.price <= 1000)) errors.push('Invalid price')
  if (!['eletronic', 'organic'].includes(product.category)) errors.push('Invalid category')
  return {
    results: errors.length === 0,
    errors,
  }
}

module.exports = {
  productValidator
}