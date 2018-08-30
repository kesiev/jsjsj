// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

// Web server
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5001, function() {
	console.log('Starting server on port 5001');
});

// Protocol
var rooms={};
var palette=[
	{bg:"#f00",fg:"#fff"},
	{bg:"#0f0",fg:"#fff"},
	{bg:"#00f",fg:"#fff"},
	{bg:"#ff0",fg:"#fff"},
	{bg:"#0ff",fg:"#fff"},
	{bg:"#f0f",fg:"#fff"}
];

function broadcast(room,type,msg) {
	if (room&&room.players)
		for (var a in room.players)
			room.players[a].socket.emit(type,msg);
}

io.on('connection', function(socket) {
	var id,room;
	socket.on('join', function(data) {
		// Create room
		id=data.id;
		if (!rooms[data.room]) {
			console.log("Creating room "+data.room);
			rooms[data.room]={id:data.room,count:0,players:{},paletteUsed:[]}
		}
		room=rooms[data.room];

		// Assign color
		var color=-1;
		for (var i=0;i<palette.length;i++)
			if (!room.paletteUsed[i]) {
				color=i;
				room.paletteUsed[i]=id;
				break;
			}
		
		// Join room
		room.players[id]={socket:socket,color:color};
		room.count++;

		// Update other players
		broadcast(room,'join',{id:id,data:{state:"idle",color:palette[color]}});

		// Send players list to connecting player
		var keys={};
		for (var a in room.players) keys[a]={color:palette[room.players[a].color],state:'idle'};
		socket.emit('players',keys);
	});
	socket.on('disconnect', function() {
		if (room&&room.players[id]) {
			room.paletteUsed[room.players[id].color]=0;
			delete room.players[id];
			room.count--;
			if (!room.count) {
				console.log("Closing room "+room.id);
				delete rooms[room.id];
			}
		}
		broadcast(room,'left',{id:id});
	});
	socket.on('data', function(data) {
		data.id=id;
		broadcast(room,'data',data);
	});
});
	