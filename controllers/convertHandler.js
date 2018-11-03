/*
*
*
*       Complete the handler logic below
*       
*       
*/


class ConvertHandler {

  getNum(input) {

  };
  
  getUnit(input) {
    const [result] = input.match(/[a-zA-Z]+/)
    return result;
  };
  
  getReturnUnit(initUnit) {
    const { [initUnit]: result } = returnUnitMapping;
    if (!result) {
      throw new Error('invalid unit')
    }
    return result;
  };

  spellOutUnit(unit) {
    const { [unit]: result = '' } = spellingUnits;
    return result;
  };
  
  convert(initNum, initUnit) {
    var { [initUnit]: coeficient } = convertCoeficientMapping;
    
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
const dimensions = Object.keys(convertCoeficientMapping).join('|')

const parseNumberAndDimentions = input => {
    const float = input.match(new RegExp(`^(${floatRegexp})(dimensions)`))
    const fract = input.match(new RegExp(`^(${floatRegexp})\/(${floatRegexp})(dimensions)`))
    const dimensionMatch = input.match(new RegExp(dimensions))
    
    if (fract) {
      const [_, numerator, denominator, dimension] = fract
      const result = Number(numerator) / Number(denominator);
      return [result, dimension]
    } else if (float) {
      const [_, result, dimension] = float
      return [Number(result), dimension];
    } else if (dimensionMatch) {
      const [_, dimension] = dimensionMatch
      return [1, dimension]
    } else {
      throw new Error('invalid number')
    }
}

module.exports = ConvertHandler;
