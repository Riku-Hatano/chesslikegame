import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const socketio = require("socket.io-client");
import { localhost, localIP } from "../../global/path";
import { initialRoomState } from "./initialRoomState";
import RoomMembers from "./modals/RoomMembers";
import EditModal from "./modals/EditModal";
import BoardModal from "./modals/BoardModal";
import ResultModal from "./modals/ResultModal";
import WaitPlayerModal from "./modals/WaitPlayerModal";
import GameRoomType, { gameRoom } from "../../types/gameRoom";
import eventStates from "../../global/eventStates";
import styles from "../../styles/roomID.module.css";
import TimerCompo from "./components/TimerCompo";

const GameRoom = () => {
    const [roomState, setRoomState] = useState(initialRoomState);
    const [eventState, setEventState] = useState(eventStates);
    console.log(eventState);
    // eventState are gonna be like
    // 1.Waiting for other player (show WaitPlayerModal.tsx)......wait
    // 2.Editing board before starting game (show EditModal.tsx)..edit
    // 3.Actually playing game with board (show BoardModal.tsx)...game
    // 4.Result (show ResultModal.tsx)............................result


    const router = useRouter();
    const [socketIo, setSocketIo] = useState<any>();

    useEffect(() => { //socketのインスタンスとサーバー側からのデータ送信のリスナーを設定
        const io = socketio(localIP);
        setSocketIo(io);

        io.on("connect", () => { //New user would be created here
            setRoomState((prevState) => ({
                ...prevState,
                socketID: io.id
            }))
        });

        //Event Listener
        io.on("receive-members", (members: GameRoomType["members"]) => {
            if(members !== null) {//部屋を抜けた段階でも、抜けたはずのソケットidがまだ存在するっs(disconnectが最後に行われているため)
                console.log(Array.from(members));
                if(Array.from(members).length === 2) {
                    setEventState((prevState) => ({
                        ...prevState,
                        state: "edit"
                    }))
                }
                setRoomState((prevState) => ({
                    ...prevState,
                    members: members
                }))
            }
        })
        io.on("failed-to-login", () => {
            alert(`${io.id} failed to login`);
            router.push("/");
        })
        if(io) {
            return() => {
                io.emit("leave-room", roomState.roomID);
                io.disconnect();
            }
        }
        setRoomState((prevState) => ({
            ...prevState,
            roomID: router.query.roomID as string
        }))
    }, [roomState.roomID]); //io was defined twice unintentionally because dependency array has [roomID]. I should fix it later!

    useEffect(() => { //queryの名前に応じてsocketのルームにjoinする。routerとsocketIoの更新が非同期で行われるため、router.queryをリッスンしてuseEffectする必要がある
        if(router.query.roomID !== undefined && socketIo !== undefined) {
            socketIo.emit("join-room", router.query.roomID);
            setRoomState((prevState) => ({
                ...prevState,
                roomID: router.query.roomID as string
            }))
        }
    }, [socketIo, router.query]);

    const changeEventState = () => {
        console.log("changed")
        setEventState((prevState) => ({
            ...prevState,
            stateNum: (prevState.stateNum + 1) % 3,
            state: prevState.statesArr[prevState.stateNum + 1]
        }))
    }

    return (
        <div className={styles.main}>
            <button onClick={changeEventState}>test</button>
            {
                // roomState.members && roomState.members.length === 2 ?
                eventState.state === "wait" ?
                <WaitPlayerModal />
                :
                false
            }
            {
                eventState.state === "edit" ?
                <div>
                    <TimerCompo />
                    <div className={styles.editModal}>
                        <EditModal roomState={roomState} setRoomState={setRoomState} />
                    </div>
                </div>
                :
                false
            }
            {
                eventState.state === "game" ?
                <div className={styles.boardModal}>
                    <BoardModal roomState={roomState} />
                    <h2>game</h2>
                </div>
                :
                false
            }
            {
                eventState.state === "result" ?
                <div className={styles.resultModal}>
                    <ResultModal roomState={roomState} className={styles.resultModal}/>
                    <h2>result</h2>
                </div>
                :
                false
            }
        </div>
    )
}

export default GameRoom;