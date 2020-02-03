const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();

const customExpress = () => {

    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .include('models')
        .into(app);

    return app;

}

module.exports = customExpress();