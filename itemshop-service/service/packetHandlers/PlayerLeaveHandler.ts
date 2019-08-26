import ISClient from "../ISClient";
import MCClient from "../../minecraft/MCClient";

export default class PlayerLeaveHandler {
    private _username: string = "";
    private _uuid: string = "";

    //<plgKey> player_leave <username> <uuid>
    constructor(client: ISClient, packet: string[]) {
        if (packet.length === 4) {
            this._username = packet[2].toString();
            this._uuid = packet[3].toString();

            client.connectedPlayers.forEach((player: MCClient, index: number, object) => {
                if (player.getUUID() === this._uuid) client.connectedPlayers.splice(index, 1);
            });

            console.log("New size " + client.connectedPlayers.length);
            console.log(`[MC | ${this._username}] Player ${this._username} left game!`);
            client.getServer().Discord.sendInfo(`[MC | ${this._username}] Player ${this._username} left game!`);
        }
    }
}