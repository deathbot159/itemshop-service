'use strict';

var net = require("net");

var pluginKey = "PLUGIN1";

var server = net.createServer((c) => {
    //connection
    console.log("Someone tried to connect ... verifing");
    c.on('end', () => {
        console.log("Plugin disconnected");
    });
    c.on('data', (buffer) => {
        if (buffer.toString() === pluginKey + " try_connection") {
            console.log("Plugin connected to server!");
        } else if (buffer.toString().includes(pluginKey)) {
            console.log("Non-implemented packet: " + buffer.toString().replace(pluginKey, null));
        } else {
            console.log("WRONG PACKET KEY FETCHED! DISCONNECTING SOCKET!!!!");
            c.end();
        }
    });
});

server.on('error', (e) => {
    throw e;
});

server.listen(8475, () => {
    console.log("ItemShop-Service started.");
});
