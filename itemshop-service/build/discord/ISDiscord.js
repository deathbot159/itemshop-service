"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var MessageHandler_1 = __importDefault(require("./handlers/MessageHandler"));
var ISDiscord = /** @class */ (function () {
    function ISDiscord(server) {
        var _this = this;
        this._bot = new discord_js_1.default.Client();
        this._token = "NjE1NDk4NDczNjQ2NTg3OTIz.XWO5qA.xMidbdVpZUkkwJJb4sBTly5Zbm4";
        this._channelInfoID = "615500280259280926";
        this._isEnabled = false;
        this._bot.login(this._token);
        this._server = server;
        this._bot.on("ready", function () { return _this._onReady(); });
        this._bot.on("message", function (message) { return new MessageHandler_1.default(_this._server, message); });
    }
    ISDiscord.prototype._onReady = function () {
        this._server.CInput._send("[Discord] Bot is ready.");
        this._server.CInput._prefix();
        this._bot.user.setActivity("Running at TypeScript!");
        this._isEnabled = true;
        this.sendInfo("Discord bot is ready!");
    };
    ISDiscord.prototype.getInstance = function () {
        return this._bot;
    };
    ISDiscord.prototype.isEnabled = function () {
        return this._isEnabled;
    };
    ISDiscord.prototype.sendInfo = function (value) {
        if (this._isEnabled === true) {
            //zjebane zabezpiecznie wrr
            var channel = this.getInstance().user.client.channels.find("id", this._channelInfoID);
            if (!channel)
                return;
            if (!(function (channel) { return channel.type === "text"; })(channel))
                return;
            channel.send(value);
        }
        else
            console.log("Bot is not enabled now! Cant send message.");
    };
    return ISDiscord;
}());
exports.default = ISDiscord;
