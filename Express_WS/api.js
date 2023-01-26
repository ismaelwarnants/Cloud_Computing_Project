const express = require('express');
const path = require('path');
const request = require('request');

const api = express();

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

module.exports = api;