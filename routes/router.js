const express = require('express');

const hotelController = require('../controllers/hotel-controller');
const roomController = require('../controllers/room-controller');
const serviceController = require('../controllers/service-controller');
const roomerController = require('../controllers/roomer-controller');

const router = express.Router();

router.get('/hotels', hotelController.hotels);

router.get('/hotel', hotelController.hotel);

router.post('/hotel', hotelController.createHotel);

router.post('/hotel/:hotelId', hotelController.selectHotel);

router.get('/rooms', roomController.rooms);

router.post('/room', roomController.createRoom);

router.post('/room/rent/:roomNumber', roomController.rentRoom);

router.delete('/room/rent/:roomNumber', roomController.checkoutRoomer);

router.post('/service', serviceController.addService);

router.get('/services', serviceController.services);

router.get('/roomer/:cpf', roomerController.fetchRoomer);

router.post('/roomer/add-service/:cpf', roomerController.addServiceToRoomer);

module.exports = router;