'use strict';
const TextProcessorFluentApi = require('./textProcessorFluentApi')
class TextProcessorFacede {
  #textProcessorFluentApi
  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentApi(text)
  }
  getPeopleFromPdf() {
    return this.#textProcessorFluentApi
      .exctractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build()
  }
}

module.exports = TextProcessorFacede