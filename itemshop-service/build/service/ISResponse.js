"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ISServer_1 = __importDefault(require("./ISServer"));
var ISResponse = /** @class */ (function () {
    function ISResponse(message) {
        this.message = message instanceof Array ? message : [message];
    }
    ISResponse.prototype.toString = function () {
        var packet = ISServer_1.default + " ";
        for (var i = 0; i < this.message.length; i++) {
            packet += (i === this.message.length - 1 ? " " : "-") + this.message[i];
        }
        return packet;
    };
    return ISResponse;
}());
exports.default = ISResponse;
