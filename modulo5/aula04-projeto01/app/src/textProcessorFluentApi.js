'use strict';

const { evaluateRegex } = require('./util')
const Person = require('./person')
// O objetivo do Fluent Api é executar tarefas
// como um pipeline, step by step
// e no fim, chama um build. MUITO similar ao padrão Builder
// a diferença é sobre processos, o Builder é sobre construção
// de objetos
class TextProcessorFluentApi {

  #content
  constructor(content) {
    this.#content = content
  }

  exctractPeopleData() {
    // ?<= fala que vai extrair os dados que virao depois desse grupo
    // [contratante|contrada] fala que pode ser contratante ou contrada
    // : fala que depois vai ter um :
    // \s{1} fala que vai ter um espaço em branco
    // (?!s) fala que não pode ter um espaço em branco
    // .*? fala que pode ter qualquer coisa, menos quebra de linha
    // $ fala que é o fim da linha
    // gmi são flags para falar que é global, multiline e case insensitive
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }
  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, '')))
    return this
  }
  mapPerson() {
    // passar o array de string para o construtor de Person
    this.#content = this.#content.map(line => new Person(line))
    return this
  }
  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }
  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentApi