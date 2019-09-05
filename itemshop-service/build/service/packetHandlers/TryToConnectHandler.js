"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TryToConnectHandler = /** @class */ (function () {
    function TryToConnectHandler(client, packet) {
        if (packet.length == 2) {
            client.socket.write(client.getServer().serverKey + " approved_connection\n");
            console.log("[" + client.getID() + "] was approved.");
            client.getServer().Discord.sendInfo("[" + client.getID() + "] Connection was approved.");
        }
    }
    return TryToConnectHandler;
}());
exports.default = TryToConnectHandler;
