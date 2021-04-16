// const DELAY_MS = 1000; -> For Testat 2

import {hands} from './choices.js'
import RoundResult from './roundResult.js'

export function aiPickHand() {
    return hands[Math.floor(Math.random() * hands.length)]
}

export function findHand(target) {
    // eslint-disable-next-line no-restricted-syntax
    for (const hand of hands) {
        if (target === hand.name) return hand
    }
    return null
}

const resultsTable = {
    1: ['Win', 'Congrats, you won!'],
    0: ['Tie', 'Its a tie.'],
    '-1': ['Loss', 'Oh no, you lost.'],
}

export function evaluateHand(player, result, hand, opponent) {
    const arr = resultsTable[result]
    player.addToHistory(new RoundResult(arr[0], hand, opponent))
    if (result === 1) { player.addWin() }
    return arr[1]
}
