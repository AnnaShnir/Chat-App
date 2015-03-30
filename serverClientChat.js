///////////////////
// I AM CLIENT   //
///////////////////


var net = require("net");
var client = net.Socket();

var name;

function getAndWriteNameToServer(client) {
	console.log('Please enter your name and hit enter:');

	process.stdin.setEncoding('utf8');

	var listener = function() {
		name = process.stdin.read();
		if (name != null) {
			name = name.trim();
			client.write("action-client-name|" + name);
			
			process.stdin.removeListener('readable', listener);
		}
	};

	process.stdin.on('readable', listener);
}

client.connect(3000, function() {
	console.log("connected to server");

	client.on("data", function(data) {
		data = data.toString().trim();

		var protocol = data.split('|');

		// protocol requires action for the client
		if (protocol[0] === 'action-name') {
			// server wants us to provide name of this client
			getAndWriteNameToServer(client);
		} else if (protocol[0] === 'action-ready-to-chat') {
			// server says you may chat now

			console.log("Welcome to chatroom, " + name);

			process.stdin.on('readable', function() {
				var message = process.stdin.read();
				if (message != null) {
					client.write("action-client-says|" + name + "|" + message);
				}
			});

		} else if (protocol[0] === 'action-what-she-said') {
			var whoSaidIt = protocol[1];
			var whatSheSaid = protocol[2];

			console.log(whoSaidIt + ": " + whatSheSaid);
		}// } else if {

		// 	process.stdin.on('readable', function() {
		// 		var message = process.stdin.read();
		// 		if (message === "/kick" + name) {

		// 			client.write("action-client-says|" + clients[] + "|" + "kicked out");
		// 		}
		// 	});

		// }








		//console.log(data.toString().trim())	
	});

	client.on("end", function() {
		console.log("disconnected from server");
		client.end();
	});
});