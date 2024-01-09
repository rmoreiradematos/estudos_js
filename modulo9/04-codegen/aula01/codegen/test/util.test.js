import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from "@jest/globals"
import Util from "../src/util.js"

describe('#Codegen 3-layers arch', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#uppercaseFirstLetter should transform first letter to uppercase', () => {
    const data = 'hello'
    const expected = 'Hello'
    const result = Util.uppercaseFirstLetter(data)
    expect(result).toStrictEqual(expected)
  })
  test('#lowercaseFirstLetter should transform first letter to lowercase', () => {
    const data = 'Hello'
    const expected = 'hello'
    const result = Util.lowercaseFirstLetter(data)
    expect(result).toStrictEqual(expected)

  })
  test('#lowercaseFirstLetter given an empty string should return an empty string', () => {
    const data = ''
    const expected = ''
    const result = Util.lowercaseFirstLetter(data)
    expect(result).toStrictEqual(expected)
  })
  test('#uppercaseFirstLetter given an empty string should return an empty string', () => {
    const data = ''
    const expected = ''
    const result = Util.lowercaseFirstLetter(data)
    expect(result).toStrictEqual(expected)
  })
})