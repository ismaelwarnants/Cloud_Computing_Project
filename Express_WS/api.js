const express = require('express');
const path = require('path');
const request = require('request');

const api = express();

function fetchPage(url, callback) {
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body)
        } else {
            console.log(error)
            callback("Error fetching page")
        }
    })
}

api.get('/scoreboard', (req, res) => {
    fetchPage('https://www.google.com', (pageContent) => {
        res.send(pageContent)
    })
})

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

module.exports = api;