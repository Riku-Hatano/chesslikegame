const httpServerInstance = require("./httpServer");
const socketIoInstance = require("./socketIo");

const io = socketIoInstance(httpServerInstance().listen(8080));

io.on("connection", (socket: any) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("join-room", (roomID: string) => {
        //If there were more than two persons in the specific room, prevent users from enter the room.
        if(io.sockets.adapter.rooms.get(roomID) === undefined || Array.from(io.sockets.adapter.rooms.get(roomID)).length < 2) {
            console.log(`${socket.id} joined ${roomID} !`);
            socket.join(roomID);
            io.to(roomID).emit("receive-members", Array.from(io.sockets.adapter.rooms.get(roomID)));
        } else {
            socket.emit("failed-to-login");
        }
    })
    socket.on("leave-room", (roomID: string) => {
        // Get the members of the room and emit the updated list to remaining members
        const room = io.sockets.adapter.rooms.get(roomID);
        if(room) {
            const roomMembers = Array.from(room);
            io.to(roomID).emit("receive-members", roomMembers);
        }
    })
    socket.on("disconnect", (roomID: string) => {
        console.log(`Disconnected: ${socket.id}`);
    })
})