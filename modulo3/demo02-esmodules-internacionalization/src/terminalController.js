import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import ReadLine from 'readline'
import Person from './person.js'
export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = ReadLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initializeTable(database, language)
  }
  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), database)
    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }
  closeTerminal() {
    this.terminal.close()
  }
  question(message = '') {
    return new Promise(resolve =>
      this.terminal.question(message, resolve)
    )
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTravelled', name: chalk.cyan('Km Travelled') },
        { field: 'from', name: chalk.green('From') },
        { field: 'to', name: chalk.green('To') }
      ]
    }
  }
}