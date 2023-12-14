import { database } from "../shared/data.mjs";

class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(database) {
    this.table.render(database)
  }
}

; (async () => {
  {
    const path = globalThis.window ? 'browser' : 'console'
    const { default: ViewFactory } = await import(`./../plataforms/${path}/index.mjs`)
    const app = new Application(new ViewFactory())
    app.initialize(database)
  }
})();