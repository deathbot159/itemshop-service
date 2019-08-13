import { Socket } from "net";
import ISServer from "./ISServer";
import ISResponse from "./ISResponse";
import * as shortid from "shortid";

export default class ISClient {

    private id: string;
    private server: ISServer;
    private socket: Socket;
    private ISResp: ISResponse = new ISResponse();
    private clientKey: string = "PLUGIN1";

    private enabled: Boolean = false;

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
        console.log(`[${this.id}] connected`);
        //his.write(this.ISResp.toPacket("response_packet_test"));
    }

    private _onClose(): void {
        console.log(`[${this.id}] disconnected`);
    }

    private _onError(err: Error): void {
        console.log(`[${this.id}] Catched error: ${err.message}`);
    }

    private _onData(data: Buffer): void {
        if (data.length === 0) {
            return;
        }

        console.log(`[${this.id}] < ${data.toString()}`);

        const packets = data.toString().split("\n");
        for (let i = 0; i < packets.length-1; i++) {
            const packet = packets[i].toString().split(" ");
            const key = packet[0].toUpperCase();
            const header = packet[1].toLowerCase();

            if (key !== this.clientKey) {
                console.log(`[${this.id}] < Invalid client key`);
                this.socket.end();
                return;
            }

            switch (header) {
                case "try_to_connect":
                    this._handleTry_connect(packet);
                    break;
                case "plugin_enabled":
                    this._handlePlugin_enabled(packet);
                    break;
                default:
                    console.log(`[${this.id}] Invalid packet: ${header}`);
            }
        }
    }

    private _handleTry_connect(packet: string[]): void {
        if (packet.length == 2) {
            this.socket.write(`${this.server.serverKey} approved_connection\n`);
            console.log(`[${this.id}] was approved.`);
        }
    }

    private _handlePlugin_enabled(packet: string[]): void {
        if (packet.length == 2) {
            this.enabled = true;
            console.log(`[${this.id}] enabled`);
            this.socket.write(`${this.server.serverKey} test2\n`);
        }
    }
}