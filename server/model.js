const mongoose = require('mongoose');

const porfolio = mongoose.model('Porfolio', {details: {}});
module.exports = porfolio;

