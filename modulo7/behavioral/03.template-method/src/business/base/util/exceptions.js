class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} was classed without an implementation`)
    this.name = 'NotImplementedException'
  }
}

export {
  NotImplementedException
}