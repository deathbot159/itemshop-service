"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluginEnabledHandler = /** @class */ (function () {
    function PluginEnabledHandler(client, packet) {
        if (packet.length == 3) {
            client.clientName = packet[2];
            client.setState(true);
            console.log("[" + client.clientName + "] enabled");
            client.getServer().Discord.sendInfo("[" + client.clientName + "] enabled.");
        }
    }
    return PluginEnabledHandler;
}());
exports.default = PluginEnabledHandler;
