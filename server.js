const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const io = require("socket.io", {
  transports: ["websocket"],
  upgrade: false
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Frontend: Run the React app
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Set up websockets
io.on("connection", function(socket) {
  console.log(
    "Client #" +
      io.engine.clientsCount +
      " just connected. Socket ID is " +
      socket.id
  );
  socket.on("chat message", function(msg) {
    console.log(
      "Incoming chat message from " + socket.id + ": " + JSON.stringify(msg)
    );
    io.emit("chat message", msg);
  });
  socket.on("disconnect", function() {
    console.log(
      "Client #" +
        io.engine.clientsCount +
        " (socket ID " +
        socket.id +
        ") just DISCONNECTED. Number of remaining clients is " +
        io.engine.clientsCount
    );
    socket.emit("chat message", "Clinet " + socket.id + " says good bye!");
  });
});

const websocket_port = 8000;
io.listen(websocket_port);
console.log("Websockets listening on port ", websocket_port);

app.listen(port, () => console.log(`Listening on port ${port}`));
