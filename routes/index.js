var express = require('express');
var router = express.Router();
const getGeocode = require("../utils/getGeocode");
const getForecast = require("../utils/getForecast")


/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const { city } = req.query
    //have the city in the curly bracket bcause its destructing method
    console.log(city)
    if (!city) {
      return res.render('index', { title: 'Super dope weather app' });
    }

    //get the coordinates from the city name
    const location  = await getGeocode(city)
    

    const forecast = await getForecast(location.geometry.coordinates)
    console.log(forecast.current.weather)

    
   
    return res.render('index', { title: 'Super dope weather app',
  forecast: forecast.current })
  } catch (err) {
    next(err)
  }
  console.log(req.query)
  //get the city value

});

module.exports = router;
