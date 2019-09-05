export default class MCClient {

    private _username: string;
    private _uuid: string;

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
}