const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const Hotel = require('./models/Hotel');
const Room = require('./models/Room');

const sequelize = require('./DB/sequelize');
const routes = require('./routes/router');

const app = express();
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  const headerAuth = req.headers.authorization;
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

sequelize
  .sync()
  .then(() => {
    app.listen(8080, () => console.log('Server started.'));
  })
  .catch(err => console.log(err));