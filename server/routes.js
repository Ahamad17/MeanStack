const express = require('express');
const router = express.Router();
const portfolioModel = require('./model.js');
const message = require('./message.js');

router.get('', (req, res) => {
    portfolioModel.find((err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

router.post('', (req, res) => {
    let obj = new portfolioModel({
        details: {...req.body}
    });

    obj.save((err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    })
});

router.post('/message', (req, res) => {
    let obj = new message({
        message: {...req.body}
    });

    obj.save((err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    })
});

module.exports = router;