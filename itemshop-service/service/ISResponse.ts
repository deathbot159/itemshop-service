import serverKey from './ISServer';

export default class ISResponse {
    private message: string[];
    constructor(message: string[] | string) {
        this.message = message instanceof Array ? message : [message];
    }
    public toString(): string {
        let packet = `${serverKey} `;
        for (let i = 0; i < this.message.length; i++) {
            packet += (i === this.message.length - 1 ? " " : "-") + this.message[i];
        }
        return packet;
    }
}