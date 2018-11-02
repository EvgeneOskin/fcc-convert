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
  gal: 'gallon',
  L: 'litre',
  lbs: 'pound',
  kg: 'kilogram',
  mi: 'mile',
  km: 'kilometer',
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

class ConvertHandler {

  getNum(input) {
    const [result] = input.match(/\d+\.\d+/)
    return parseFloat(result);
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
    
    return (initNum * coeficient).toFixed(5);
  };
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
