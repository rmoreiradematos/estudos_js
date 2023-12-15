import ContextStrategy from "./src/base/contextStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"
import MongoDBStrategy from "./src/strategies/mongodbStrategy.js"

const postgresConnectionString = "postgres://rodrigomatos:root123@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()
const mongodbConnectionString = "mongodb://rodrigomatos:root123@localhost:27017/heroes"
const mongodbContext = new ContextStrategy(new MongoDBStrategy(mongodbConnectionString))
await mongodbContext.connect()
const data = [{
  name: 'rodrigomatos',
  type: 'transaction'
}, {
  name: 'xuxadasilva',
  type: 'activitylog'
}]

const contextTypes = {
  transaction: postgresContext,
  activitylog: mongodbContext
}

for (const { type, name } of data) {
  console.log(name)
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })
  const result = await context.read({ name })
  console.log(result)
  console.log(type, context.dbStrategy.constructor.name)
}
