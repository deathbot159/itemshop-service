import { Server, Socket } from "net";
import ISClient from "./ISClient";

export default class ISServer {
    public serverKey: string = "SERVER";
    private server: Server;

    constructor() {
        this.server = new Server();
        this.server.on("connection", (socket: Socket) => {
            new ISClient(this, socket);
        });
    }

    public listen(port: number): void {
        this.server.listen(port);
        console.log(`[Server] Started listening at ${port}`);
    }

    public getSocket(): Server {
        return this.server;
    }
}