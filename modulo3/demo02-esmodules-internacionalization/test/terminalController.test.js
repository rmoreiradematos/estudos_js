import { describe, it } from "mocha"
import chai from "chai"
import TerminalController from "../src/terminalController.js"
import sinon from "sinon"
import { beforeEach, afterEach } from "mocha"
import chalk from "chalk"
import faker from "faker"
import DATABASE from "./mocks/database.mock.json" assert { type: "json" }

let terminalController
let sandBox
describe("TerminalController", () => {
  before(() => {
    terminalController = new TerminalController()
  })
  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it("should be exists", () => {
    chai.expect(terminalController).to.be.ok
  })
  it("should initialize #initializeTerminal", () => {
    sandBox.spy(terminalController, "initializeTerminal")
    terminalController.initializeTerminal(DATABASE, "pt-BR")
    chai.expect(terminalController.initializeTerminal).to.be.ok
    chai.expect(terminalController.initializeTerminal.calledOnce).to.be.ok
  })
  it("should initialize #initializeTable", () => {
    sandBox.spy(terminalController, "initializeTable")
    terminalController.initializeTable(DATABASE, "pt-BR")
    chai.expect(terminalController.initializeTable).to.be.ok
    chai.expect(terminalController.initializeTable.calledOnce).to.be.ok
  })
  it("should update #updateTable", () => {
    const newItem = {
      id: faker.random.number(),
      vehicles: faker.vehicle.vehicle(),
      kmTravelled: faker.random.number(),
      from: faker.date.past(),
      to: faker.date.recent(),
    }
    sandBox.spy(terminalController, "updateTable")
    terminalController.updateTable(newItem)
    chai.expect(terminalController.updateTable).to.be.ok
    chai.expect(terminalController.updateTable.calledOnce).to.be.ok
  })
  it("should close #closeTerminal", () => {
    sandBox.spy(terminalController, "closeTerminal")
    terminalController.closeTerminal()
    chai.expect(terminalController.closeTerminal).to.be.ok
    chai.expect(terminalController.closeTerminal.calledOnce).to.be.ok
  })
  it("should question #question", async () => {
    const questionStub = sandBox
      .stub(terminalController.terminal, "question")
      .callsFake((message, callback) => callback())
    await terminalController.question('kakaka')
    chai.expect(questionStub.calledOnce).to.be.true
    chai.expect(questionStub.calledWith('kakaka')).to.be.true
  })
  it('should get #getTableOptions', () => {
    const tableOptions = terminalController.getTableOptions()
    chai.expect(tableOptions).to.be.ok
    chai.expect(tableOptions).to.be.an('object')
    chai.expect(tableOptions).to.have.property('leftPad')
    chai.expect(tableOptions).to.have.property('columns')
    chai.expect(tableOptions.columns).to.be.an('array')
    chai.expect(tableOptions.columns[0]).to.have.property('field')
    chai.expect(tableOptions.columns[0]).to.have.property('name')
    chai.expect(tableOptions.columns[0].name).to.be.equal(chalk.cyan('ID'))
    chai.expect(tableOptions.columns[1].name).to.be.equal(chalk.magenta('Vehicles'))
    chai.expect(tableOptions.columns[2].name).to.be.equal(chalk.cyan('Km Travelled'))
    chai.expect(tableOptions.columns[3].name).to.be.equal(chalk.green('From'))
    chai.expect(tableOptions.columns[4].name).to.be.equal(chalk.green('To'))
  })
})
