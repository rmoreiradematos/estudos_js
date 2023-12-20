import { deepStrictEqual } from 'assert'
import DateUtil from './index.js'

{
  const format = 'dd-M-Y'
  const expect = { error: `the format ${format} is not availabe yet :(` }
  const date = new Date(1990, 2, 1)
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expect)
}
{
  const format = 'dd-mm-yyyy'
  const expect = '01-12-1990'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expect)
}

{
  const format = 'dd/mm/yyyy'
  const expect = '01/12/1990'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expect)
}

{
  const format = 'yyyy-mm-dd'
  const expect = '1990-12-01'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expect)
}

{
  const expect = { error: `your text is empty` }
  const date = ''
  const result = DateUtil.formateString(date)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1990-april-01',
    format: 'yyyy-M-dd'
  }

  const expect = { error: `the format ${date.format} isn't avaiable yet :(` }
  const result = DateUtil.formateString(date.value, date.format)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1990-01-01',
    format: 'yyyy-mm-dd'
  }
  const expectedFormat = 'dd/M/yyyy'
  const expect = { error: `the format ${expectedFormat} isn't avaiable yet :(` }
  const result = DateUtil.formateString(date.value, date.format, expectedFormat)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1990-01-01',
    format: 'yyyy-mm-dd'
  }
  const expectedFormat = 'dd-mm-yyyy'
  const expect = '01-01-1990'
  const result = DateUtil.formateString(date.value, date.format, expectedFormat)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1 9 9 0 / 0 1 / 0 1',
    format: 'yyyy-mm-dd'
  }
  const expectedFormat = 'dd/mm/yyyy'
  const expect = '01/01/1990'
  const result = DateUtil.formateString(date.value, date.format, expectedFormat)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1 9 9 0 / 0 1 / 0 1',
    format: 'yyyy-mm-dd'
  }
  const expectedFormat = 'yyyy/mm/dd'
  const expect = '1990/01/01'
  const result = DateUtil.formateString(date.value, date.format, expectedFormat)
  deepStrictEqual(result, expect)
}

{
  const date = {
    value: '1990-01-01',
    format: 'dd/mm/yyyy'
  }
  const expectedFormat = 'dd-mm-yyyy'
  const expect = '01-01-1990'
  const result = DateUtil.formateString(date.value, date.format, expectedFormat)
  deepStrictEqual(result, expect)
}