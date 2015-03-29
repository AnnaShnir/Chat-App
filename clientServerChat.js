var net = require("net");   //module built into node that allows us to build TCP servers for clients
var port = 3000;

var clients = [];

/*
 Chat protocol.
    - name - name of the client
    - message - client posting message
 */

function broadcastMessage(from, message) {
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].client != from) {
      clients[i].socket.write("action-what-she-said|" + from + "|" + message);
    }
  }
}


function onClientConnected(socket) {
  console.log("[server.onClientConnected] client connected");

  socket.write("action-name");
}

var server = net.createServer(function(socket) {
  onClientConnected(socket);

/*
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk != null) {
      client.write("Server: " + chunk);
    }
  });
*/
// socket.write(randomComplement);
  
  socket.on("data", function(data) {
    data = data.toString().trim();

    var protocol = data.split('|');

    if (protocol[0] === 'action-client-name') {
      // if server receives this action, it means that 
      // client is providing name to it
      //    format: action-client-name|NAME
      var clientName = protocol[1];
      clients.push( { 'client': clientName, 'socket': socket });

      socket.write("action-ready-to-chat");
    } else if (protocol[0] === 'action-client-says') {
      // client sent a chat message

      console.log("New message from: " + protocol[1] + " message: " + protocol[2]);
      

      // send the new message to every other client connected
      broadcastMessage(protocol[1], protocol[2]);
    }
  });

  socket.on("end", function() {
    console.log("client disconnected");
  });
});

server.listen(port, function() {
  console.log("listening on port" + port);
});