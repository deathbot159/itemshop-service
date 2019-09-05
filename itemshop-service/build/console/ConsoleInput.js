"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleColor_1 = __importDefault(require("./ConsoleColor"));
var ConsoleCommand = /** @class */ (function () {
    function ConsoleCommand(server) {
        var _this = this;
        this.stdin = process.openStdin();
        this.stdout = process.stdout;
        this._enabled = false;
        this.useDir = "~";
        this._server = server;
        this._enabled = true;
        this.stdin.addListener("data", function (d) { return _this._handleInput(d.toString()); });
    }
    ConsoleCommand.prototype._handleInput = function (data) {
        var msg = data.trim().split(" ");
        var command = msg[0];
        var args = msg.copyWithin(0, msg.length).splice(1);
        if (command === "use") {
            if (args.length === 1) {
                if (args[0] === "service" || args[0] === "discord" || args[0] === "mc" || args[0] === "default") {
                    if (args[0] === "default")
                        this.useDir = "~";
                    else
                        this.useDir = args[0];
                }
                else {
                    this._send(ConsoleColor_1.default.FgRed + "Use: " + ConsoleColor_1.default.Reset + "Invalid subtype.");
                }
            }
            else {
                this._send(ConsoleColor_1.default.FgRed + "Use: " + ConsoleColor_1.default.Reset + "Invalid subtype.");
            }
        }
        else {
            if (this.useDir === "~") {
                switch (command) {
                    case "help":
                        this._send(ConsoleColor_1.default.FgRed + "Help: " + ConsoleColor_1.default.Reset + "Not available");
                        break;
                    case "cls":
                    case "clear":
                        this._handleClear();
                        break;
                    case "stop":
                    case "exit":
                        process.exit(0);
                        break;
                    default:
                        this._send(ConsoleColor_1.default.FgRed + "Invalid command. Use 'help' to command list.");
                }
            }
            else if (this.useDir === "service") {
                switch (command) {
                    case "help":
                        this._send(ConsoleColor_1.default.FgRed + "Help: " + ConsoleColor_1.default.Reset + "Not available");
                        break;
                    default:
                        this._send(ConsoleColor_1.default.FgRed + "Invalid command. Use 'help' to command list.");
                }
            }
            else if (this.useDir === "discord") {
                switch (command) {
                    case "help":
                        this._send(ConsoleColor_1.default.FgGreen + "changeActivity <text> - Change bot activity.");
                        break;
                    case "changeActivity":
                        this._handleChangeActivity(args.toString());
                        break;
                    default:
                        this._send(ConsoleColor_1.default.FgRed + "Invalid command. Use 'help' to command list.");
                }
            }
            else if (this.useDir === "mc") {
                switch (command) {
                    case "help":
                        this._send(ConsoleColor_1.default.FgRed + "Help: " + ConsoleColor_1.default.Reset + "Not available");
                        break;
                    default:
                        this._send(ConsoleColor_1.default.FgRed + "Invalid command. Use 'help' to command list.");
                }
            }
            else {
                this._send(ConsoleColor_1.default.FgRed + "Handler: " + ConsoleColor_1.default.Reset + "Subtype " + this.useDir + " is not handled now.");
            }
        }
        if (data.includes("\n"))
            this._prefix();
    };
    ConsoleCommand.prototype._send = function (data) {
        console.log(data);
    };
    ConsoleCommand.prototype._prefix = function () {
        this.stdout.write(ConsoleColor_1.default.FgYellow + "is-service:" + ConsoleColor_1.default.FgCyan + this.useDir + ConsoleColor_1.default.Reset + "$" + ConsoleColor_1.default.Reset + " ");
    };
    ConsoleCommand.prototype._handleClear = function () {
        var lines = process.stdout.rows;
        for (var i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    };
    //discord
    ConsoleCommand.prototype._handleChangeActivity = function (text) {
        this._server.Discord.getInstance().user.setActivity(text.split(",").join(" "));
    };
    return ConsoleCommand;
}());
exports.default = ConsoleCommand;
