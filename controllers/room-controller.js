const Room = require('../models/Room');
const Roomer = require('../models/Roomer');
const RoomerExpenses = require('../models/RoomerExpenses');

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
    number: number,
    dailyRate: dailyRate,
    isRented: false,
    description
  });

  res.json(room);
}

exports.rentRoom = async (req, res) => {
  const { roomNumber } = req.params;
  const { roomerName, roomerCpf, checkIn, checkOut } = req.body;
  const daysBetweenChecks = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24); 
  const checkInRealDate = new Date().setDate(new Date(checkIn).getDate() + 1);
  const checkOutRealDate = new Date().setDate(new Date(checkOut).getDate() + 1);

  const room = await Room.findOne({
    where: { number: roomNumber, hotelId: req.hotelId }
  });
  room.isRented = true,  
  room.rentedUntil = checkOutRealDate,
  room.roomerCpf = roomerCpf
  await room.save();

  const roomer = await Roomer.create({
    name: roomerName,
    cpf: roomerCpf,
    atRoom: roomNumber,
    checkIn: checkInRealDate,
    checkOut: checkOutRealDate,
    hotelId: req.hotelId
  });

  await RoomerExpenses.create({
    dailyCosts: daysBetweenChecks * room.dailyRate,
    servicesCosts: 0,
    hotelId: req.hotelId,
    roomerId: roomer.id
  });

  res.json(roomer);
}

exports.checkoutRoomer = async (req, res) => {
  const { roomNumber } = req.params;

  const room = await Room.findOne({
    where: { number: roomNumber, hotelId: req.hotelId }
  });

  const roomerCpf = room.roomerCpf;
  const roomer = await Roomer.findOne({
    where: { cpf: roomerCpf, hotelId: req.hotelId }
  });

  await RoomerExpenses.destroy({
    where: { roomerId: roomer.id, hotelId: req.hotelId }
  });

  await roomer.destroy();

  room.isRented = false;
  room.roomerCpf = null;
  room.rentedUntil = null;
  await room.save();

  res.json(room);
}