import ISClient from "../ISClient";
import MCClient from "../../minecraft/MCClient";

export default class PlayerJoinedHandler {

    private _username: string = "";
    private _uuid: string = "";

    //<plgKey> player_joined <username> <uuid>
    constructor(client: ISClient, packet: string[]) {
        if (packet.length === 4) {
            this._username = packet[2].toString();
            this._uuid = packet[3].toString();

            const mcClient: MCClient = new MCClient(this._username, this._uuid);
            
            console.log("New size " + client.connectedPlayers.push(mcClient));
            console.log(`[MC | ${client.clientName}] Player ${this._username} joined to game!`);
            client.getServer().Discord.sendInfo(`[MC | ${client.clientName}] Player ${this._username} joined to game!`);
        }
    }
}