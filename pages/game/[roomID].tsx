import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const socketio = require("socket.io-client");

const GameRoom = () => {
    const router = useRouter();
    const [socketIo, setSocketIo] = useState<any>();
    const [roomID, setRoomID] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState("");

    const getRoomMember = () => {
        if(roomID !== undefined && socketIo) {
            socketIo.emit("check-room", roomID);
        }
    }

    useEffect(() => {
        const io = socketio("http://localhost:8080");
        // const io = socketio("http://10.2.121.183:8080");
        setSocketIo(io);

        io.on("connect", () => {
            console.log(io.id);
            setUsername(io.id);
        });

        io.on("rooms", (members: any) => {
            console.log(Array.from(members));
        })

        return() => {
            io.disconnect();
        }
    }, []); // This runs only once to establish the socket connection

    useEffect(() => {
        if(router.query.roomID !== undefined) {
            if(socketIo) {
                socketIo.emit("join-room", router.query.roomID);
                setRoomID(router.query.roomID as string);
            }
        }
    }, [socketIo, router.query]); // This updates when socketIo or router.query changes

    return (
        <>
            <p>room: {roomID}</p>
            <p>username: {username}</p>
            <button onClick={getRoomMember}>check room members</button>
        </>
    )
}

export default GameRoom;