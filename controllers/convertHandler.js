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
  gal: 'l',
  l: 'gal',
  lbs: 'kg',
  kg: 'lbs',
  mi: 'km',
  km: 'mi',
}
const spellingUnits = {
  gal: 'gallons',
  l: 'liters',
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
  l: 1/galToL,
  lbs: lbsToKg,
  kg: 1/lbsToKg,
  mi: miToKm,
  km: 1/miToKm,
}

const floatRegexp = '[+-]?(?:[0-9]*[.])?[0-9]+'
const numberRegExp = `(?:(${floatRegexp})\\/(${floatRegexp})|(${floatRegexp}))`
const dimensions = [
  ...Object.keys(convertCoeficientMapping).map(i => i.toLowerCase()),
  ...Object.keys(convertCoeficientMapping).map(i => i.toUpperCase()),
].join('|')
    
console.log(dimensions) 


const parseNumberAndDimentions = input => {
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
    const validDimension = input.match(new RegExp(`(\\d|^)(${dimensions})$`))
    const validNumber = input.match(new RegExp(`^${numberRegExp}[a-zA-Z]+`))

    if (!validDimension && !validNumber) {
      throw new Error('invalid number and unit')
    } else if (!validNumber) {
      throw new Error('invalid number')
    } else {
      throw new Error('invalid unit')
    }
  }
}

module.exports = ConvertHandler;
