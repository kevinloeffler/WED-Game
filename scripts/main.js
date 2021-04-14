import {hands, rock, paper, scissor} from "./choices.js";
import {Player} from "./player.js";
import {leaderboard} from "./leaderboard.js";
import {RoundResult} from "./roundResult.js";

// Init
const player1 = new Player('player1', true, 10)
const player2 = new Player('player2', true, 6)
const player3 = new Player('player3', true, 8)
leaderboard.addPlayer(player1, 0)
leaderboard.addPlayer(player2, 0)
leaderboard.addPlayer(player3, 0)
let player = null

// Assign often used html elements
const playerHandFeedback = document.querySelector('#player-hand-feedback')
const oppFeedback = document.querySelector('#opp-feedback')
const feedback = document.querySelector('#feedback')
const enterButton = document.querySelector('#enter-button')
const leaderboardButton = document.querySelector('#leaderboard-button')
const leaderboardView = document.querySelector('.leaderboard-wrapper')
const playView = document.querySelector('.play-wrapper')

enterButton.addEventListener('click', enter)
leaderboardButton.addEventListener('click', leave)

function enter() {
    const enterError = document.querySelector('#enter-error-msg')
    const playerName = document.querySelector('#player-name')

    if (playerName.value.length < 3 || playerName.value.length > 50) {
        enterError.classList.add('enter-error-msg-active')
    } else {
        enterError.classList.remove('enter-error-msg-active')
        const playerRequestingEnter = leaderboard.checkPlayerName(playerName.value, 0)
        if (playerRequestingEnter) {
            console.log('entered as existing player')
            player = playerRequestingEnter
        } else {
            console.log('created new player')
            player = new Player(playerName.value, false)
            leaderboard.addPlayer(player, 0)
        }
        changeView('play')
    }
}

function leave() {
    changeView('leaderboard')
    player = null
}

function showPlayerName() {
    document.querySelector('#pick-player-name').innerHTML = `PICK YOUR HAND ${player.nickname.toUpperCase()}`
}

function changeView(target) {
    if (target === 'play') {
        showPlayerName()
        leaderboardView.classList.add('hide-view-wrapper')
        playView.classList.remove('hide-view-wrapper')
    } else if (target === 'leaderboard') {
        renderLeaderboard()
        leaderboardView.classList.remove('hide-view-wrapper')
        playView.classList.add('hide-view-wrapper')
    }
}

function renderLeaderboard() {
    const leaderboardList = document.querySelector('#leaderboard')
    const fragment = document.createDocumentFragment()
    leaderboardList.innerHTML = ''
    const sorted = leaderboard.localPlayers.sort(leaderboard.sortPlayers)
    for (const p of sorted) {
        const pName = document.createElement('div')
        const pNameText = document.createTextNode(p.nickname)
        pName.appendChild(pNameText)
        const pScore = document.createElement("div")
        const pScoreText = document.createTextNode(p.score)
        pScore.appendChild(pScoreText)
        pScore.setAttribute('class', 'leaderboard-score')
        fragment.appendChild(pName)
        fragment.appendChild(pScore)
    }
    leaderboardList.appendChild(fragment)
}

function renderChoices() {
    const choicesList = document.querySelector('#choices')
    const fragment = document.createDocumentFragment()

    for (const hand of hands) {
        const listItem = document.createElement('button')
        listItem.setAttribute('data-hand', hand.name)
        const choiceTitle = document.createTextNode(hand.name)
        listItem.appendChild(choiceTitle)
        fragment.appendChild(listItem)
    }
    choicesList.addEventListener('click', userPick)
    choicesList.appendChild(fragment)
}

function userPick(click) {
    const hand = findHand(click.target.getAttribute('data-hand'))
    const opponent = aiPickHand()
    const result = hand.vs(opponent)
    finishRound(result, hand, opponent)
}

function findHand(target) {
    for (const hand of hands) {
        if (target === hand.name) return hand
    }
}

function aiPickHand() {
    return hands[Math.floor(Math.random() * hands.length)]
}

function finishRound(roundResult, hand, opponent) {
    let result = null
    switch (roundResult) {
        case 1:
            result = new RoundResult('Win', hand, opponent)
            player.addWin()
            feedback.textContent = 'Congrats, you won!'
            console.log('Round won')
            break
        case -1:
            result = new RoundResult('Loss', hand, opponent)
            feedback.textContent = 'Oh no, you lost.'
            console.log('Round lost')
            break
        case 0:
            result = new RoundResult('Tie', hand, opponent)
            feedback.textContent = 'Its a tie.'
            console.log('Round tied')
            break
    }
    player.addToHistory(result)
    // TODO: Update points
    playerHandFeedback.textContent = hand.name
    oppFeedback.textContent = opponent.name
}

renderChoices()
renderLeaderboard()

// Debug
function debug(e) {
    if (e.key === 'p' && e.ctrlKey) {
        console.log('=====DEBUG=====')
        console.log('player:')
        console.log(player)
        console.log('leaderboard:')
        console.log(leaderboard.localPlayers)
    }
}
document.addEventListener("keyup", debug)

/*
console.log('isConnected:', isConnected());

getRankings((rankings) => console.log('rankings:', rankings));

function pickHand() {
    const handIndex = Math.floor(Math.random() * 3);
    return HANDS[handIndex];
}

let count = 1;

function printWinner(hand, didWin) {
    console.log(count++, hand, didWin);
}

for (let i = 1; i < 10; i++) {
    const hand = pickHand();
    evaluateHand('peter', hand, (didWin) => printWinner(hand, didWin));
}
*/