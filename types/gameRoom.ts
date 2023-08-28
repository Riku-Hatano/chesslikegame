export interface gameRoom {
    roomID: string | undefined,
    username: string | undefined,
    members: string[] | null,
    socketID: string,
    game: {
        board: string[][] | null[][],
        selectedPieceKind: string | null,
        selectedCell: string | null,
        availablePlaces: string[] | null,
        isClicked: boolean,
        isWhiteTurn: boolean,
        specialFlag: string
    }
}

export default gameRoom;