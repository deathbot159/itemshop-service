"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandHandler = /** @class */ (function () {
    function CommandHandler(server, message, content) {
        this._args = [];
        this._message = message;
        this._content = content;
        this._server = server;
        this._prefix = this._content[0].substring(0, 4);
        this._command = this._content[0].substring(4);
        for (var i = 1; i < this._content.length; i++) {
            this._args.push(this._content[i]);
        }
        switch (this._command) {
            case "server_list":
                this._message.channel.send(this.getServerList());
                break;
            default:
                this._message.channel.send("Invalid command.");
        }
    }
    CommandHandler.prototype.getServerList = function () {
        var list = "Server list: \n";
        var players = "";
        if (this._server.serverList.length === 0)
            return "No servers avaible.";
        for (var i = 0; i < this._server.serverList.length; i++) {
            list += this._server.serverList[i].clientName + "\n";
            var client = this._server.serverList[i];
            if (this._server.serverList[i].connectedPlayers.length === 0)
                list += "\tNo players active.";
            else {
                list += "\t " + client.connectedPlayers.length + " players active:\n";
                client.connectedPlayers.forEach(function (player) {
                    list += "\t\t" + player.getUsername() + " > " + player.getUUID() + "\n";
                });
            }
        }
        return list;
    };
    return CommandHandler;
}());
exports.default = CommandHandler;
