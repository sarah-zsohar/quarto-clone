const path = require('path');
var AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var upload = multer({
    dest: __dirname + '/uploads'
});
let server = require('http').Server(app);
let io = require('socket.io')(server);
const pug = require('pug');
const request = require('request');
const mqtt = require('mqtt');
const fs = require('fs');
const Q = require('q');
let uuidV4 = require('uuid/v4');
let _ = require('lodash');
let redis = require("redis-mock");
let $p = require("bluebird");
var kits = [];
var port = process.env.PORT || 9000;




app.use('/', express.static('public'))





console.log("we are running" + port);

exports = app;


$p.promisifyAll(redis);
let $r = redis.createClient();

const ENV = process.env.NODE_ENV;
const SESSION_LENGTH = 60 * 60; // seconds, aka 1 hour
const KEYPATH = {
	users: '/users/',
	lobbies: '/lobbies/'
};
const DEFAULT = {
	lobby: 'public'
};

// Serve static folder
app.use(express.static('public'));



// Client socket connection
io.on('connection', (socket) => {
	socket.on('register', onRegister);
    socket.on('updateGameboard',function (data) {

            emit(data);
    });
    socket.on('winner',function () {

            alertWin();
    });
	socket.on('disconnect', onDisconnect);
	socket.on('createGame', onCreateGame);
	socket.on('joinGame', onJoinGame);
	socket.on('leaveGame', onLeaveGame);

	socket.on('send', onSend);
	socket.on('play', onPlay);
});
function emit(data){
    io.sockets.emit('updateGameboardPositions', {
        gameboard: data.gameboard,
        unplayedPieces:data.unplayedPieces
    });
}
function alertWin(){
    io.sockets.emit('win')
}
// Listen to me baby.. uh huh, uh huh!
// init().then(() => server.listen(9000));
server.listen(9000)
