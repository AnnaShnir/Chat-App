var net = require("net");		//module built into node that allows us to build TCP servers for clients
var port = 3000;

var server = net.createServer(function(socket) {
	console.log("client connected");

	
	socket.on("data", function(data) {
		console.log(data.toString().trim());	// .trim separates chat comments into \n - new line for each enter key
	});

	socket.on("end", function() {
		console.log("client disconnected");
	});
});

server.listen(port, function() {
	console.log("listening on port" + port);
});