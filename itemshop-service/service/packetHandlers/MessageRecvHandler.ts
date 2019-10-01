import ISClient from "../ISClient";

export default class MessageRecvHandler {

    private _username: string = "";
    private _message: string = "";
    private _date: Date = new Date;
    private _time: string = `${this._date.getDate()}.${this._date.getMonth()+1}. ${this._date.getFullYear()} | ${this._date.getHours()}:${this._date.getMinutes()}:${this._date.getSeconds()}`;

    //<key> message_recv <client> <message>
    constructor(client: ISClient, packet: string[]) {
        //console.log(packet.toString());
        if (packet.length >= 2) {
            this._username = packet[2].toString();
            this._message += `[${this._time}] ${this._username} >> `;
            for (let i = 3; i < packet.length; i++) {
                this._message += packet[i];
                if (i !== packet.length - 1) this._message += " ";
            }
            client.connectedPlayers.forEach(value => {
                if (value.getUsername() === this._username) {
                    value.addMessage(this._message);
                    client.getServer().Discord.sendChatLog(this._message);
                }
            });
        }
    }
}