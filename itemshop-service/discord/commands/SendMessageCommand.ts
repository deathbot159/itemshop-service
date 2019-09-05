import ISServer from "../../service/ISServer";
import Discord from "discord.js";

export default class SendMessageCommand {

    private _playerName: string;
    private _message: string = "";
    private _serverName: string;

    //send_message <uuid> <discordName> <message >>
    //hhc!send_message <server> <playerName> <message>
    constructor(server: ISServer, message: Discord.Message, args: string[]) {
        this._serverName = args[0];
        this._playerName = args[1];

        if (args.length > 2) {
            args.forEach((value) => {
                if (value !== this._playerName) {
                    if (value !== this._serverName) {
                        this._message += value + " ";
                    }
                }
            });

            let foundServer: boolean = false;
            let foundPlayer: boolean = false;
            server.serverList.forEach((value, index) => {
                if (value.clientName === this._serverName) {
                    foundServer = true;
                    server.serverList[index].connectedPlayers.forEach(value => {
                        if (value.getUsername() === this._playerName) {
                            foundPlayer = true;
                            server.serverList[index].socket.write(`${server.serverList[index].getServer().serverKey} send_message ${value.getUsername()} ${message.author.username.toString()} ${this._message}\n`);
                            message.channel.send(`Sent "${this._message}" to ${this._playerName} in ${this._serverName}`);
                        }
                    });
                }
            });
            if (foundServer === false) { message.channel.send(`Server ${this._serverName} not found!`); return;}
            if (foundPlayer === false) message.channel.send(`Player ${this._playerName} not found in ${this._serverName}!`);

        } else {
            message.channel.send("Usage: hhc!send_message <server> <playerName> <message>");
        }
    }
}