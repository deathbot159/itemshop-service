'use strict';

var net = require("net");

var pluginKey = "PLUGIN1";

var serverKey = "SERVER0";

var server = net.createServer((c) => {
    //connection
    console.log("Someone tried to connect ... verifing");
    c.on('end', () => {
        console.log("Plugin disconnected");
    });
    c.on('data', (buffer) => {
        if (buffer.toString() === pluginKey + " try_to_connect") {
            console.log("Plugin connected to server!");
            c.write(serverKey + " approved_connection");
        } else if (buffer.toString().includes(pluginKey)) {
            console.log("Non-implemented packet: " + buffer.toString().replace(pluginKey, ""));
        } else {
            console.log("WRONG PACKET KEY FETCHED! DISCONNECTING SOCKET!!!!");
            c.destroy();
        }
    });
});

server.on('error', (e) => {
    throw e;
});

server.listen(8475, () => {
    console.log("ItemShop-Service started.");
});
