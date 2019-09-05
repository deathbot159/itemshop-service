"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SendMessageCommand = /** @class */ (function () {
    //send_message <uuid> <discordName> <message >>
    //hhc!send_message <server> <playerName> <message>
    function SendMessageCommand(server, message, args) {
        var _this = this;
        this._message = "";
        this._serverName = args[0];
        this._playerName = args[1];
        if (args.length > 2) {
            args.forEach(function (value) {
                if (value !== _this._playerName) {
                    if (value !== _this._serverName) {
                        _this._message += value + " ";
                    }
                }
            });
            var foundServer_1 = false;
            var foundPlayer_1 = false;
            server.serverList.forEach(function (value, index) {
                if (value.clientName === _this._serverName) {
                    foundServer_1 = true;
                    server.serverList[index].connectedPlayers.forEach(function (value) {
                        if (value.getUsername() === _this._playerName) {
                            foundPlayer_1 = true;
                            server.serverList[index].socket.write(server.serverList[index].getServer().serverKey + " send_message " + value.getUsername() + " " + message.author.username.toString() + " " + _this._message + "\n");
                            message.channel.send("Sent \"" + _this._message + "\" to " + _this._playerName + " in " + _this._serverName);
                        }
                    });
                }
            });
            if (foundServer_1 === false) {
                message.channel.send("Server " + this._serverName + " not found!");
                return;
            }
            if (foundPlayer_1 === false)
                message.channel.send("Player " + this._playerName + " not found in " + this._serverName + "!");
        }
        else {
            message.channel.send("Usage: hhc!send_message <server> <playerName> <message>");
        }
    }
    return SendMessageCommand;
}());
exports.default = SendMessageCommand;
