"use strict";
const KeyTokenService = require("./keyToken.service");

const connections = [];
class SocketServices {
  static connection(ws) {
    connections.push(ws);

    console.log("New client connected");

    ws.on("open", function open() {
      console.log("Connected to server");

      // Gửi một tin nhắn tới server khi kết nối thành công
      ws.send("Hello server!");
    });

    // Lắng nghe message từ client
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        console.log("Data socket from user:::::", data);
      } catch (error) {
        console.log("MESSAGE ERROR:", error);
      }
    });

    // Xử lý sự kiện disconnect
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  }
}

module.exports = SocketServices;
