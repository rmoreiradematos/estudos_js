import StringUtil from '@rmoreiradematos/string-util'
const avaiableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'yyyy/mm/dd': '$<year>/$<month>/$<day>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
}

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExps = {
  'dd-mm-yyyy': ddmmyy,
  'dd/mm/yyyy': ddmmyy,
  'yyyy-mm-dd': yymmdd,
  'yyyy/mm/dd': yymmdd,
}

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(avaiableFormats).includes(format)) {
      return { error: `the format ${format} is not availabe yet :(` }
    }
    const exp = avaiableFormats[format]
    const [result] = date.toISOString().match(yymmdd)
    return result.replace(yymmdd, exp)
  }
  static formateString(date, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(date)) {
      return {
        error: `your text is empty`
      }
    }
    if (!Object.keys(avaiableFormats).includes(currentFormat)) {
      return {
        error: `the format ${currentFormat} isn't avaiable yet :(`
      }
    }
    if (!Object.keys(avaiableFormats).includes(expectedFormat)) {
      return {
        error: `the format ${expectedFormat} isn't avaiable yet :(`
      }
    }
    const toDateExp = stringToDateExps[currentFormat]
    const dateStr = StringUtil.removeEmptySpaces(date)
      .replace(toDateExp, '$<year>-$<month>-$<day>')
    const finalDate = new Date(dateStr)
    return DateUtil.formatDate(finalDate, expectedFormat)
  }
}