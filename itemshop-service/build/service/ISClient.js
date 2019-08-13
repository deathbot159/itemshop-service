"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ISResponse_1 = __importDefault(require("./ISResponse"));
var shortid = __importStar(require("shortid"));
var ISClient = /** @class */ (function () {
    function ISClient(server, socket) {
        var _this = this;
        this.clientKey = "PLUGIN1";
        this.id = shortid.generate();
        this.server = server;
        this.socket = socket;
        this._onConnection();
        this.socket.on("close", function () { return _this._onClose(); });
        this.socket.on("error", function (err) { return _this._onError(err); });
        this.socket.on("data", function (data) { return _this._onData(data); });
    }
    ISClient.prototype.write = function (response) {
        var packet = response.toString();
        console.log("[" + this.id + "] > " + packet);
        this.socket.write(packet);
    };
    ISClient.prototype._onConnection = function () {
        console.log("[" + this.id + "] connected");
        this.write(new ISResponse_1.default("response_packet_test"));
    };
    ISClient.prototype._onClose = function () {
        console.log("[" + this.id + "] disconnected");
    };
    ISClient.prototype._onError = function (err) {
        console.log("[" + this.id + "] Catched error: " + err.message);
    };
    ISClient.prototype._onData = function (data) {
        if (data.length === 0) {
            return;
        }
        console.log("[" + this.id + "] < " + data.toString());
        var packet = data.toString().split(" ");
        var key = packet[0].toUpperCase();
        var header = packet[1].toLowerCase();
        if (key !== this.clientKey) {
            console.log("[" + this.id + "] < Invalid client key");
            this.socket.end();
            return;
        }
        switch (header) {
            case "try_to_connect":
                this._handleTry_connect(packet);
                break;
            default:
                console.log("[" + this.id + "] Invalid packet: " + header);
        }
    };
    ISClient.prototype._handleTry_connect = function (packet) {
        if (packet.length == 2) {
            this.write(new ISResponse_1.default("approved_connection"));
        }
    };
    return ISClient;
}());
exports.default = ISClient;
