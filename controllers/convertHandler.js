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
  L: 'litres',
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

const floatRegexp = '[+-]?([0-9]*[.])?[0-9]+'

class ConvertHandler {

  getNum(input) {
    const float = input.match(new RegExp(floatRegexp))
    const fract = input.match(new RegExp(`(${floatRegexp})\/(${floatRegexp})`))
                              
    if (float) {
      const [result] = float
      return parseFloat(result);
    } else if (fract) {
      const [_, numerator, denominator] = float
      return parseFloat(numerator) / parseFloat(denominator);
    } else {
      return 'invalid number'
    }
  };
  
  getUnit(input) {
    const result = input.replace(this.getNum(input), '');
    return result;
  };
  
  getReturnUnit(initUnit) {
    const { [initUnit]: result = '' } = returnUnitMapping;
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
    const result = `${initNum.toFixed(5)} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
