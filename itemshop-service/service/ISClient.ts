import * as shortid from "shortid";
import { Socket } from 'net';
import ISServer from './ISServer';
import MCClient from "../minecraft/MCClient";

import TryToConnectHandler from "./packetHandlers/TryToConnectHandler";
import PluginEnabledHandler from "./packetHandlers/PluginEnabledHandler";
import PlayerJoinedHandler from "./packetHandlers/PlayerJoinedHandler";
import PlayerLeaveHandler from "./packetHandlers/PlayerLeaveHandler";
import MessageRecvHandler from "./packetHandlers/MessageRecvHandler";

export default class ISClient {
    private clientKey: string = "PLUGIN1";
    private id: string;
    private server: ISServer;
    public socket: Socket;
    private enabled: boolean = false;

    public connectedPlayers: Array<MCClient> = new Array<MCClient>();
    public clientName: string = "";

    constructor(server: ISServer, socket: Socket) {
        this.id = shortid.generate();
        this.server = server;
        this.socket = socket;

        this._onConnection();
        this.socket.on("close", () => this._onClose());
        this.socket.on("error", (err: Error) => this._onError(err));
        this.socket.on("data", (data: Buffer) => this._onData(data));
    }

    private _onConnection(): void {
        console.log(`[${this.id}] connected.`);
    }

    private _onClose(): void {
        console.log(`[${this.id}] disconected`);
    }

    private _onError(err: Error): void {
        console.log(`[${this.id}] Catched error: ${err.message}`);
    }

    private _onData(data: Buffer): void {
        if (data.length === 0) return;

        console.log(`[${this.id}] < ${data.toString()}`);

        const packets = data.toString().split("\n");
        for (let i = 0; i <= packets.length - 1; i++) {
            const packet = packets[i].toString().split(" ");
            const key = packet[0].toUpperCase();
            const header = packet[1].toLowerCase();

            if(!this.server.clientWhitelisted.includes("key")){
                console.log(`[${this.id}] Client key isnt whitelisted! Disconnecting.`);
                this.socket.end();
                return;
            }
            
            if (key !== this.clientKey) {
                console.log(`[${this.id}] Invalid client key. Disconnecting.`);
                this.socket.end();
                return;
            }

            switch (header) {
                case "try_to_connect":
                    new TryToConnectHandler(this, packet);
                    break;
                case "plugin_enabled":
                    new PluginEnabledHandler(this, packet);
                    break;
                case "player_joined":
                    new PlayerJoinedHandler(this, packet);
                    break;
                case "player_leave":
                    new PlayerLeaveHandler(this, packet);
                    break;
                case "message_recv":
                    new MessageRecvHandler(this, packet);
                    break;
                default:
                    console.log(`[${this.id}] Invalid packet: ${header}`);
            }
        }
    }

    public getServer(): ISServer {
        return this.server;
    }

    public setState(state: boolean): ISClient {
        this.enabled = state;
        return this;
    }

    public getID(): string {
        return this.id;
    }
}
