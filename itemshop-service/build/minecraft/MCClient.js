"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MCClient = /** @class */ (function () {
    function MCClient(username, uuid) {
        this._username = username;
        this._uuid = uuid;
    }
    MCClient.prototype.getUsername = function () {
        return this._username;
    };
    MCClient.prototype.getUUID = function () {
        return this._uuid;
    };
    MCClient.prototype.getUser = function () {
        return this;
    };
    return MCClient;
}());
exports.default = MCClient;
