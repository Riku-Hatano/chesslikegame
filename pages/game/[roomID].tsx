import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const socketio = require("socket.io-client");

const GameRoom = () => {
    const router = useRouter();
    const [socketIo, setSocketIo] = useState<any>();
    const [roomID, setRoomID] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState("");
    const [roomMembers, setRoomMembers] = useState<string[]>([]);

    const getRoomMember = () => {
        if(roomID !== undefined && socketIo) {
            socketIo.emit("check-room", roomID);
        }
    }

    useEffect(() => { //socketのインスタンスとサーバー側からのデータ送信のリスナーを設定
        const io = socketio("http://localhost:8080");
        // const io = socketio("http://10.2.121.183:8080");
        setSocketIo(io);

        io.on("connect", () => {
            setUsername(io.id);
            setRoomMembers((prevRoomMembers) => [...prevRoomMembers, io.id]);
        });

        //リスナー用
        io.on("receive-members", (members: any) => {
            console.log(Array.from(members));
            if(Array.from(members).length > 2) {
                alert("cannot enter room");
                io.disconnect();
            } else {
                setRoomMembers((prevRoomMembers) => [...prevRoomMembers, ...members]);
            }
        })
        io.on("failed-to-login", () => {
            alert(`${io.id} failed to login`)
        })

        return() => {
            io.disconnect();
        }
    }, []);

    useEffect(() => { //queryの名前に応じてsocketのルームにjoinする。routerとsocketIoの更新が非同期で行われるため、router.queryをリッスンしてuseEffectする必要がある
        if(router.query.roomID !== undefined && socketIo !== undefined) {
            socketIo.emit("join-room", router.query.roomID);
            setRoomID(router.query.roomID as string);
        }
        // if(router.query.roomID !== undefined) {
        //     if(socketIo) {
        //         socketIo.emit("join-room", router.query.roomID);
        //         setRoomID(router.query.roomID as string);
        //     }
        // }
    }, [socketIo, router.query]);

    return (
        <>
            <p>room: {roomID}</p>
            <p>username: {username}</p>
            <button onClick={getRoomMember}>check room members</button>
            {
                roomMembers.length ?
                <ul>
                    {
                        roomMembers.map((member: string, idx: number) => {
                            return (
                                <li key={idx}>{ member }</li>
                            )
                        })
                    }
                </ul>
                : console.log("no users yet")
            }
        </>
    )
}

export default GameRoom;