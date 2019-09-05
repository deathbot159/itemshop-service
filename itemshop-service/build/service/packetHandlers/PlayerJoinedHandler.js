"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MCClient_1 = __importDefault(require("../../minecraft/MCClient"));
var PlayerJoinedHandler = /** @class */ (function () {
    //<plgKey> player_joined <username> <uuid>
    function PlayerJoinedHandler(client, packet) {
        this._username = "";
        this._uuid = "";
        if (packet.length === 4) {
            this._username = packet[2].toString();
            this._uuid = packet[3].toString();
            var mcClient = new MCClient_1.default(this._username, this._uuid);
            console.log("New size " + client.connectedPlayers.push(mcClient));
            console.log("[MC | " + client.clientName + "] Player " + this._username + " joined to game!");
            client.getServer().Discord.sendInfo("[MC | " + client.clientName + "] Player " + this._username + " joined to game!");
        }
    }
    return PlayerJoinedHandler;
}());
exports.default = PlayerJoinedHandler;
