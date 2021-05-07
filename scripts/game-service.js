import {hands} from './choices.js'
import leaderboard from './leaderboard.js'
import Player from './player.js'
import RoundResult from './roundResult.js'

const DELAY_MS = 1000;

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

function evaluateHand(player, result, hand, opponent) {
    const arr = resultsTable[result]
    player.addToHistory(new RoundResult(arr[0], hand, opponent))
    if (result === 1) { player.addWin() }
    return arr[1]
}

// ONLINE

const SERVER_RANKING = 'https://stone.dev.ifs.hsr.ch/ranking'

const mapHand = {
    'Schere': hands[2],
    'Stein': hands[0],
    'Papier': hands[1]
}

function sanitize(userInput) {
    if (userInput.length < 3) {
        return false
    }
    const pattern = /^[a-z|0-9]*$/im
    if (!pattern.test(userInput)) {
        return false
    }
    return userInput
}

async function fetchOnlinePlayers () {
    const response = await fetch(SERVER_RANKING)
    const players = await response.json()

    for(let prop in players) {
        const validUser = sanitize(String(players[prop].user))
        if (validUser) {
            const importedPlayer = new Player(validUser, true, players[prop].win)
            leaderboard.addPlayer(importedPlayer, true)
        }
    }
}

fetchOnlinePlayers()

export {evaluateHand, DELAY_MS}
