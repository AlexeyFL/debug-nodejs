const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const validateAuth = require('./middleware/validate-session')
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')


// db.sync();
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use('/api/game', game);
app.use(validateAuth);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Application start ', port);
});