var net = require("net");
var client = net.Socket();

client.connect(3000, function() {
	console.log("connected to server");
	setInterval(function() {
		client.write("where is my car?");
	}, 20000);

	client.on("data", function(data) {
		console.log(data.toString().trim())	
	});

// var clientTalk = client.on("data", function(data) {			// if client typed exit, boot him
// 		console.log(data.toString().trim())	
// 	});

// if (clientTalk = "exit") {
// 		client.on("end", function() {
// 		console.log("disconnected from server");
// 	});

// }

	client.on("end", function() {
		console.log("disconnected from server");
	});
});