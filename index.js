const cv =require('opencv4nodejs');
const path =require('path');
const express = require('express');
const app = express();
const server =require('http').Server(app);
const io = require('socket.io')(server);
const readDir = require('readdir');
const fs = require('fs');
const pathFolder = '../mjpg-streamer/mjpg-streamer/mjpg-streamer-experimental/pics/';

//const wCap = new cv.VideoCapture(0);
//const mat = cv.imread('../mjpg-streamer/mjpg-streamer/mjpg-streamer-experimental/pics/');
var fileArray = readDir.readSync(pathFolder,['**.jpg'],readDir.ABSOLUTE_PATHS);

var buff =[];


// const base64text='data:image/png;base64,R0lGO..';//Base64 encoded string
// const base64data =base64text.replace('data:image/jpeg;base64','')
//                             .replace('data:image/png;base64','');//Strip image type prefix
// const buffer = Buffer.from(base64data,'base64');
// const image = cv.imdecode(buffer); //Image is now represented as Mat

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
	//const frame = vCap.read();

	for(var i in fileArray){
		var  mat = cv.imread(fileArray[i]);
		var  image = cv.imencode('.jpg', mat).toString('base64');
		buff.push(image);
	}

	io.emit('image', buff);
},1000);

server.listen(3000,()=>{console.log('server running at port 3000')})