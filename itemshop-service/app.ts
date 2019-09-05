import ISServer from "./service/ISServer";
import ConsoleInput from "./console/ConsoleInput";


const IS = new ISServer();

IS.listen(8475);

/*import express from "express";
import MCClient from "./minecraft/MCClient";
const app = express();
app.use(express.static(__dirname + '/page'));
const port = 3000;

app.get('/', (req, res) => res.send());

app.post('/clicked', (req, res) => {
    const click = { clickTime: new Date() };
    for (let i = 0; i < IS.serverList.length; i++) {
        if (IS.serverList[i].clientName == "hellhc.pl") {
            console.log(`[Express] Sended click event to ${IS.serverList[i].clientName}!`);
            IS.serverList[i].socket.write(IS.serverList[i].clientKey+" He clicked me! ;-;");
        }
    }
});

app.listen(port, () => console.log(`Page listening on port ${port}!`))*/
