import {hands} from './choices.js'
import leaderboard from './leaderboard.js'
import Player from './player.js'
import RoundResult from './roundResult.js'

const DELAY_MS = 1000
const SERVER_RANKING = 'https://stone.dev.ifs.hsr.ch/ranking'
const SERVER_EVALUATE = 'https://stone.dev.ifs.hsr.ch/play'

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

const mapHand = {
    Schere: hands[2],
    Stein: hands[0],
    Papier: hands[1],
    rock: 'Stein',
    paper: 'Papier',
    scissor: 'Schere',
}

function sanitize(userInput) {
    if (userInput.length < 3 || userInput.length > 50) {
        return false
    }

    const pattern = /^[a-z|0-9]*$/im
    if (!pattern.test(userInput)) {
        return false
    }
    return userInput
}

async function fetchOnlinePlayers() {
    const response = await fetch(SERVER_RANKING)
    const players = await response.json()

    // eslint-disable-next-line no-restricted-syntax
    for (const prop in players) {
        if (Object.prototype.hasOwnProperty.call(players, prop)) {
            const validUser = sanitize(String(players[prop].user))
            if (validUser) {
                const importedPlayer = new Player(validUser, true, players[prop].win)
                leaderboard.addPlayer(importedPlayer, true)
            }
        }
    }
}

async function fetchOnlineEval(player, hand) {
    const request = `${SERVER_EVALUATE}?playerName=${player.nickname}&playerHand=${mapHand[hand.name]}&mode=normal`
    const response = await fetch(request)
    return response.json()
}

async function getOnlineResult(player, hand) {
    const result = await fetchOnlineEval(player, hand)
    if (Object.prototype.hasOwnProperty.call(result, 'win')) {
        if (result.win) {
            return 1
        }
        return -1
    }
    return 0
}

async function evaluateHand(player, hand, isOnline) {
    let result
    let opponent

    if (isOnline) {
        result = await getOnlineResult(player, hand)
        if (result === 1) {
            [opponent] = hand.wins
        } else if (result === -1) {
            [opponent] = hand.loses
        } else {
            opponent = hand
        }
    } else {
        opponent = aiPickHand()
        result = hand.vs(opponent)
    }

    const fb = {res: resultsTable[result][0], msg: resultsTable[result][1], opp: opponent.name}

    player.addToHistory(new RoundResult(fb.res, hand, opponent))
    if (result === 1) { player.addWin() }

    return fb
}

fetchOnlinePlayers()

export {evaluateHand, DELAY_MS}
