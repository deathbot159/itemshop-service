"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerLeaveHandler = /** @class */ (function () {
    //<plgKey> player_leave <username> <uuid>
    function PlayerLeaveHandler(client, packet) {
        this._username = "";
        this._uuid = "";
        if (packet.length === 4) {
            this._username = packet[2].toString();
            this._uuid = packet[3].toString();
            var mcClient = client.connectedPlayers.;
            console.log("New size " + client.connectedPlayers.push(mcClient));
            console.log("[MC | " + client.clientName + "] Player " + this._username + " joined to game!");
            client.getServer().Discord.sendInfo("[MC | " + client.clientName + "] Player " + this._username + " joined to game!");
        }
    }
    return PlayerLeaveHandler;
}());
exports.default = PlayerLeaveHandler;
