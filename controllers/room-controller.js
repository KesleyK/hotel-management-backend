const Room = require('../models/Room');

exports.rooms = async (req, res) => {
  const rooms = await Room.findAll({
    where: {
      hotelId: req.hotelId
    }
  });

  res.json(rooms);
}

exports.createRoom = async (req, res) => {
  const { number, dailyRate, description } = req.body;
  const room = await Room.create({
    hotelId: req.hotelId,
    number,
    dailyRate,
    description
  });

  res.json(room);
}