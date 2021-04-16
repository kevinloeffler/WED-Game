import {hands} from './choices.js'
import Player from './player.js'
import leaderboard from './leaderboard.js'
import {aiPickHand, evaluateHand, findHand} from './game-service.js'

// Init
const player1 = new Player('Marty McFly', true, 11)
const player2 = new Player('Axel Foley', true, 2)
const player3 = new Player('Ferris Bueller', true, 5)
leaderboard.addPlayer(player1)
leaderboard.addPlayer(player2)
leaderboard.addPlayer(player3)
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
    // eslint-disable-next-line no-restricted-syntax
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
    // eslint-disable-next-line no-restricted-syntax
    for (const hand of hands) {
        const choiceShadow = '<div class="choice-shadow"></div>'
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
        const playerRequestingEnter = leaderboard.checkPlayerName(playerName.value)
        if (playerRequestingEnter) {
            player = playerRequestingEnter
        } else {
            player = new Player(playerName.value, false)
            leaderboard.addPlayer(player)
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

    feedback.textContent = evaluateHand(player, result, hand, opponent)
    renderHistory()
    renderScore(player.score)
    renderRoundFeedbackMsg()
    playerHandFeedback.textContent = hand.name
    oppFeedback.textContent = opponent.name
}

function choicesHandleEnter(key) {
    /* This helps people with disabilities (no mouse) play the game */
    if (key.keyCode === 13) {
        document.activeElement.click()
    }
}

renderChoices()
renderLeaderboard()
enterButton.addEventListener('click', enter)
leaderboardButton.addEventListener('click', leave)
document.addEventListener('keyup', choicesHandleEnter)
