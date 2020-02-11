const express = require('express');

const hotelController = require('../controllers/hotel-controller');

const router = express.Router();

router.get('/hotels', hotelController.hotels);

router.post('/hotel', hotelController.createHotel);

router.post('/hotel/:hotelId', hotelController.selectHotel);

module.exports = router;