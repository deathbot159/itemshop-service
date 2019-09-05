import Discord from 'discord.js';
import CommandHandler from './CommandHandler';
import ISServer from '../../service/ISServer';

export default class MessageHandler {

    private _message: Discord.Message;
    private _content: string[] = [];

    constructor(server: ISServer, message: Discord.Message) {
        this._message = message;
        if (this._message.author.bot) return;
        this._content = this._message.content.split(" ");
        if (this._content[0].substring(0, 4) == "hhc!") new CommandHandler(server, this._message, this._content);
        //handle message lol
    }
}