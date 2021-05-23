const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')


// db.sync();
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Application start ', port);
});