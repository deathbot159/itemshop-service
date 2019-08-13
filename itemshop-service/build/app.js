"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ISServer_1 = __importDefault(require("./service/ISServer"));
var IS = new ISServer_1.default();
IS.listen(8475);
