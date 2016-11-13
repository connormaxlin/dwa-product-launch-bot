var Twit = require('twit');
var fs = require('fs');

// load .json
var fortune = fs.readFileSync('./corpora/fortune.json')
fortune = JSON.parse(fortune).companies;

var objects = fs.readFileSync('./corpora/objects.json')
objects = JSON.parse(objects).objects;

function getRandom(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

console.log(getRandom(fortune));
console.log(getRandom(objects));

//load .env
require('dotenv').config();

var config = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_key_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
}

var T = new Twit(config);

function tweet() {

    var msg = 'ICYMI - ' + getRandom(fortune) + ' announced a brand new ' + getRandom(objects) + ' today!';

    T.post('statuses/update', { status: msg }, function(err, data, response) {
        console.log(data)
    });
}

setInterval(tweet, 1000 * 60 * 5);
tweet();
