import ISClient from "../ISClient";

export default class PluginEnabledHandler {
    constructor(client: ISClient, packet: string[]) {
        if (packet.length == 3) {
            client.clientName = packet[2];
            client.setState(true);
            console.log(`[${client.clientName}] enabled`);
            client.getServer().Discord.sendInfo(`[${client.clientName}] enabled.`);
        }
    }
}