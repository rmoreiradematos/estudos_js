import NotImplementedException from "../notImplementedShared.mjs"

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}