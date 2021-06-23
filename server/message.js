const mongoose = require('mongoose');

const messages = mongoose.model('messages', {message: {}});
module.exports = messages;
