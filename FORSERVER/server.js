const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);
app.use(express.static('store'));
const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
});
