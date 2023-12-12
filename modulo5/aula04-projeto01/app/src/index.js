'use strict';

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')
const TextProcessorFacede = require('./textProcessorFacede');
; (async () => {
  const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'))
  const data = await pdf(dataBuffer)
  const instance = new TextProcessorFacede(data.text)
  const people = instance.getPeopleFromPdf()
  console.log("people", people)
})();