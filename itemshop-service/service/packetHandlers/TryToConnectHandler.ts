import ISClient from "../ISClient";

export default class TryToConnectHandler {
    constructor(client: ISClient, packet: string[]) {
        if (packet.length == 2) {
            client.socket.write(`${client.getServer().serverKey} approved_connection\n`);
            console.log(`[${client.getID()}] was approved.`);
            client.getServer().Discord.sendInfo(`[${client.getID()}] Connection was approved.`);
        }
    }
}