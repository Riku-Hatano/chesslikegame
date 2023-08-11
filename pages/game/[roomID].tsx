import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const socketio = require("socket.io-client");

const GameRoom = () => {
    const router = useRouter();
    const [socketIo, setSocketIo] = useState<any>();
    const roomID = router.query;

    const getRoomMember = () => {
        socketIo.emit("check-room", roomID.roomID);
    }

    useEffect(() => {
        // const io = socketio("http://10.2.121.183:8080");
        const io = socketio("http://localhost:8080");
        setSocketIo(io);
        io.on("connect", () => {
            console.log(io.id);
        });
        io.on("rooms", (members: any) => {
            console.log(Array.from(members));
        })
        // roomID.roomID !== undefined ? io.emit("join-room", roomID.roomID) : false;
        return () => {
            io.disconnect();
        }
    }, [router.query])

    useEffect(() => {
        console.log(roomID.roomID);
        console.log(socketIo);
        if(roomID.roomID !== undefined && socketIo !== undefined) {
            console.log("done")
            socketIo.emit("join-room", roomID.roomID)
        }
    }, []);






    // useEffect(() => {
    //     const io = socketio("http://10.2.121.183:8080");
    //     setSocketIo(io);
    //     io.on("connect", () => {
    //         console.log(io.id);
    //     });
    //     io.on("rooms", (members: any) => {
    //         console.log(Array.from(members));
    //     })
    //     roomID.roomID !== undefined ? io.emit("join-room", roomID.roomID) : false;
    //     return () => {
    //         io.disconnect();
    //     }
    // }, [router.query])
    return (
        <>
            {/* <p>{roomID}</p> */}
            <button onClick={getRoomMember}>check room members</button>
        </>
    )
}

export default GameRoom;