const httpServerInstance = require("./httpServer");
const socketIoInstance = require("./socketIo");

const io = socketIoInstance(httpServerInstance().listen(8080));

io.on("connection", (socket: any) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("join-room", (roomID: string) => {
        //この段階でルームの人数が二人以上だった場合、ルームに入れないようにする
        if(io.sockets.adapter.rooms.get(roomID) === undefined || Array.from(io.sockets.adapter.rooms.get(roomID)).length < 2) {
            console.log(`${socket.id} joined ${roomID} !`);
            socket.join(roomID);
        } else {
            console.log("failed to login");
            socket.emit("failed-to-login");
        }
    })
    socket.on("check-room", (roomID: string) => {
        const rooms = io.sockets.adapter.rooms;
        const members = rooms.get(roomID); //extract items from members Map array.
        socket.emit("receive-members", Array.from(members));
    })
    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
    })
})