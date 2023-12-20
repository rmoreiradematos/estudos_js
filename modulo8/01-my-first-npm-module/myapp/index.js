// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt/"
import FluentSQLBuilder from "@rmoreiradematos/fluentsql"
import database from "../myapp/database/data.json" assert { type: "json" }

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['category'])
  .limit(3)
  .countBy('category')
  .build()
console.table(result)