const File = require('./src/file')
const { error } = require('./src/constants')
const assert = require('assert')
  ; (async () => {
    {
      const filePath = './mocks/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_ERROR_LENGTH_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/invalid-header.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/fiveitems-invalid.csv'
      const expected = new Error(error.FILE_ERROR_LENGTH_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/threeitems-valid.csv'
      const expected = [
        {
          id: 1,
          name: "xuxa da silva",
          profession: "developer",
          age: 120
        },
        {
          id: 2,
          name: "creisson da silva",
          profession: "manager",
          age: 122
        },
        {
          id: 3,
          name: "teste da silva",
          profession: "designer",
          age: 21
        }
      ]
      const result = await File.csvToJSON(filePath)
      assert.deepEqual(result, expected)
    }

  })()