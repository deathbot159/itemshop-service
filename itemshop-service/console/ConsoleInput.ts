import ConsoleColor from './ConsoleColor';
import ISServer from '../service/ISServer';
import Discord from 'discord.js';

export default class ConsoleCommand{
    private stdin: NodeJS.Socket = process.openStdin();
    private stdout: NodeJS.WriteStream = process.stdout;
    private _enabled: boolean = false;
    private _server: ISServer;

    private useDir: String = "~";

    constructor(server: ISServer){
        this._server = server;
        this._enabled = true;
        this.stdin.addListener("data", (d)=>this._handleInput(d.toString()));
    }

    private _handleInput(data: String):void{
        const msg: string[] = data.trim().split(" ");
        const command: String = msg[0];
        const args: string[] = msg.copyWithin(0, msg.length).splice(1);
        if(command === "use"){
            if(args.length === 1){
                if(args[0] === "service" || args[0] === "discord" || args[0] === "mc" || args[0] === "default"){
                    if(args[0] === "default") this.useDir = "~";
                    switch(args[0]){
                        case "discord":
                            if(!this._server.Discord.isEnabled()){ this._send(`${ConsoleColor.FgRed}Use: ${ConsoleColor.Reset} Discord is not available right now.`);}else{
                                this.useDir = args[0];
                            }
                            break;
                        case "service":
                            if(!this._server.isEnabled()){ this._send(`${ConsoleColor.FgRed}Use: ${ConsoleColor.Reset} Service is not available right now.`);}else{
                                this.useDir = args[0];
                            }
                            break;
                        case "mc":
                            this.useDir=args[0];
                            break;
                    }
                    
                }else{
                    this._send(`${ConsoleColor.FgRed}Use: ${ConsoleColor.Reset}Invalid subtype.`);
                }
                
            }else{
                this._send(`${ConsoleColor.FgRed}Use: ${ConsoleColor.Reset}Invalid subtype.`);
            }
            
        }else{
            if(this.useDir === "~"){
                switch(command){
                    case "help":
                        this._send(`${ConsoleColor.FgRed}Help: ${ConsoleColor.Reset}Not available`);
                        break;
                    case "cls":
                    case "clear":
                        this._handleClear();
                        break;
                    case "stop":
                    case "exit":
                        process.exit(0);
                        break;
                    default:
                    this._send(`${ConsoleColor.FgRed}Invalid command. Use 'help' to command list.`);
                }
            }else if(this.useDir === "service"){
                switch(command){
                    case "help":
                        this._send(`${ConsoleColor.FgRed}Help: ${ConsoleColor.Reset}Not available`);
                        break;
                    default:
                        this._send(`${ConsoleColor.FgRed}Invalid command. Use 'help' to command list.`);
                }
            }else if(this.useDir === "discord"){
                switch(command){
                    case "help":
                        this._send(`${ConsoleColor.FgGreen}changeActivity <text> - Change bot activity.`);
                        break;
                    case "changeActivity":
                        this._handleChangeActivity(args.toString());
                        break;
                    default:
                        this._send(`${ConsoleColor.FgRed}Invalid command. Use 'help' to command list.`);
                }
            }else if(this.useDir === "mc"){
                switch(command){
                    case "help":
                        this._send(`${ConsoleColor.FgRed}Help: ${ConsoleColor.Reset}Not available`);
                        break;
                    default:
                        this._send(`${ConsoleColor.FgRed}Invalid command. Use 'help' to command list.`);
                }
            }else{
                this._send(`${ConsoleColor.FgRed}Handler: ${ConsoleColor.Reset}Subtype ${this.useDir} is not handled now.`);
            }
        }
        if(data.includes("\n")) this._prefix();
    }

    public _send(data: String): void{
        console.log(data);
    }

    public _prefix():void{
        this.stdout.write(`${ConsoleColor.FgYellow}is-service:${ConsoleColor.FgCyan}${this.useDir}${ConsoleColor.Reset}$${ConsoleColor.Reset} `);
    }

    private _handleClear(){
        let lines = process.stdout.rows;
        if(lines === undefined) lines=0;
        for(var i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    }

    //discord
    private _handleChangeActivity(text: string){
        this._server.Discord.getInstance().user.setActivity(text.split(",").join(" "));
    }

}