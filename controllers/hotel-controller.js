const jwt = require('jsonwebtoken');

const Hotel = require('../models/Hotel');

exports.hotels = async (req, res) => {
  const hotels = await Hotel.findAll();
  res.json(hotels);
}

exports.hotel = async (req, res) => {
  const hotelId  = req.hotelId;
  const hotel = await Hotel.findByPk(hotelId);
  res.json(hotel);
}

exports.createHotel = async (req, res) => {
  const { name, local, number } = req.body;
  const hotel = await Hotel.create({
    name,
    local,
    number
  });
  res.json(hotel);
}

exports.selectHotel = async (req, res) => {
  const { hotelId } = req.params;
  const hotel = await Hotel.findByPk(hotelId);

  const token = await jwt.sign(
    {hotel: hotel}, 
    'Hotel_Management_App_Secret', 
    { expiresIn: '8hr'}
  );

  res.json(token);
}