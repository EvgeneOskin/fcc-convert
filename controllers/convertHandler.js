/*
*
*
*       Complete the handler logic below
*       
*       
*/

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

class ConvertHandler {

  getNum(input) {
    const float = input.match(new RegExp(`^(${floatRegexp})[a-zA-Z]+`))
    const fract = input.match(new RegExp(`^(${floatRegexp})\/(${floatRegexp})[a-zA-Z]+`))
    
    if (fract) {
      const [_, numerator, denominator] = fract
      const result = Number(numerator) / Number(denominator);
      return result 
    } else if (float) {
      const [_, result] = float
      return Number(result);
    } else if (input.match(/^[a-zA-Z]+/)) {
      return 1
    } else {
      throw new Error('invalid number')
    }
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

module.exports = ConvertHandler;
