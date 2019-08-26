import Discord from 'discord.js';
import ISServer from '../../service/ISServer';
import ISClient from '../../service/ISClient';
import MCClient from '../../minecraft/MCClient';

export default class CommandHandler {
    private _message: Discord.Message;
    private _content: string[];

    private _command: string;
    private _prefix: string;
    private _args: string[] = [];

    private _server: ISServer;

    constructor(server: ISServer, message: Discord.Message, content: string[]) {
        this._message = message;
        this._content = content;

        this._server = server;

        this._prefix = this._content[0].substring(0, 4);
        this._command = this._content[0].substring(4);
        for (let i = 1; i < this._content.length; i++) {
            this._args.push(this._content[i]);
        }

        switch (this._command){
            case "server_list":
                this._message.channel.send(this.getServerList());
                break;
            default:
                this._message.channel.send("Invalid command.");
        }
    }

    private getServerList(): string{
        let list: string = "Server list: \n";
        let players: string = "";
        if (this._server.serverList.length === 0) return "No servers avaible.";
        for (let i = 0; i < this._server.serverList.length; i++) {
            list += this._server.serverList[i].clientName + "\n";
            let client: ISClient = this._server.serverList[i];
            if (this._server.serverList[i].connectedPlayers.length === 0) list += "\tNo players active.";
            else {
                list += `\t ${client.connectedPlayers.length} players active:\n`;
                client.connectedPlayers.forEach((player: MCClient) => {
                    list += `\t\t${player.getUsername()} > ${player.getUUID()}\n`
                });
            }
        }
        return list;
    }
}