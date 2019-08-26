"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var ISDiscord = /** @class */ (function () {
    function ISDiscord() {
        var _this = this;
        this._bot = new discord_js_1.default.Client();
        this._token = "NjE1NDk4NDczNjQ2NTg3OTIz.XWO5qA.xMidbdVpZUkkwJJb4sBTly5Zbm4";
        this._channelInfoID = "615500280259280926";
        this._isEnabled = false;
        this._bot.login(this._token);
        this._bot.on("ready", function () { return _this._onReady(); });
    }
    ISDiscord.prototype._onReady = function () {
        console.log("[Discord] Bot is ready.");
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
        var _this = this;
        if (this._isEnabled === true)
            this.getInstance().channels.find(function (x) { return x.id === _this._channelInfoID; }).send(value);
        else
            console.log("Bot is not enabled now! Cant send message.");
    };
    return ISDiscord;
}());
exports.default = ISDiscord;
