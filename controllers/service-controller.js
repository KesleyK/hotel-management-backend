const Service = require('../models/Service');

exports.services = async (req, res) => {
  const services = await Service.findAll({
    where: {
      hotelId: req.hotelId
    }
  });
  res.json(services);
}

exports.addService = async (req, res) => {
  const { name, price } = req.body;

  const service = await  Service.create({
    name: name,
    price: price,
    hotelId: req.hotelId
  });

  res.json(service);
}