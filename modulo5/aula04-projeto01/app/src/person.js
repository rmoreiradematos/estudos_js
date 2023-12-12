'use strict';
const { evaluateRegex } = require('./util')
class Person {
  //(\w+):\s.*
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado]) {
    //(\w+), this.$1 = $1
    const firstLetter = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/)
    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetter, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }
    const cpfFormatter = evaluateRegex(/(\D)/g)
    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    //tudo que não for digito vira vazio
    // /g serve para remover todas as ocorrencias que encontrar
    this.documento = documento.replace(cpfFormatter, '')
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join('')
    this.numero = numero
    // this.bairro = bairro.match(evaluateRegex(/(?<=[bairro]\s).*$/)).join('') MEU JEITO
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join('') // JEITO ERICK
    // this.estado = estado.replace(evaluateRegex(/\W$/), '') // meu jeito
    this.estado = estado.replace(evaluateRegex(/\.$/), '') // jeito erick

  }
}

module.exports = Person