"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ISServer_1 = __importDefault(require("./service/ISServer"));
var IS = new ISServer_1.default();
IS.listen(8475);
/*import express from "express";
import MCClient from "./minecraft/MCClient";
const app = express();
app.use(express.static(__dirname + '/page'));
const port = 3000;

app.get('/', (req, res) => res.send());

app.post('/clicked', (req, res) => {
    const click = { clickTime: new Date() };
    for (let i = 0; i < IS.serverList.length; i++) {
        if (IS.serverList[i].clientName == "hellhc.pl") {
            console.log(`[Express] Sended click event to ${IS.serverList[i].clientName}!`);
            IS.serverList[i].socket.write(IS.serverList[i].clientKey+" He clicked me! ;-;");
        }
    }
});

app.listen(port, () => console.log(`Page listening on port ${port}!`))*/
