export default class MCClient {

    private _username: string;
    private _uuid: string;

    private _messages: string[] = new Array<string>();

    constructor(username: string, uuid: string) {
        this._username = username;
        this._uuid = uuid;
    }

    public getUsername(): string {
        return this._username;
    }

    public getUUID(): string {
        return this._uuid;
    }

    public getUser(): MCClient {
        return this;
    }

    public getMessages(): string[] {
        return this._messages;
    }
    public addMessage(msg: string): void {
        this._messages.push(msg);
    }
}