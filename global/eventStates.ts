interface eventStates {
    stateNum: number,
    state: string,
    statesArr: string[]
}

const eventStates: eventStates = {
    stateNum: 0,
    state: "wait",
    statesArr: [
        "wait",
        "edit",
        "game",
        "result"
    ]
}

export default eventStates;