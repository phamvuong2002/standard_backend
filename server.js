const app = require("./src/app");
const http = require("http");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const {
  app: { port },
} = require("./src/v1/configs/config");
const SocketServices = require("./src/v1/services/socket.service");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Lắng nghe kết nối mới từ client và chuyển nó đến hàm xử lý trong socket.service.js
wss.on("connection", SocketServices.connection);

const PORT = port || 3055;

server.listen(PORT, () => {
  console.log(`Server is listening on port::${PORT}`);
});

// CTRL-C server close
process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
    if (mongoose) {
      mongoose.disconnect().then((_) => {
        console.log("Disconnected with mongoDB ");
      });
    }
    //notify when have crashes
  });
});
