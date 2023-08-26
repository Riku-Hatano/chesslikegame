import gameRoom from "../../types/gameRoom"

export const initialRoomState: gameRoom = {
    roomID: "",
    members: null,
    username: "",
    socketID: "",
    game: {
        board: {},
        turn: "",
    }
}