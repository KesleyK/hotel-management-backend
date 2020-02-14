const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Hotel = require('./models/Hotel');
const Room = require('./models/Room');
const Service = require('./models/Service');
const Roomer = require('./models/Roomer');
const RoomerExpenses = require('./models/RoomerExpenses');

const sequelize = require('./DB/sequelize');
const routes = require('./routes/router');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    return next();
  }
  const token = headerAuth.split(' ')[1];

  jwt.verify(
    token,
    'Hotel_Management_App_Secret',
    (err, decodedToken) => {
      req.hotelId = decodedToken.hotel.id;
      next();
    }
  );
});

app.use('/', routes);

Hotel.hasMany(Room);
Room.belongsTo(Hotel);
Hotel.hasMany(Service);
Service.belongsTo(Hotel);
Hotel.hasMany(Roomer);
Roomer.belongsTo(Hotel);
Roomer.hasOne(RoomerExpenses);
RoomerExpenses.belongsTo(Roomer);
RoomerExpenses.belongsTo(Hotel);


sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(8080, () => console.log('Server started.'));
  })
  .catch(err => console.log(err));