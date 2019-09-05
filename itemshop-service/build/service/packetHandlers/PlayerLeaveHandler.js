"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerLeaveHandler = /** @class */ (function () {
    //<plgKey> player_leave <username> <uuid>
    function PlayerLeaveHandler(client, packet) {
        var _this = this;
        this._username = "";
        this._uuid = "";
        if (packet.length === 4) {
            this._username = packet[2].toString();
            this._uuid = packet[3].toString();
            client.connectedPlayers.forEach(function (player, index, object) {
                if (player.getUUID() === _this._uuid)
                    client.connectedPlayers.splice(index, 1);
            });
            console.log("New size " + client.connectedPlayers.length);
            console.log("[MC | " + this._username + "] Player " + this._username + " left game!");
            client.getServer().Discord.sendInfo("[MC | " + this._username + "] Player " + this._username + " left game!");
        }
    }
    return PlayerLeaveHandler;
}());
exports.default = PlayerLeaveHandler;
