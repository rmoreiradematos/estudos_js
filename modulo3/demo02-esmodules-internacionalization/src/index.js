import database from './../database.json' assert{ type: 'json'}
import Person from './person.js'
import TerminalController from './terminalController.js'
import Repository from './repository.js'
const DEFAUL_LANG = 'pt-BR'
const STOP_TERM = ':q'
const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAUL_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('What??')
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('Process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAUL_LANG))
    await Repository.save(person)
    return mainLoop()
  } catch (error) {
    console.error('DEU RUIM', error)
    return mainLoop()
  }
}
await mainLoop()
