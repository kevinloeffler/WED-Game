import {hands} from './choices.js'
import {Player} from './player.js'
import leaderboard from './leaderboard.js'
import RoundResult from './roundResult.js'

// Init
const player1 = new Player('Marty McFly', true, 11)
const player2 = new Player('Axel Foley', true, 2)
const player3 = new Player('Ferris Bueller', true, 5)
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

function renderPlayerName() {
    document.querySelector('#pick-player-name').innerHTML = `PICK YOUR HAND ${player.nickname.toUpperCase()}`
}

function renderLeaderboard() {
    const leaderboardList = document.querySelector('#leaderboard')
    let fragment = ''
    leaderboardList.innerHTML = ''
    const sorted = leaderboard.localPlayers.sort(leaderboard.sortPlayers)
    for (const p of sorted) {
        const pName = `<div class="leaderboard-player">${p.nickname}</div>`
        const pScore = `<div class="leaderboard-score">${p.score} Points</div>`
        const listItem = `<div class="leaderboard-item">${pName}${pScore}</div>`
        fragment += listItem
    }
    leaderboardList.innerHTML = fragment
}

function renderChoices() {
    const choicesList = document.querySelector('#choices')
    let fragment = ''

    for (const hand of hands) {
        const choiceShadow = `<div class="choice-shadow"></div>`
        const choiceIcon = `<img class="choice-icon" src="${hand.icon}" alt="${hand.name}">`
        const button = `<div class="choice-item" data-hand="${hand.name}" tabindex="0" role="button">${choiceIcon}${hand.name}${choiceShadow}</div>`
        fragment += button
    }
    choicesList.addEventListener('click', userPick)
    choicesList.innerHTML = fragment
}

function renderStartGameMsg() {
    document.querySelector('#start-game-msg').classList.remove('feedback-hidden')
    document.querySelector('#feedback-msg').classList.add('feedback-hidden')
    feedback.textContent = 'Good luck'
}

function renderRoundFeedbackMsg() {
    document.querySelector('#start-game-msg').classList.add('feedback-hidden')
    document.querySelector('#feedback-msg').classList.remove('feedback-hidden')
}

function renderHistory() {
    const historyList = document.querySelector('#history-list')
    let fragment = ''
    const arr = player.history
    historyList.innerHTML = ''

    for (let i = 0; i < 6; i++) {

        const result = `<p>${arr[i].result}</p>`
        const playerPick = `<p>${arr[i].player.name}</p>`
        const aiPick = `<p>${arr[i].ai.name}</p>`
        const listItem = `<div class="history-list-item">${playerPick}${result}${aiPick}</div>`
        fragment += listItem
    }
    historyList.innerHTML = fragment
}

function renderScore(newScore) {
    document.querySelector('#score-count').innerText = newScore
}

function changeView(target) {
    if (target === 'play') {
        renderPlayerName()
        renderStartGameMsg()
        renderHistory()
        renderScore(player.score)
        leaderboardView.classList.add('hide-view-wrapper')
        playView.classList.remove('hide-view-wrapper')
    } else if (target === 'leaderboard') {
        renderLeaderboard()
        leaderboardView.classList.remove('hide-view-wrapper')
        playView.classList.add('hide-view-wrapper')
    }
}

function enter() {
    const enterError = document.querySelector('#enter-error-msg')
    const playerName = document.querySelector('#player-name')

    if (playerName.value.length < 3 || playerName.value.length > 20) {
        enterError.classList.add('enter-error-msg-active')
    } else {
        enterError.classList.remove('enter-error-msg-active')
        const playerRequestingEnter = leaderboard.checkPlayerName(playerName.value, 0)
        if (playerRequestingEnter) {
            player = playerRequestingEnter
        } else {
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
            break
        case -1:
            result = new RoundResult('Loss', hand, opponent)
            feedback.textContent = 'Oh no, you lost.'
            break
        case 0:
            result = new RoundResult('Tie', hand, opponent)
            feedback.textContent = 'Its a tie.'
            break
    }
    player.addToHistory(result)
    renderHistory()
    renderScore(player.score)
    renderRoundFeedbackMsg()
    playerHandFeedback.textContent = hand.name
    oppFeedback.textContent = opponent.name
}

function choicesHandleEnter(key) {
    if (key.keyCode === 13) {
        document.activeElement.click()
    }
}

renderChoices()
renderLeaderboard()
enterButton.addEventListener('click', enter)
leaderboardButton.addEventListener('click', leave)
document.addEventListener('keyup', choicesHandleEnter)

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
