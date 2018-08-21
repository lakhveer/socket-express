const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const logger = require('morgan');
const path = require('path');

//app.use(logger('dev'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/node_modules'));  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});


io.on('connection', function (socket) {
    console.log('client connected');
    var ss;
    socket.on('open', function(msg) {
        ss = msg;
        console.log(msg);
        socket.emit('lis', msg);
    });
});

http.listen('3000', () => {
    console.log('Server is running PORT = 3000');
});