var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("a user connected");
	var check_first = 0;
	var userName = '';
	var checkInput = '';
	socket.on('join chat', function(msg){
		if (check_first == 0){
			var joinChat = 'User: '+msg+ ' join a chat!';
			userName = msg;
			console.log(joinChat);
			check_first = 1;
			io.emit('join chat', joinChat);
		} else {
			msg = userName + ': ' + msg;
			io.emit('join chat', msg);
		}
	});

	socket.on('check input', function(check){
		if(check_first != 0){
			var arrCheckInput = [];
			arrCheckInput[0] = userName;
			arrCheckInput[1] = check;
			io.emit('check input', arrCheckInput);
			console.log('Username: '+arrCheckInput[0]+ ' | checkInput= '+arrCheckInput[1]);
		}
	});
});

http.listen(3000, function(){
	console.log("listen on port 3000");
});
