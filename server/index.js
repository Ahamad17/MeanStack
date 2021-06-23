const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const routes = require('./routes.js');


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5000'}));
app.listen(3000, () => {
    console.log('Server started');
});

app.use('/', routes)