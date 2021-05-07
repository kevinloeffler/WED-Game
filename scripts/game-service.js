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
const SERVER_EVALUATE = 'https://stone.dev.ifs.hsr.ch/play'

const mapHand = {
    'Schere': hands[2],
    'Stein': hands[0],
    'Papier': hands[1],
    'stone': 'Stein',
    'paper': 'Papier',
    'scissor': 'Schere',
}

function buildRequest(player, hand) {
    return `${SERVER_EVALUATE}?playerName=${player}&playerHand=${hand}&mode=normal`
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

async function fetchOnlinePlayers() {
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

async function fetchOnlineEval(player, hand) {
    const request = `${SERVER_EVALUATE}?playerName=${player.nickname}&playerHand=${mapHand[hand.name]}&mode=normal`
    const response = await fetch(request)
    return await response.json()
}

async function getOnlineResult (player, hand) {
    const result = await fetchOnlineEval(player, hand)
    if (result.hasOwnProperty('win')) {
        if (result.win) {
            return 1
        }
        return -1
    }
    return 0
}

fetchOnlinePlayers()
// const testRes = await getOnlineResult(new Player('Joel', true), hands[1])
// console.log(testRes)


export {evaluateHand, DELAY_MS}
