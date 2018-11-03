/*
*
*
*       Complete the handler logic below
*       
*       
*/


class ConvertHandler {

  getNum(input) {
    const [num] = parseNumberAndDimentions(input)
    return num
  };
  
  getUnit(input) {
    const [_, result ] = parseNumberAndDimentions(input)
    return result;
  };
  
  getReturnUnit(initUnit) {
    const { [initUnit.toLowerCase()]: result } = returnUnitMapping;
    if (!result) {
      throw new Error('invalid unit')
    }
    return result;
  };

  spellOutUnit(unit) {
    const { [unit.toLowerCase()]: result = '' } = spellingUnits;
    return result;
  };
  
  convert(initNum, initUnit) {
    var { [initUnit.toLowerCase()]: coeficient } = convertCoeficientMapping;
    
    return initNum * coeficient;
  };
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

const returnUnitMapping = {
  gal: 'L',
  L: 'gal',
  lbs: 'kg',
  kg: 'lbs',
  mi: 'km',
  km: 'mi',
}
const spellingUnits = {
  gal: 'gallons',
  L: 'liters',
  lbs: 'pounds',
  kg: 'kilograms',
  mi: 'miles',
  km: 'kilometers',
}

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
const convertCoeficientMapping = {
  gal: galToL,
  L: 1/galToL,
  lbs: lbsToKg,
  kg: 1/lbsToKg,
  mi: miToKm,
  km: 1/miToKm,
}

const floatRegexp = '[+-]?(?:[0-9]*[.])?[0-9]+'
const numberRegExp = `(?:(${floatRegexp})\\/(${floatRegexp})|(${floatRegexp}))`
const dimensions = [
  ...Object.keys(convertCoeficientMapping),
  ...Object.keys(convertCoeficientMapping).map(i => i.toLowerCase())
].join('|')

const parseNumberAndDimentions = rawInput => {
  const match = input.match(new RegExp(`^(?:${numberRegExp})?(${dimensions})$`))

  if (match) {
    const [_, numerator, denominator, num, dimension] = match
    if (num) {
      return [Number(num), dimension];
    } else if (numerator && denominator) {
      const result = Number(numerator) / Number(denominator);
      return [result, dimension]
    } else {
      return [1, dimension]
    }
  } else {

    const invalidDimension = input.match(new RegExp(`${dimensions}$`))
    const invalidNumber = input.match(new RegExp(`^${numberRegExp}[a-zA-Z]+`))

    if (!invalidDimension && !invalidNumber) {
      throw new Error('invalid number and unit')
    } else if (!invalidNumber) {
      throw new Error('invalid number')
    } else {
      throw new Error('invalid unit')
    }
  }
}

module.exports = ConvertHandler;
