/*
*
*
*       Complete the handler logic below
*       
*       
*/

class ConvertHandler {
  
  getNum(input) {
    const [result] = input.split(/[a-zA-Z]/);
    return result;
  };
  
  getUnit(input) {
    const result = input.replace(this.getUnit(input), '');
    return result;
  };
  
  getReturnUnit(initUnit) {
    var result;
    const mapping = {
      gal: 'L',
      L: 'gal',
      lbs: ' to 'kg' and vice versa. (1 lbs to 0.453592 kg)
I can convert 'mi' to 'km'
    return result;
  };

  spellOutUnit(unit) {
    var result;
    
    return result;
  };
  
  convert(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    return result;
  };
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
