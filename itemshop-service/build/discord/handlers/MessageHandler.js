"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandHandler_1 = __importDefault(require("./CommandHandler"));
var MessageHandler = /** @class */ (function () {
    function MessageHandler(server, message) {
        this._content = [];
        this._message = message;
        if (this._message.author.bot)
            return;
        this._content = this._message.content.split(" ");
        if (this._content[0].substring(0, 4) == "hhc!")
            new CommandHandler_1.default(server, this._message, this._content);
        //handle message lol
    }
    return MessageHandler;
}());
exports.default = MessageHandler;
