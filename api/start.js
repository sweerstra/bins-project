const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

require('./models/User');
require('./models/Bin');

const app = require('./app');
app.set('port', process.env.PORT || 8082);
const server = app.listen(app.get('port'), () => {
  console.log(`> Server running on port ${server.address().port}`);
});
