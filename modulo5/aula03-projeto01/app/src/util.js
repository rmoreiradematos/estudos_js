'use strict';

const safeRegex = require('safe-regex');

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`this ${exp} is not a valid regex`);
    this.name = "InvalidRegexError";
  }
}

const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);
  if (!isSafe) {
    throw new InvalidRegexError(exp);
  }
  return exp;
}

module.exports = { evaluateRegex, InvalidRegexError };
