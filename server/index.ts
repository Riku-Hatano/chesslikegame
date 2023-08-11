const httpServerInstance = require("./httpServer");
const socketIoInstance = require("./socketIo");

const io = socketIoInstance(httpServerInstance().listen(8080));

io.on("connection", (socket: any) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("join-room", (roomID: string) => {
        console.log(`${socket.id} joined ${roomID} !`);
        socket.join(roomID);
    })
    socket.on("check-room", (roomID: string) => {
        const rooms = io.sockets.adapter.rooms;
        const members = rooms.get(roomID);
        console.log(roomID);
        console.log(members);
        socket.emit("rooms", Array.from(members));
    })
    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
    })
})