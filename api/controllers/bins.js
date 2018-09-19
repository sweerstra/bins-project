const mongoose = require('mongoose');
const Bin = mongoose.model('Bin');

exports.addBin = async (req, res) => {
  const newBin = new Bin(req.body);
  const { id } = await newBin.save();

  res.json({ id });
};

exports.getBin = async (req, res, next) => {
  const { id } = req.params;
  const bin = await Bin.findOne({ id });

  if (!bin) {
    return next();
  }

  res.json(bin);
};

exports.getBins = async (req, res, next) => {
  const bins = await Bin.find({});

  res.json(bins);
};

exports.editBin = async (req, res, next) => {
  const { id } = req.params;

  const updatedBin = await Bin.findOneAndUpdate({ id }, req.body, { new: true });

  if (!updatedBin) {
    return next();
  }

  res.json(updatedBin);
};

exports.removeBin = async (req, res, next) => {
  const { id } = req.params;

  const deleted = await Bin.deleteOne({ id });

  res.json(deleted);
};
