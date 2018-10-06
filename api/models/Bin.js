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
  code: {
    type: String,
    default: 'console.log(\'foo\');'
  }
});

module.exports = mongoose.model('Bin', binSchema);
