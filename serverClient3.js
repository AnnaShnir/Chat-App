var net = require("net");
var client = net.Socket();

client.connect(3000, function() {
	console.log("connected to server");

	client.on("data", function(data) {
		console.log(data.toString().trim())	
	});

	client.on("end", function() {
		console.log("disconnected from server");
	});
});