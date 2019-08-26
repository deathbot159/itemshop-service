"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __importStar(require("shortid"));
var TryToConnectHandler_1 = __importDefault(require("./packetHandlers/TryToConnectHandler"));
var PluginEnabledHandler_1 = __importDefault(require("./packetHandlers/PluginEnabledHandler"));
var PlayerJoinedHandler_1 = __importDefault(require("./packetHandlers/PlayerJoinedHandler"));
var ISClient = /** @class */ (function () {
    function ISClient(server, socket) {
        var _this = this;
        this.clientKey = "PLUGIN1";
        this.enabled = false;
        this.connectedPlayers = new Array();
        this.clientName = "";
        this.id = shortid.generate();
        this.server = server;
        this.socket = socket;
        this._onConnection();
        this.socket.on("close", function () { return _this._onClose(); });
        this.socket.on("error", function (err) { return _this._onError(err); });
        this.socket.on("data", function (data) { return _this._onData(data); });
    }
    ISClient.prototype._onConnection = function () {
        console.log("[" + this.id + "] connected.");
    };
    ISClient.prototype._onClose = function () {
        console.log("[" + this.id + "] disconected");
    };
    ISClient.prototype._onError = function (err) {
        console.log("[" + this.id + "] Catched error: " + err.message);
    };
    ISClient.prototype._onData = function (data) {
        if (data.length === 0)
            return;
        console.log("[" + this.id + "] < " + data.toString());
        var packets = data.toString().split("\n");
        for (var i = 0; i <= packets.length - 1; i++) {
            var packet = packets[i].toString().split(" ");
            var key = packet[0].toUpperCase();
            var header = packet[1].toLowerCase();
            if (key !== this.clientKey) {
                console.log("[" + this.id + "] Invalid client key. Disconnecting.");
                this.socket.end();
                return;
            }
            switch (header) {
                case "try_to_connect":
                    new TryToConnectHandler_1.default(this, packet);
                    break;
                case "plugin_enabled":
                    new PluginEnabledHandler_1.default(this, packet);
                    break;
                case "player_joined":
                    new PlayerJoinedHandler_1.default(this, packet);
                    break;
                case "player_leave":
                    break;
                default:
                    console.log("[" + this.id + "] Invalid packet: " + header);
            }
        }
    };
    ISClient.prototype.getServer = function () {
        return this.server;
    };
    ISClient.prototype.setState = function (state) {
        this.enabled = state;
        return this;
    };
    ISClient.prototype.getID = function () {
        return this.id;
    };
    return ISClient;
}());
exports.default = ISClient;
