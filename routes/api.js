/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const helmet = require('helmet')
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.use(helmet())
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const { input } = req.query;
      try {
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.getUnit(input);
        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        res.json({
          initNum, initUnit, returnNum, returnUnit, string: toString
        })
      } catch (e) {
        res.send(e.message)
      }
    });
    
};
