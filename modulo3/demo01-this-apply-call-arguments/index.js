'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// dessa forma ele ignora o 'this' da classe File
// herda o this do watch
// watch(__filename, file.watch)

// alternativa para não herdar o this de watch
// mas fica feio
// watch(__filename, (event, filename) => file.watch(event, filename))
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [true, __filename])

// para que serve o call e apply?
// para você definir qual é o objeto que o this vai referenciar
