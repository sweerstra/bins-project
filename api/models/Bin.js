const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const shortid = require('shortid');

const binSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: shortid.generate
  },
  name: {
    type: String,
    required: 'Your bin must have a name!'
  },
  selection: {
    type: String,
    required: 'Your bin must have a selection!'
  }
});

module.exports = mongoose.model('Bin', binSchema);
