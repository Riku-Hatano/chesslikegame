const sio = require("socket.io");

const createIoConnection = (nodeServer: any) => {
    const socketIo = new sio.Server(nodeServer, {
        cors: {
            // origin: 'http://10.2.121.183:3000',
            // origin: 'http://localhost:3000',
            origin: "*",
            methods: ['GET'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    })
    return socketIo;
}

module.exports = createIoConnection;