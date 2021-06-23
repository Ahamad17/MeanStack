const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/portfolio',
(err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connection Successful');
    }
});

module.exports = mongoose;