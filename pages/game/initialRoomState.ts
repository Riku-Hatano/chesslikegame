import gameRoom from "../../types/gameRoom"

export const initialRoomState: gameRoom = {
    roomID: undefined,
    members: null,
    username: "",
    socketID: "",
    game: {
        board: [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ],
        selectedPieceKind: null,
        selectedCell: null,
        availablePlaces: [],
        isClicked: false,
        isWhiteTurn: true,
        specialFlag: "",
        remainingTime: 20
    }
}