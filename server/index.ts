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
            io.to(roomID).emit("receive-members", Array.from(io.sockets.adapter.rooms.get(roomID)));
        } else {
            console.log("failed to login");
            socket.emit("failed-to-login");
        }
    })
    socket.on("leave-room", (roomID: string) => {
        console.log(roomID);
        socket.leave(roomID);

        // Get the members of the room and emit the updated list to remaining members
        const room = io.sockets.adapter.rooms.get(roomID);
        console.log(room);
        if(room) {
            console.log("still one user")
            const roomMembers = Array.from(room);
            io.to(roomID).emit("receive-members", roomMembers);
        }
    })
    socket.on("disconnect", (roomID: string) => {
        console.log(`Disconnected: ${socket.id}`);
    })
})