import { Socket } from "net";
import ISServer from "./ISServer";
import ISResponse from "./ISResponse";
import * as shortid from "shortid";
import { createInterface, ReadLine } from 'readline';

export default class ISClient {

    private id: string;
    private server: ISServer;
    private socket: Socket;
    private reader: ReadLine;
    private clientKey: string = "PLUGIN";

    constructor(server: ISServer, socket: Socket) {
        this.id = shortid.generate();
        this.server = server;
        this.socket = socket;

        this.reader = createInterface(socket);
        this.reader.on("line", (line: string) => this._onLine(line));

        this._onConnection();
        this.socket.on("close", () => this._onClose());
        this.socket.on("error", (err: Error) => this._onError(err));
    }

    private write(response: ISResponse): void {
        const packet = response.toString();

        console.log(`[${this.id}] > ${packet}`);

        this.socket.write(packet);
    }

    private _onConnection(): void {
        console.log(`[${this.id}] connected`);
    }

    private _onClose(): void {
        console.log(`[${this.id}] disconnected`);
    }

    private _onError(err: Error): void {
        console.log(`[${this.id}] Catched error: ${err.message}`);
    }

    private _onLine(line: string): void {
        if (line.length === 0) {
            return;
        }
        console.log(`[${this.id}] < ${line}`);

        const packet = line.split(" ");
        const key = packet[0].toLowerCase();
        const header = packet[1].toLowerCase();

        if (key !== this.clientKey) {
            console.log(`[${this.id}] < Invalid client key`);
            this.socket.end();
            return;
        }

        switch (header) {
            case "try_connect":
                this._handleTry_connect(packet);
                break;
            default:
                console.log(`[${this.id}] Invalid packet: ${header}`);
        }
        
    }

    private _handleTry_connect(packet: string[]): void {
        if (packet.length == 2) {
            this.write(new ISResponse(`approved_connection`));
        }
    }
}