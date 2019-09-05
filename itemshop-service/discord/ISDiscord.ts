import Discord, { TextChannel } from 'discord.js';
import MessageHandler from './handlers/MessageHandler';
import ISServer from '../service/ISServer';

export default class ISDiscord {

    private _bot: Discord.Client = new Discord.Client();
    private _token: string = "NjE1NDk4NDczNjQ2NTg3OTIz.XWO5qA.xMidbdVpZUkkwJJb4sBTly5Zbm4";

    private _channelInfoID: string = "615500280259280926";

    private _isEnabled: boolean = false;

    private _server: ISServer;

    constructor(server: ISServer) {
        this._bot.login(this._token);

        this._server = server;

        this._bot.on("ready", () => this._onReady());
        this._bot.on("message", (message: Discord.Message) => new MessageHandler(this._server, message));
    }

    private _onReady(): void {
        this._server.CInput._send("[Discord] Bot is ready.");
        this._server.CInput._prefix();
        this._bot.user.setActivity("Running at TypeScript!");
        this._isEnabled = true;

        this.sendInfo("Discord bot is ready!");
        
    }

    public getInstance(): Discord.Client {
        return this._bot;
    }

    public isEnabled(): boolean {
        return this._isEnabled;
    }

    public sendInfo(value: string): void {

        if (this._isEnabled === true){
            this.getInstance().user.client.channels.find("id", this._channelInfoID).send(value);
        }else
            console.log("Bot is not enabled now! Cant send message.");
    }

}