import NotImplementedException from "../notImplementedShared.mjs"

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}