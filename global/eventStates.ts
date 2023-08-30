interface eventStates {
    state: number,
    statesArr: string[]
}

const eventStates: eventStates = {
    state: 0,
    statesArr: [
        "wait",
        "edit",
        "game",
        "result"
    ]
}

export default eventStates;