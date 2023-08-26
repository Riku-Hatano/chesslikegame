export interface gameRoom {
    roomID: string,
    members: string[] | null,
    username: string,
    socketID: string,
    game: {
        board:{},
        turn: string,
    }
}

export default gameRoom;