"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var ISClient_1 = __importDefault(require("./ISClient"));
var ISDiscord_1 = __importDefault(require("../discord/ISDiscord"));
var ISServer = /** @class */ (function () {
    function ISServer() {
        var _this = this;
        this.serverKey = "SERVER0";
        this.serverList = new Array();
        this.Discord = new ISDiscord_1.default(this);
        this._isEnabled = false;
        this.server = new net_1.Server();
        this.server.on("connection", function (socket) {
            _this.serverList.push(new ISClient_1.default(_this, socket));
        });
    }
    ISServer.prototype.listen = function (port) {
        this.server.listen(port);
        console.log("[Server] Started listening at " + port);
        this._isEnabled = true;
    };
    ISServer.prototype.getSocket = function () {
        return this.server;
    };
    ISServer.prototype.isEnabled = function () {
        return this._isEnabled;
    };
    return ISServer;
}());
exports.default = ISServer;
