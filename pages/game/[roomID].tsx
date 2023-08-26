import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const socketio = require("socket.io-client");
import { localhost, localIP } from "../../global/path";
import RoomMembers from "./modals/RoomMembers";
import EditModal from "./modals/EditModal";
import BoardModal from "./modals/BoardModal";
import ResultModal from "./modals/ResultModal";

const GameRoom = () => {
    const router = useRouter();
    const [socketIo, setSocketIo] = useState<any>();
    const [roomID, setRoomID] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState("");
    const [roomMembers, setRoomMembers] = useState<string[]>([]);

    useEffect(() => { //socketのインスタンスとサーバー側からのデータ送信のリスナーを設定
        // const io = socketio(localhost);
        const io = socketio(localIP);
        setSocketIo(io);

        io.on("connect", () => { //New user would be created here
            setUsername(io.id);
        });

        //Event Listener
        io.on("receive-members", (members: any) => {
            console.log(Array.from(members));
            setRoomMembers([...members]);
        })
        io.on("failed-to-login", () => {
            alert(`${io.id} failed to login`);
            router.push("/");
        })
        if(io) {
            return() => {
                io.emit("leave-room", roomID);
                io.disconnect();
            }
        }
        setRoomID(router.query.roomID as string);
    }, [roomID]); //io was defined twice unintentionally because dependency array has [roomID]. I should fix it later!

    useEffect(() => { //queryの名前に応じてsocketのルームにjoinする。routerとsocketIoの更新が非同期で行われるため、router.queryをリッスンしてuseEffectする必要がある
        if(router.query.roomID !== undefined && socketIo !== undefined) {
            socketIo.emit("join-room", router.query.roomID);
            setRoomID(router.query.roomID as string);
        }
    }, [socketIo, router.query]);

    return (
        <>
            {/* <p>room: {roomID}</p>
            <p>username: {username}</p>
            {
                roomMembers.length ?
                <ul>
                    {
                        roomMembers.map((member: string, idx: number) => {
                            return (
                                <li key={idx}>{member}</li>
                            )
                        })
                    }
                </ul>
                : console.log("no users yet")
            }
            {
                roomMembers.length === 1 ?
                <p>waiting for other player...</p>
                : console.log("game is ready!!")
            } */}


            <EditModal />
            <RoomMembers />
        </>
    )
}

export default GameRoom;