const Roomer = require('../models/Roomer');
const RoomerExpenses = require('../models/RoomerExpenses');

exports.fetchRoomer = async (req, res) => {
  const { cpf } = req.params;
  const roomer = await Roomer.findOne({
    where: { cpf: cpf, hotelId: req.hotelId }
  });
  
  if (!roomer) {
    return res.json({error: "Roomer not found"});
  }

  const roomerExpenses = await RoomerExpenses.findOne({
    where: { roomerId: roomer.id, hotelId: req.hotelId }
  });

  const roomerWithExpenses = { 
    ...roomer.dataValues, 
    dailyCosts: roomerExpenses.dailyCosts,
    servicesCosts: roomerExpenses.servicesCosts
  };

  res.json(roomerWithExpenses);
}

exports.addServiceToRoomer = async (req, res) => {
  const { servicePrice } = req.body;
  const roomerCpf = req.params.cpf;
  const roomer = await Roomer.findOne({
    where: { cpf: roomerCpf, hotelId: req.hotelId }
  });

  const roomerExpenses = await RoomerExpenses.findOne({
    where: { roomerId: roomer.id, hotelId: req.hotelId }
  });
  roomerExpenses.servicesCosts += servicePrice;
  await roomerExpenses.save();

  res.json({ roomer, roomerExpenses });
}